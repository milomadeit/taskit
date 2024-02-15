import os
from flask_socketio import SocketIO, emit

# create your SocketIO instance
if os.environ.get("FLASK_ENV") == "production":
    origins = [
        "https://cocreate-x0xh.onrender.com",
    ]
else:
    origins = "*"

socketio = SocketIO(cors_allowed_origins=origins)

# example setup for socket function
# @socketio.on("event-type")
# def function_to_handle_event(data_included_with_event):
#     # code to follow
    
@socketio.on("chat")
def handle_chat(data):
    # code to follow
    emit("chat", data, broadcast=True)