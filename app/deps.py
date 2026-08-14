from fastapi import Depends, HTTPException, status
from app.utils import decode_access_token, oauth2_scheme
from app.database import supabase


async def get_current_user(token: str = Depends(oauth2_scheme)) -> dict:
    """Decodes the access token and returns the current user's row
    (id, username, email). Every protected route depends on this instead
    of repeating the decode-then-lookup block itself."""
    email = decode_access_token(token)
    if not email:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid or expired token")

    result = supabase.table("users").select("id, username, email").eq("email", email).execute()
    if not result.data:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")

    return result.data[0]
