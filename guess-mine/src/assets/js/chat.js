const { getSocket } = require("./sockets");

const messages = document.getElementById("jsMessages");
const sendMsg = document.getElementById("jsSendMsg");

const appendMsg = (text, nickname)=> {
    const li = document.createElement("li");
    li.innerHTML= `
        <span class="author ${nickname ? "out" : "self"}"> ${nickname ? nickname : "you"}</span> ${text}
    `
    messages.appendChild(li);
};

const handleSendMsg= (e)=>{
    e.preventDefault();
    const input= sendMsg.querySelector("input");
    const {value } = input;
    getSocket().emit(window.events.sendMsg, {message: value});
    input.value= "";
    appendMsg(value);
};

export const handleNewMessage= ({message, nickname})=> 
appendMsg(message,nickname);

if(sendMsg){
    sendMsg.addEventListener("submit", handleSendMsg);
}

export const disableChat = () => sendMsg.style.display= "none";
export const enableChat = () => sendMsg.style.display= "flex";