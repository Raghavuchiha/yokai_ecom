from fastapi import APIRouter, Depends

from app.schemas import UserOut
from app.database import supabase
from app.deps import get_current_user

router = APIRouter(tags=["profile"])


@router.get("/users", response_model=list[UserOut])
async def get_users(current_user: dict = Depends(get_current_user)):
    # Now requires login — previously this leaked every user's id/username/email
    # to anyone, no auth required at all.
    result = supabase.table("users").select("id, username, email").execute()
    return result.data


@router.get("/me", response_model=UserOut)
async def get_me(current_user: dict = Depends(get_current_user)):
    return current_user


@router.get("/profile")
async def get_profile(current_user: dict = Depends(get_current_user)):
    user_id = current_user["id"]

    profile_result = supabase.table("profiles").select("*").eq("user_id", user_id).execute()

    if not profile_result.data:
        return {
            "user_id": user_id,
            "full_name": None,
            "phone": None,
            "date_of_birth": None,
            "gender": None,
            "avatar_url": None
        }

    return profile_result.data[0]


@router.patch("/profile")
async def update_profile(data: dict, current_user: dict = Depends(get_current_user)):
    user_id = current_user["id"]

    result = supabase.table("profiles").upsert(
        {"user_id": user_id, **data},
        on_conflict="user_id"
    ).execute()

    return result.data[0]
