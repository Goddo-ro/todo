import json

from config import mysql


class Todo:
    @staticmethod
    def format_todo(todo_tuple):
        result = dict()
        if len(todo_tuple) < 6:
            return result
        result['id'] = todo_tuple[0]
        result['text'] = todo_tuple[1]
        result['is_completed'] = todo_tuple[2]
        result['user_id'] = todo_tuple[3]
        result['time'] = todo_tuple[4]
        result['date'] = todo_tuple[5]
        return result

    @staticmethod
    def format_todos(todos):
        return [Todo.format_todo(todo) for todo in todos]

    @staticmethod
    def create(text, time, date, user_id):
        cur = mysql.connection.cursor()
        cur.execute('''INSERT INTO todos (text, time, date, user_id) VALUES (%s, %s, %s, %s)''',
                    (text, time, date, user_id,))
        mysql.connection.commit()
        cur.close()

    @staticmethod
    def get_all_by_user_id(user_id):
        cur = mysql.connection.cursor()
        cur.execute('''SELECT * FROM todos WHERE user_id = %s''', (user_id,))
        data = cur.fetchall()
        cur.close()
        return json.dumps(Todo.format_todos(data), indent=4, sort_keys=True, default=str)

    @staticmethod
    def get_by_date(user_id, date):
        cur = mysql.connection.cursor()
        cur.execute('''SELECT * FROM todos WHERE user_id = %s AND date = %s''', (user_id, date,))
        data = cur.fetchall()
        cur.close()
        return json.dumps(Todo.format_todos(data), indent=4, sort_keys=True, default=str)

    @staticmethod
    def get_by_id(todo_id):
        cur = mysql.connection.cursor()
        cur.execute('''SELECT * FROM todos WHERE id = %s''', (todo_id,))
        data = cur.fetchone()
        cur.close()
        return json.dumps(Todo.format_todo(data), indent=4, sort_keys=True, default=str)

    @staticmethod
    def remove_by_id(todo_id):
        cur = mysql.connection.cursor()
        cur.execute('''DELETE FROM todos WHERE id = %s''', (todo_id,))
        mysql.connection.commit()
        cur.close()

    @staticmethod
    def toggle_todo(todo_id):
        todo = json.loads(Todo.get_by_id(todo_id))
        if not todo:
            return
        cur = mysql.connection.cursor()
        cur.execute('''UPDATE todos SET is_completed = %s WHERE id = %s''', (not todo['is_completed'], todo_id,))
        mysql.connection.commit()
        cur.close()
