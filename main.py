import queries


def main(name):
    user = queries.get_user(name)
    return user

if __name__ == '__main__':
    main()
