
document.addEventListener('DOMContentLoaded', () => {
    
    // // connect user to websocket
    const socketConn = io();

    // elements from login page
    const loginPage = document.querySelector("#login-page");
    const username = document.querySelector("#login-form #username");
    const chatBtn = document.querySelector("#chat-btn");

    // elements from home page
    const homepage = document.querySelector("#homepage");
    const messageContainer = document.querySelector("#msg_cont");
    const messageInput = document.querySelector("#msg_input");
    const sendMessageBtn = document.querySelector("#send_msg_btn");
    const displayUsername = document.querySelector("#top-cont #username")

    // join public chat
    chatBtn.addEventListener("click", () => {

        if (username.value) {
            loginPage.classList.toggle("pageActive");
            homepage.classList.toggle("pageActive");

            displayUsername.textContent = username.value; // set username
            
            let curDate = new Date()

            // notify server of new user connection ( SERVER )
            socketConn.emit("newuser_joined_s", "\"" + username.value + "\"" + " just connected - " + (curDate.getMonth() + 1) + "/" + curDate.getDate() + "/" + curDate.getFullYear());

        } else {
            alert("Enter Username!")
        }
    });


    // update DOM for new user connection notification ( CLIENT )
    socketConn.addEventListener("newuser_joined_c", (msg) => {

        // create new messageChild to display
        let join = document.createElement("p")
        join.classList.add("join")
        join.textContent = msg
        
        messageContainer.appendChild(join) // add to the message display
        messageContainer.scrollTop = messageContainer.scrollHeight
    });


    // send messages to server
    socketConn.addEventListener("connect", () => {

        // send message
        sendMessageBtn.addEventListener('click', () => {

            if (username.value) {
                // send message to server ( SERVER )
                socketConn.emit("sendMessage_s", username.value + ": " + messageInput.value)
            } else {
                alert("Enter Username!")
            }
            
        })
    });


    // display the new messages ( CLIENT )
    socketConn.addEventListener("displayMessage_c", (data) => {
        // create new messageChild to display
        let msg = document.createElement("p")
        msg.classList.add("msg")
        msg.textContent = data

        // add time detail of the message
        let msgTime = document.createElement("p")
        msgTime.classList.add("time")
        let curDate = new Date()
        msgTime.textContent = (curDate.getMonth() + 1) + "/" + curDate.getDate() + "/" + curDate.getFullYear()

        messageContainer.appendChild(msg) // append
        messageContainer.appendChild(msgTime)

        messageContainer.scrollTop = messageContainer.scrollHeight // always show the latest messages
    });


    socketConn.addEventListener("redirect", (data) => {

        window.location = data + "?param=value";
    });

}, false)