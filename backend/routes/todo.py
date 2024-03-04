from flask import jsonify, request


from auth_middleware import token_required
from config import app
from models.todo import Todo
from datetime import datetime


@app.route('/todos', methods=['POST'])
@token_required
def add_todo(current_user):
    try:
        date = request.json['date']
        date = datetime.strptime(date, '%d.%m.%Y')
        text = request.json['text']
        if not text:
            return {
                "message": "Please provide todo details",
                "data": None,
                "error": "Bad request"
            }, 400
        # TODO: add time as param
        Todo.create(text, datetime.now().time(), date, current_user['id'])
        return jsonify({'message': 'Data added successfully'})
    except Exception as e:
        return {
            "message": "Something went wrong!",
            "error": str(e),
            "data": None
        }, 500


@app.route('/todos', methods=['GET'])
@token_required
def get_todos(current_user):
    try:
        date = request.args.get('date')
        date = datetime.strptime(date, '%d.%m.%Y')
        if date:
            return Todo.get_by_date(current_user['id'], date)
        return Todo.get_all_by_user_id(current_user['id'])
    except Exception as e:
        return {
            "message": "Something went wrong!",
            "error": str(e),
            "data": None
        }, 500


@app.route('/todos/remove/<int:id>', methods=['POST'])
@token_required
def remove_todo(current_user, id):
    try:
        Todo.remove_by_id(id)
        return jsonify({'message': 'Data removed successfully'})
    except Exception as e:
        return {
            "message": "Something went wrong!",
            "error": str(e),
            "data": None
        }, 500


@app.route('/todos/toggle/<int:id>', methods=['POST'])
@token_required
def toggle_todo(current_user, id):
    try:
        Todo.toggle_todo(id)
        return jsonify({'message': 'Todo handled successfully'})
    except Exception as e:
        return {
            "message": "Something went wrong!",
            "error": str(e),
            "data": None
        }, 500
