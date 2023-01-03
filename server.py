import asyncio
import websockets
import os
import pymongo
import datetime




all_clients = []



def getDB():
    """
        > gets database from mongoDB
    """
    client = pymongo.MongoClient(f"mongodb+srv://${os.getenv('mongoUsername')}:${os.getenv('mongoPassword')}@capp.7ecgh3z.mongodb.net/?retryWrites=true&w=majority")

    return client.chat["messages"]


def insertMsg(message):
    """
        > insert message data to mongoDB
    """
    client = pymongo.MongoClient(f"mongodb+srv://{os.getenv('mongoUsername')}:{os.getenv('mongoPassword')}@capp.7ecgh3z.mongodb.net/?retryWrites=true&w=majority")

    [username, msg] = message.split(":")

    message = {
        "username": username.strip(),
        "msg": msg.strip(),
        "time": round(datetime.datetime.now().timestamp(), 2),
    }

    client.chat["messages"].insert_one(message)


async def start_server():
    '''
        Summary: server started
    '''
    print('Server Started!!!')

    # new client connected
    async with websockets.serve(new_client_connected, "localhost", 12345):
        await asyncio.Future()  # run forever



async def new_client_connected(client_socket, path):
    '''
        Summary: new client connected

        1. activate on new client connection
            a. add client to clients list
            b. listen for message
            c. if there are messages -> send them to all clients
    '''
    print("New Client Connected!")
    
    # add client to client list
    all_clients.append(client_socket)

    # listen for message
    while True:

        new_message = await client_socket.recv()
        
        print("Client sent: ", new_message) 

        # send message to other clients
        await send_message(new_message)




async def send_message(message: str):
    '''
        Summary: send message to all clients
    '''
    for client in all_clients:

        await client.send(message)

        insertMsg(message) # store in database






if __name__ == '__main__':

    asyncio.run(start_server())