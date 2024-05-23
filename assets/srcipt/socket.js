
import { io } from "https://cdn.socket.io/4.7.5/socket.io.esm.min.js";
<<<<<<< HEAD
export const socket = io("http://10.0.2.151:8000");
import { wsMovement } from "./index.js";
socket.on('divClicked', (msg) => {
    console.log("message form server",msg)
    let data = JSON.parse(msg)
    wsMovement(data.divId)
  });
  
=======
export const socket = io("http://127.0.0.1:8000");
import { createMvmt } from "./index.js";
socket.on('divClicked', (msg) => {
  console.log("message form server", msg)
  let data = JSON.parse(msg)
  console.log(typeof data)
  createMvmt(data.divId)

});

>>>>>>> 1b4f78b88c679cb45c03c235735bcb97c57fa652

// setInterval(()=>{
// //   socket.emit("divClicked", "world");
// },4000)






