from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes import admin, auth, profile, products, cart


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "https://ecom-project-07.vercel.app",
        "https://yokaiecom.vercel.app",
        "https://ecomproject07.vercel.app"
        "https://yokaiecom.vercel.app/admin/login"
        
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(profile.router)
app.include_router(products.router)
app.include_router(cart.router)
app.include_router(admin.router)
