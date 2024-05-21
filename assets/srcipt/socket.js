
import { io } from "https://cdn.socket.io/4.7.5/socket.io.esm.min.js";
export const socket = io("http://127.0.0.1:8000");
import { divClick } from "./index.js";
socket.on('divClicked', (msg) => {
    console.log("message form server",msg)
    let data = JSON.parse(msg)
    divClick(data.divId)
  });
  

// setInterval(()=>{
// //   socket.emit("divClicked", "world");
// },4000)






