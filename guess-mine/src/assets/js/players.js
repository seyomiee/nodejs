import { disableCanvas, hideControls, enableCanvas, showControls } from "./paint";

const board = document.getElementById("jsPBoard");
const notifs = document.getElementById("jsNotifs");

const addPlayers = (players)=> 
    board.innerHTML= "";
    players.forEach(player=>{
    const playerElement = document.createElement("span");
    playerElement.innerText= `${player.nickname} : ${player.points}`;
    board.appendChild(playerElement);
});

const setNotifs = (text)=> {
    notifs.innerText="";
    notifs.innerText= text;
}

export const handlePlayerUpdate=  ({sockets})=> addPlayers(sockets);

export const handleGameStarted = () => {
    setNotifs("");
    disableCanvas();
    hideControls();

}

export const handleLeaderNotif = ({word}) =>{
    enableCanvas();
    showControls();
    notifs.innerText= `paint : ${word}`;
};