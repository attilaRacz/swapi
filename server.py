from flask import Flask
from flask import Flask, flash, redirect, render_template, request, session, abort, url_for
import os
import main

app = Flask(__name__)


@app.route('/')
def home():
    if not session.get('logged_in'):
        return redirect(url_for('login'))
    else:
        return render_template('index.html')


@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        POST_USERNAME = str(request.form['username'])
        POST_PASSWORD = str(request.form['password'])
        user_data = main.main(POST_USERNAME)
        if user_data is None:
            pass
        else:
            valid_account = POST_USERNAME == user_data['user_name'] and POST_PASSWORD == user_data['password']  # ha ismeretlen felhasználót írok be, elszáll
            if valid_account:
                session['logged_in'] = True
                session['username'] = request.form['username']
                return redirect(url_for('home'))
            else:
                flash('wrong password!')
    return render_template('login.html')


@app.route("/logout")
def logout():
    session['logged_in'] = False
    session['username'] = ""
    return home()


if __name__ == "__main__":
    app.secret_key = os.urandom(12)
    app.run(debug=True, host='0.0.0.0', port=4000)
