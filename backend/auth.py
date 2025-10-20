from fastapi import APIRouter, Header, HTTPException, Response, Request
from typing import Optional
from datetime import datetime, timedelta, timezone
import httpx
from models import User, Session, SessionResponse

router = APIRouter(prefix="/auth", tags=["authentication"])

# Emergent auth endpoint
EMERGENT_AUTH_URL = "https://demobackend.emergentagent.com/auth/v1/env/oauth/session-data"

async def get_db():
    from server import db
    return db

@router.post("/session")
async def create_session(x_session_id: str = Header(...)):
    """Exchange session_id for user data and create session"""
    try:
        # Call Emergent auth service
        async with httpx.AsyncClient() as client:
            response = await client.get(
                EMERGENT_AUTH_URL,
                headers={"X-Session-ID": x_session_id},
                timeout=10.0
            )
            
            if response.status_code != 200:
                raise HTTPException(status_code=401, detail="Invalid session ID")
            
            user_data = response.json()
        
        db = await get_db()
        
        # Create or update user
        user = User(
            email=user_data["email"],
            name=user_data["name"],
            picture=user_data.get("picture")
        )
        
        # Check if user exists
        existing_user = await db.users.find_one({"email": user.email})
        if not existing_user:
            # Create new user
            await db.users.insert_one(user.dict())
        
        # Create session with 7-day expiry
        session = Session(
            session_token=user_data["session_token"],
            user_email=user.email,
            expires_at=datetime.now(timezone.utc) + timedelta(days=7)
        )
        
        # Store session
        await db.sessions.insert_one(session.dict())
        
        return SessionResponse(
            id=user_data["id"],
            email=user_data["email"],
            name=user_data["name"],
            picture=user_data.get("picture"),
            session_token=user_data["session_token"]
        )
    
    except httpx.TimeoutException:
        raise HTTPException(status_code=504, detail="Authentication service timeout")
    except httpx.RequestError as e:
        raise HTTPException(status_code=503, detail=f"Authentication service error: {str(e)}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")

@router.get("/verify")
async def verify_session(request: Request):
    """Verify session token and return user data"""
    # Check cookie first
    session_token = request.cookies.get("session_token")
    
    # Fall back to Authorization header
    if not session_token:
        auth_header = request.headers.get("Authorization")
        if auth_header and auth_header.startswith("Bearer "):
            session_token = auth_header.split(" ")[1]
    
    if not session_token:
        raise HTTPException(status_code=401, detail="No session token provided")
    
    db = await get_db()
    
    # Find session
    session = await db.sessions.find_one({"session_token": session_token})
    if not session:
        raise HTTPException(status_code=401, detail="Invalid session")
    
    # Check expiry
    if session["expires_at"] < datetime.now(timezone.utc):
        await db.sessions.delete_one({"session_token": session_token})
        raise HTTPException(status_code=401, detail="Session expired")
    
    # Get user
    user = await db.users.find_one({"email": session["user_email"]})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    return {
        "email": user["email"],
        "name": user["name"],
        "picture": user.get("picture"),
        "total_games": user.get("total_games", 0),
        "wins": user.get("wins", 0),
        "losses": user.get("losses", 0),
        "draws": user.get("draws", 0)
    }

@router.post("/logout")
async def logout(request: Request, response: Response):
    """Logout user and delete session"""
    session_token = request.cookies.get("session_token")
    
    if not session_token:
        auth_header = request.headers.get("Authorization")
        if auth_header and auth_header.startswith("Bearer "):
            session_token = auth_header.split(" ")[1]
    
    if session_token:
        db = await get_db()
        await db.sessions.delete_one({"session_token": session_token})
    
    # Clear cookie
    response.delete_cookie("session_token", path="/")
    
    return {"message": "Logged out successfully"}
