from fastapi import APIRouter

from app.database import supabase

router = APIRouter(tags=["products"])


@router.get("/products")
async def get_products():
    result = supabase.table("products").select("*").execute()
    return result.data
