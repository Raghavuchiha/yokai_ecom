from datetime import datetime, timedelta, timezone
from uuid import uuid4

from fastapi import APIRouter, status, HTTPException, Depends
from fastapi.security import OAuth2PasswordRequestForm
from postgrest.exceptions import APIError

from app.schemas import (
    UserOut, UserAuth, TokenSchema,
    RefreshTokenRequest, ForgotPasswordRequest, ResetPasswordRequest
)
from app.utils import (
    get_hashed_password,
    create_access_token,
    create_refresh_token,
    verify_password,
    decode_refresh_token,
    generate_reset_token,
    hash_reset_token,
    RESET_TOKEN_EXPIRE_MINUTES,
)
from app.database import supabase
from app.email_utils import send_reset_email

router = APIRouter(tags=["auth"])


@router.post('/signup', summary="Create new user", response_model=UserOut)
async def create_user(data: UserAuth):
    existing_user = supabase.table("users").select("*").eq("email", data.email).execute()

    if existing_user.data:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User with this email already exist"
        )

    user = {
        "id": str(uuid4()),
        "email": data.email,
        "password": get_hashed_password(data.password),
        "username": data.username
    }

    try:
        supabase.table("users").insert(user).execute()
    except APIError:
        # Race condition safety net: two signups for the same email can both
        # pass the check above if they land close enough together. The DB's
        # unique constraint on email rejects the second insert — this turns
        # that into a clean 400 instead of an unhandled 500.
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User with this email already exist"
        )

    supabase.table("profiles").insert({"user_id": user["id"]}).execute()

    return UserOut(id=user["id"], email=user["email"], username=user["username"])


@router.post('/login', summary="Create access and refresh tokens for user", response_model=TokenSchema)
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    result = supabase.table("users").select("*").eq("email", form_data.username).execute()

    if not result.data:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="User not found!")

    user = result.data[0]

    if not verify_password(form_data.password, user["password"]):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Incorrect email or password")

    return {
        "access_token": create_access_token(user["email"]),
        "refresh_token": create_refresh_token(user["email"]),
    }


@router.post('/refresh', summary="Exchange a valid refresh token for a new access token", response_model=TokenSchema)
async def refresh_token(data: RefreshTokenRequest):
    email = decode_refresh_token(data.refresh_token)
    if not email:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid or expired refresh token")

    result = supabase.table("users").select("*").eq("email", email).execute()
    if not result.data:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")

    # Issue a brand new pair. The frontend should overwrite BOTH stored
    # tokens with this response, not just the access token.
    return {
        "access_token": create_access_token(email),
        "refresh_token": create_refresh_token(email),
    }


@router.post('/forgot-password', summary="Request a password reset email")
async def forgot_password(data: ForgotPasswordRequest):
    result = supabase.table("users").select("id, email").eq("email", data.email).execute()

    # Always return the same generic response whether or not the email
    # exists — otherwise this endpoint becomes a way to check which emails
    # are registered (user enumeration).
    generic_response = {"message": "If that email is registered, a reset link has been sent."}

    if not result.data:
        return generic_response

    user = result.data[0]
    raw_token, token_hash = generate_reset_token()
    expires_at = datetime.now(timezone.utc) + timedelta(minutes=RESET_TOKEN_EXPIRE_MINUTES)

    supabase.table("password_reset_tokens").insert({
        "id": str(uuid4()),
        "user_id": user["id"],
        "token_hash": token_hash,
        "expires_at": expires_at.isoformat(),
        "used": False,
    }).execute()

    send_reset_email(user["email"], raw_token)

    return generic_response


@router.post('/reset-password', summary="Reset password using a valid reset token")
async def reset_password(data: ResetPasswordRequest):
    token_hash = hash_reset_token(data.token)

    result = supabase.table("password_reset_tokens").select("*").eq("token_hash", token_hash).execute()

    if not result.data:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid or expired reset link")

    reset_row = result.data[0]

    if reset_row["used"]:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="This reset link has already been used")

    expires_at = datetime.fromisoformat(reset_row["expires_at"])
    if datetime.now(timezone.utc) > expires_at:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="This reset link has expired")

    new_hashed_password = get_hashed_password(data.new_password)
    supabase.table("users").update({"password": new_hashed_password}).eq("id", reset_row["user_id"]).execute()

    # Single-use: mark it spent so this same link can't reset the password again.
    supabase.table("password_reset_tokens").update({"used": True}).eq("id", reset_row["id"]).execute()

    return {"message": "Password has been reset successfully. Please log in with your new password."}
