import os
from datetime import datetime, timedelta, timezone

from fastapi import APIRouter, Depends, HTTPException, Query, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from jose import JWTError, jwt
from pydantic import BaseModel

from app.database import supabase
from app.utils import verify_password

ADMIN_JWT_SECRET = os.getenv("ADMIN_JWT_SECRET")  # separate from user JWT secrets
ADMIN_TOKEN_EXPIRE_MINUTES = 60
ALGORITHM = "HS256"

ALLOWED_TABLES = {"users", "profiles", "products", "cart"}
HIDDEN_COLUMNS = {"users": {"password"}}

bearer = HTTPBearer()
router = APIRouter(prefix="/admin", tags=["admin"])


class AdminLogin(BaseModel):
    username: str
    password: str


def require_admin(creds: HTTPAuthorizationCredentials = Depends(bearer)) -> dict:
    invalid = HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid or expired token")
    try:
        payload = jwt.decode(creds.credentials, ADMIN_JWT_SECRET, algorithms=[ALGORITHM])
    except JWTError:
        raise invalid
    if payload.get("type") != "admin":
        raise invalid
    return payload


@router.post("/login")
async def admin_login(data: AdminLogin):
    result = supabase.table("admins").select("*").eq("username", data.username).limit(1).execute()
    admin = result.data[0] if result.data else None

    if not admin or not verify_password(data.password, admin["password_hash"]):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")

    token = jwt.encode(
        {
            "sub": admin["id"],
            "type": "admin",
            "exp": datetime.now(timezone.utc) + timedelta(minutes=ADMIN_TOKEN_EXPIRE_MINUTES),
        },
        ADMIN_JWT_SECRET,
        ALGORITHM,
    )
    return {"access_token": token, "token_type": "bearer"}


@router.get("/tables", dependencies=[Depends(require_admin)])
async def list_tables():
    return sorted(ALLOWED_TABLES)


@router.get("/{table}", dependencies=[Depends(require_admin)])
async def get_rows(
    table: str,
    page: int = Query(1, ge=1),
    limit: int = Query(20, ge=1, le=100),
):
    if table not in ALLOWED_TABLES:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Table not found")

    start = (page - 1) * limit
    result = (
        supabase.table(table)
        .select("*", count="exact")
        .range(start, start + limit - 1)
        .execute()
    )

    hidden = HIDDEN_COLUMNS.get(table, set())
    rows = [{k: v for k, v in row.items() if k not in hidden} for row in result.data]

    return {"data": rows, "total": result.count, "page": page, "limit": limit}
