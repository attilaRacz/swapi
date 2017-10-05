import database_common


@database_common.connection_handler
def get_user(cursor, name):
    cursor.execute("""SELECT user_name, password FROM users
                      WHERE user_name = %(user_name)s;""", {'user_name': name})
    user = cursor.fetchone()
    return user


@database_common.connection_handler
def register_user(cursor, username, password):
    cursor.execute("""INSERT INTO users
                      (user_name, password)
                      values ( '%s', '%s' );""" % (username, password))
