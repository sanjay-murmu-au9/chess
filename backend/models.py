from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime

class User(BaseModel):
    email: str
    name: str
    picture: Optional[str] = None
    created_at: datetime = Field(default_factory=lambda: datetime.utcnow())
    total_games: int = 0
    wins: int = 0
    losses: int = 0
    draws: int = 0

class Session(BaseModel):
    session_token: str
    user_email: str
    expires_at: datetime
    created_at: datetime = Field(default_factory=lambda: datetime.utcnow())

class SessionResponse(BaseModel):
    id: str
    email: str
    name: str
    picture: Optional[str] = None
    session_token: str
