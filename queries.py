import database_common


@database_common.connection_handler
def get_user(cursor, name):
    cursor.execute("""SELECT user_name, password FROM users
                      WHERE user_name = %(user_name)s;""",
    {'user_name': name})
    user = cursor.fetchone()
    return user
