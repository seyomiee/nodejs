// eslint-disable-next-line no-undef

const socket = io("/");

function sendMessage(message){
    socket.emit("newMessage", {message});
    console.log(`you: ${message}`);
}

function setNickname(nickname){
    socket.emit("set name", {nickname});
}

function handleMessageNotif(data){
    const {message , nickname}= data;
    console.log(`${nickname}: ${message}`);
    
}

socket.on("messageNotif", handleMessageNotif);