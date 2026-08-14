from passlib.context import CryptContext
import os
import secrets
import hashlib
from datetime import datetime, timedelta, timezone
from typing import Union, Any
from jose import JWTError, jwt
from fastapi.security import OAuth2PasswordBearer
from dotenv import load_dotenv

load_dotenv()

ACCESS_TOKEN_EXPIRE_MINUTES = 30 # 30 minutes
REFRESH_TOKEN_EXPIRE_MINUTES = 60 *24 * 7 # 7 days
RESET_TOKEN_EXPIRE_MINUTES = 30
ALGORITHM = "HS256"
SECRET_KEY = os.getenv('JWT_SECRET_KEY')   # should be kept secret
REFRESH_SECRET_KEY = os.getenv('JWT_REFRESH_SECRET_KEY')   # should be kept secret

password_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

def get_hashed_password(password: str)->str:
    """Takes a plain password and returns the hash for it so that
    it can be safely stored in the database."""
    return password_context.hash(password)

def verify_password(password: str, hashed_pass: str) -> bool:
    """Takes both the plain and the hashed passwords and 
    returns a boolean representing whether the two passwords
    match or not."""
    return password_context.verify(password, hashed_pass)

def create_access_token(subject: Union[str, Any], expires_delta: int = None) -> str:
    if expires_delta is not None:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)

    # "type" tags this as an access token, so /refresh can reject a refresh
    # token being reused as an access token and vice versa.
    to_encode = {"exp": expire, "sub": str(subject), "type": "access"}
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, ALGORITHM)
    return encoded_jwt

def create_refresh_token(subject: Union[str, Any], expires_delta: int = None) -> str:
    if expires_delta is not None:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=REFRESH_TOKEN_EXPIRE_MINUTES)

    to_encode = {"exp": expire, "sub": str(subject), "type": "refresh"}
    encoded_jwt = jwt.encode(to_encode, REFRESH_SECRET_KEY, ALGORITHM)
    return encoded_jwt

def decode_access_token(token: str):
    """Validates an ACCESS token specifically and returns the email (sub).
    Rejects a refresh token even if someone tries to pass one in here."""
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        if payload.get("type") != "access":
            return None
        return payload.get("sub")
    except JWTError:
        return None

def decode_refresh_token(token: str):
    """Validates a REFRESH token specifically and returns the email (sub)."""
    try:
        payload = jwt.decode(token, REFRESH_SECRET_KEY, algorithms=[ALGORITHM])
        if payload.get("type") != "refresh":
            return None
        return payload.get("sub")
    except JWTError:
        return None

def generate_reset_token() -> tuple[str, str]:
    """Returns (raw_token, token_hash). The raw token is emailed to the user
    and never stored; only the sha256 hash is stored in the DB, so a leaked
    DB dump can't be used to reset anyone's password."""
    raw_token = secrets.token_urlsafe(32)
    token_hash = hashlib.sha256(raw_token.encode()).hexdigest()
    return raw_token, token_hash

def hash_reset_token(raw_token: str) -> str:
    return hashlib.sha256(raw_token.encode()).hexdigest()

