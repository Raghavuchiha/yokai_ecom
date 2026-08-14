from fastapi import APIRouter, Depends, HTTPException, status

from app.schemas import CartItemIn, CartUpdateIn
from app.database import supabase
from app.deps import get_current_user

router = APIRouter(prefix="/cart", tags=["cart"])


@router.get("")
async def get_cart(current_user: dict = Depends(get_current_user)):
    result = supabase.table("cart").select("*").eq("user_id", current_user["id"]).execute()
    return result.data


@router.post("")
async def add_to_cart(data: CartItemIn, current_user: dict = Depends(get_current_user)):
    user_id = current_user["id"]

    existing = supabase.table("cart")\
        .select("*")\
        .eq("user_id", user_id)\
        .eq("product_id", data.product_id)\
        .eq("size", data.size)\
        .execute()

    if existing.data:
        current_qty = existing.data[0]["quantity"]
        cart_id = existing.data[0]["id"]
        result = supabase.table("cart")\
            .update({"quantity": current_qty + data.quantity})\
            .eq("id", cart_id)\
            .execute()
        return result.data[0]
    else:
        result = supabase.table("cart").insert({
            "user_id": user_id,
            "product_id": data.product_id,
            "size": data.size,
            "quantity": data.quantity
        }).execute()
        return result.data[0]


def _get_owned_cart_item(cart_id: str, user_id: str) -> dict:
    """Fetches a cart row and raises 404 if it doesn't exist OR doesn't
    belong to the current user. Returning 404 (not 403) in both cases avoids
    leaking whether a given cart_id exists at all for someone else's cart."""
    result = supabase.table("cart").select("*").eq("id", cart_id).execute()
    if not result.data or result.data[0]["user_id"] != user_id:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Cart item not found")
    return result.data[0]


@router.patch("/{cart_id}")
async def update_cart(cart_id: str, data: CartUpdateIn, current_user: dict = Depends(get_current_user)):
    # Ownership check closes the IDOR — previously any logged-in user could
    # update ANY cart_id, including one belonging to a different user.
    _get_owned_cart_item(cart_id, current_user["id"])

    result = supabase.table("cart")\
        .update({"quantity": data.quantity})\
        .eq("id", cart_id)\
        .execute()
    return result.data[0]


@router.delete("/{cart_id}")
async def delete_cart_item(cart_id: str, current_user: dict = Depends(get_current_user)):
    _get_owned_cart_item(cart_id, current_user["id"])

    supabase.table("cart").delete().eq("id", cart_id).execute()
    return {"message": "Item removed from cart"}
