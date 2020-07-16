import events from "./events";

import {chooseWord } from "./words";

let sockets = [];
let inProgress = false;
let word= null;

const chooseLeader = () => sockets[Math.floor(Math.random() * sockets.length)];

const socketController= (socket ,io)=> {
    const broadcast = (event, data)=> socket.broadcast.emit(event,data);
    const superBroadcast = (event, data)=> io.emit(event, data);
    const sendPlayerUpdate = () =>
        superBroadcast(events.playerUpdate, {sockets});

    const startGame= ()=> {
        if(inProgress == false){
            inProgress= true;
            const leader =  chooseLeader();
            word = chooseWord();
            io.to( leader.id).emit(events.leaderNotif ,{word });
            superBroadcast(events.gameStarted);
        }
    };

    const endGame = () => {
        inProgress = false;
    };

    socket.on(events.setNickname, ({nickname})=> {
        socket.nickname= nickname;
        sockets.push({ id:socket.id, points:0, nickname: nickname});
        broadcast.emit(events.newUser, {nickname});
        sendPlayerUpdate();
        if(sockets.length == 1 ){
            startGame();
        }
    });
    socket.on(events.disconnect, ()=>{
        sockets = socket.filter(aSocket => aSocket.id !== socket.id);
        if(sockets.length === 1){
            endGame();
        }
        broadcast.emit(events.disconnected, {nickname:socket.nickname})
        sendPlayerUpdate();
        startGame();
    });

    socket.on(events.sendMsg , ({message})=> {
        broadcast(events.newMsg, {message,nickname:socket.nickname})
    });

    socket.on(events.beginPath, ({x,y})=> 
    broadcast(events.beganPath, {x, y})
    );

    socket.on(events.strokePath, ({x,y, color})=>
        broadcast(events.strokedPath, {x,y, color})
    );

    socket.on(events.fill, ({color})=>{
        broadcast(events.filled, {color });
    });
};

export default socketController;


/*
{
    socket.on("newMassage", message=> {
     socket.broadcast.emit("messageNotif", {
         message, 
         nickname: socket.nickname || "anon"});
    });
    socket.on("setNickName", ({nickname})=> {
        socket.nickname= nickname;
        //socket = obj, socket.potato=5 이런거도 가능
    })
 }*/