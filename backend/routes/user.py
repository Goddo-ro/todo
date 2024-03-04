import jwt
from flask import request


from config import app
from models.user import User


@app.route('/users/register', methods=['POST'])
def add_user():
    username = request.json['username']
    password = request.json['password']
    if not username or not password:
        return {
            "message": "Please provide user details",
            "data": None,
            "error": "Bad request"
        }, 400
    user = User().create(username, password)
    if not user:
        return {
            "message": "User already exists",
            "error": "Conflict",
            "data": None
        }, 409
    return {
        "message": "Successfully created new user",
        "data": user
    }, 201


@app.route('/users/login', methods=['POST'])
def login():
    try:
        username = request.json['username']
        password = request.json['password']
        if not username or not password:
            return {
                "message": "Please provide user details",
                "data": None,
                "error": "Bad request"
            }, 400
        user = User().login(
            username,
            password
        )
        if user:
            try:
                # token should expire after 24 hrs
                user["token"] = jwt.encode(
                    {"user_id": user['id']},
                    app.config["SECRET_KEY"],
                    algorithm="HS256"
                )
                return {
                    "message": "Successfully fetched auth token",
                    "data": user
                }
            except Exception as e:
                return {
                    "error": "Something went wrong",
                    "message": str(e)
                }, 500
        return {
            "message": "Error fetching auth token!, invalid email or password",
            "data": None,
            "error": "Unauthorized"
        }, 404
    except Exception as e:
        return {
            "message": "Something went wrong!",
            "error": str(e),
            "data": None
        }, 500
