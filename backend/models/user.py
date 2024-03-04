from werkzeug.security import generate_password_hash, check_password_hash

from config import mysql


class User:
    @staticmethod
    def make_user_map(user_tuple) -> dict:
        result = dict()
        result['id'] = user_tuple[0]
        result['username'] = user_tuple[1]
        result['password'] = user_tuple[2]
        return result

    @staticmethod
    def create(username="", password=""):
        """Create a new user"""
        user = User.get_by_name(username)
        if user:
            return

        cur = mysql.connection.cursor()
        cur.execute('''INSERT INTO users (username, password) VALUES (%s, %s)''',
                    (username, User.encrypt_password(password)))
        mysql.connection.commit()
        cur.close()

        return User.get_by_name(username)

    @staticmethod
    def get_by_name(username):
        cur = mysql.connection.cursor()
        cur.execute('''SELECT * FROM users WHERE username = %s''', (username,))
        data = cur.fetchone()
        cur.close()
        if data:
            return User.make_user_map(data)
        return data

    @staticmethod
    def get_by_id(id):
        cur = mysql.connection.cursor()
        cur.execute('''SELECT * FROM users WHERE id = %s''', (id,))
        data = cur.fetchone()
        cur.close()
        if data:
            return User.make_user_map(data)
        return data

    @staticmethod
    def encrypt_password(password):
        """Encrypt password"""
        return generate_password_hash(password)

    @staticmethod
    def login(username, password):
        """Login a user"""
        user = User.get_by_name(username)
        if not user or not check_password_hash(user['password'], password):
            return
        user.pop('password')
        return user