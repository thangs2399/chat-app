
document.addEventListener('DOMContentLoaded', () => {
    
    // // connect user to websocket
    const socketConn = io();

    // main displays pages
    const joinRoomPage = document.querySelector("#joinRoom-page");
    const homepageRoom = document.querySelector("#homepage-room");

    // elements from room login page
    const username = document.querySelector("#joinRoom-form #username");
    const roomNumber = document.querySelector("#joinRoom-form #roomNum");
    const joinRoomBtn2 = document.querySelector("#joinRoom-form #joinRoom-btn");

    // elements from room chat page
    const room = document.querySelector("#top-cont .roomNum");
    const user = document.querySelector("#top-cont .username");
    const messageContainer = document.querySelector("#msg_cont");
    const messageInput = document.querySelector("#msg_input");
    const sendMessageBtn = document.querySelector("#send_msg_btn");


    // join room 
    joinRoomBtn2.addEventListener("click", () => {

        if (username.value && roomNumber.value) {

            joinRoomPage.classList.toggle("pageActive");
            homepageRoom.classList.toggle("pageActive");

            // update room number and username
            room.textContent = "Room: " + roomNumber.value
            user.textContent = username.value


            socketConn.emit("join", roomNumber.value + "&#$" + username.value)

        } else {
            alert("Enter Username!");
        }
    })


    // update DOM for new user connection notification ( CLIENT )
    socketConn.addEventListener("newuser_joined_c", (msg) => {

        // create new messageChild to display
        let join = document.createElement("p");
        join.classList.add("join");
        join.textContent = msg;
        
        messageContainer.appendChild(join); // add to the message display
        messageContainer.scrollTop = messageContainer.scrollHeight;
    });


    // display the new messages ( CLIENT )
    socketConn.addEventListener("displayMessage_c", (data) => {
        // create new messageChild to display
        let msg = document.createElement("p");
        msg.classList.add("text");
        msg.textContent = data;

        // add time detail of the message
        let msgTime = document.createElement("p");
        msgTime.classList.add("time");
        let curDate = new Date();
        msgTime.textContent = (curDate.getMonth() + 1) + "/" + curDate.getDate() + "/" + curDate.getFullYear();

        // msg container to store text and time
        let msgCont = document.createElement("div");
        msgCont.classList.add("msg")

        // append
        msgCont.appendChild(msg);
        msgCont.appendChild(msgTime);
        messageContainer.appendChild(msgCont);

        messageContainer.scrollTop = messageContainer.scrollHeight; // always show the latest messages
    });

    // send message
    sendMessageBtn.addEventListener('click', () => {
        if (username.value) {
            // send message to server ( SERVER )
            socketConn.emit("sendMessage_s_r", username.value + ": " + messageInput.value + "&#$" + roomNumber.value);
        } else {
            alert("Enter Username!");
        }
        
    })

}, false)