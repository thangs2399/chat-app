
######################################## IMPORTS ########################################

import jwt
import datetime
import os

from flask import (
    Flask, redirect, render_template, session, flash, url_for, request, jsonify
)
from flask_socketio import (
    SocketIO, send, emit
)



######################################## APP CONFIGURATIONS ########################################

# app configurations
app = Flask(__name__)
app.config["SECRET_KEY"] = "secret!"

# initializations
socketio = SocketIO(app)



######################################## MAIN PROGRAM ########################################

# dictionary to store all clients
users = {}


@app.route("/")
def chat():
    return render_template("index.html")


@socketio.on("connect")
def connect():
    print()
    print(20 * "-")
    print(f"USER[{request.sid}] Connected!")
    print(20 * "-")
    print()


@socketio.on("sendMessage_s")
def sendMessage_s(msg):

    socketio.emit("displayMessage_c", msg)

    
@socketio.on("newuser_joined_s")
def newuser_joined_s(msg):
    
    socketio.emit("newuser_joined_c", msg)



######################################## RUN THE PROGRAM ########################################

if __name__ == '__main__':
    socketio.run(app, "localhost", "5555", debug=True)
