
document.addEventListener('DOMContentLoaded', () => {
    
    // connect user to websocket
    const websocketClient = new WebSocket("ws://localhost:12345/");

    const messageContainer = document.querySelector("#msg_cont");
    const username = document.querySelector("#username");
    const messageInput = document.querySelector("#msg_input");
    const sendMessageBtn = document.querySelector("#send_msg_btn");

    websocketClient.addEventListener("open", () => {

        // send message
        sendMessageBtn.addEventListener('click', () => {

            if (username.value) {
                websocketClient.send(username.value + ": " + messageInput.value)
            } else {
                alert("Enter Username!")
            }

            
        })


        // display messages
        websocketClient.addEventListener("message", (message) => {

            // create new messageChild to display
            let msg = document.createElement("p")
            msg.classList.add("msg")
            msg.textContent = message.data

            let msgTime = document.createElement("p")
            msgTime.classList.add("time")
            let curDate = new Date()
            msgTime.textContent = (curDate.getMonth() + 1) + "/" + curDate.getDate() + "/" + curDate.getFullYear()

            messageContainer.appendChild(msg) // append
            messageContainer.appendChild(msgTime)


        })

    });
}, false)