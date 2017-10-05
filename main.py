import queries


def login(name):
    user = queries.get_user(name)
    return user


def register(username, password):
    queries.register_user(username, password)

if __name__ == '__main__':
    login()
