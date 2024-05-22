
import { io } from "https://cdn.socket.io/4.7.5/socket.io.esm.min.js";
export const socket = io("http://10.0.2.151:8000");
import { wsMovement } from "./index.js";
socket.on('divClicked', (msg) => {
    console.log("message form server",msg)
    let data = JSON.parse(msg)
    wsMovement(data.divId)
  });
  

// setInterval(()=>{
// //   socket.emit("divClicked", "world");
// },4000)






