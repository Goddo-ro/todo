from config import app

import routes.user
import routes.todo


if __name__ == '__main__':
    app.run(debug=True)
