import events from "./events";

const socketController= (socket)=> {
    const broadcast = (event, data)=> socket.broadcast.emit(event,data);
    socket.on(events.setNickname, ({nickname})=> {
        socket.nickname= nickname;
        broadcast.emit(events.newUser, {nickname})
    });
    socket.on(events.disconnect, ()=>{
        broadcast.emit(events.disconnected, {nickname:socket.nickname})
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