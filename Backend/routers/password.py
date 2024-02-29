from fastapi import APIRouter, Depends, HTTPException, Query, Body, Path
from fastapi.responses import JSONResponse
from config.database import Session
from models.user import User as UserModel
from models.password import Password as PasswordModel
from fastapi.encoders import jsonable_encoder
from schemas.password import Password
from typing import List, Annotated
from utils.jwt_manager import validate_token
from fastapi.security import OAuth2PasswordBearer
from routers.auth import get_current_active_user
import random

password_router = APIRouter()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


#GET ALL PASSWORDS
@password_router.get("/password/get-all-passwords", tags=["Password"], response_model=List[Password],status_code=200)
def get_passwords(current_user: Annotated[UserModel, Depends(get_current_active_user)]) -> List[Password]:
    db = Session()
    result = db.query(PasswordModel).filter(PasswordModel.userID == current_user.userID).all()
    return JSONResponse(content=jsonable_encoder(result), status_code=200)
    

#CREATE PASSWORD
@password_router.post("/password/create-password", tags=["Password"], response_model=dict, status_code=201)
def create_password(current_user: Annotated[UserModel, Depends(get_current_active_user)],
    length: int = Query(..., description="Length of the password"),
    capital_letters: int = Query(..., description="Include capital letters in the password"),
    numbers: int = Query(..., description="Include numbers in the password"),
    special_characters: int = Query(..., description="Include special characters in the password")
):
    db = Session()
    new_password = PasswordModel()
    new_password.password = generate_password(length, capital_letters, numbers, special_characters)
    db.add(new_password)
    new_password.userID = current_user.userID
    db.commit()
    return JSONResponse(content={"message": "Password created successfully"}, status_code=201)
   

#UPDATE PASSWORD BY ID
@password_router.put("/password/update-password/{passwordID}", tags=["Password"], response_model=dict, status_code=201)
def update_password(
    current_user: Annotated[UserModel, Depends(get_current_active_user)],
    passwordID: int = Path(..., description="ID of the password"),
    password_data: dict = Body(..., description="Password data in JSON format")
):
    db = Session()
    password_to_update = db.query(PasswordModel).filter(PasswordModel.passwordID == passwordID).first()
    if not password_to_update:
        return HTTPException(status_code=404, detail="Password not found")
    if password_to_update.userID != current_user.userID:
        return HTTPException(status_code=401, detail="Unauthorized")
    
    # Update password using data from the request body
    password_to_update.password = generate_password(
        password_data.get('length', 8),
        password_data.get('capital_letters', 2),
        password_data.get('numbers', 2),
        password_data.get('special_characters', 2)
    )

    db.commit()
    return JSONResponse(content={"message": "Password updated successfully"}, status_code=200)


@password_router.delete("/password/delete-password/{passwordID}", tags=["Password"], response_model=dict, status_code=201)
def delete_password(current_user: Annotated[UserModel, Depends(get_current_active_user)], passwordID: int = Path(..., description="ID of the password")):
    db = Session()
    password_to_delete = db.query(PasswordModel).filter(PasswordModel.passwordID == passwordID).first()
    if not password_to_delete:
        return HTTPException(status_code=404, detail="Password not found")
    if password_to_delete.userID != current_user.userID:
        return HTTPException(status_code=401, detail="Unauthorized")
    db.delete(password_to_delete)
    db.commit()
    return JSONResponse(content={"message": "Password deleted successfully"}, status_code=200)


def generate_password(length, capital_letters, numbers, special_characters):
    minusculas = 0
    caracteres = set()
    if capital_letters:
        caracteres.update(list("ABCDEFGHIJKLMNOPQRSTUVWXYZ"))
    if minusculas:
        caracteres.update(list("abcdefghijklmnopqrstuvwxyz"))
    if numbers:
        caracteres.update(list("0123456789"))
    if special_characters:
        caracteres.update(list("!@#$%^&*-_=+[]();:,.<>/?'"))
    minusculas = length - len(caracteres)
    if minusculas > 0:
        caracteres.update(list("abcdefghijklmnopqrstuvwxyz"))
    password = ""
    for _ in range(length):
        password += random.choice(list(caracteres))

    return password





