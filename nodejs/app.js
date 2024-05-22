import express from 'express'
import {Server} from 'socket.io'
import cors from 'cors'

const io = new Server({
    cors: {
        // origin: ["http://127.0.0.1:3000","http://localhost:3000"],
        origin:"*"
        // credentials: true
  }
})
const corsOptions = {
    origin: '*',//(https://your-client-app.com)
    optionsSuccessStatus: 200,
  };
 
  

const app =  express()
app.use(cors(corsOptions));
const PORT = 8000
app.get('/',(req,res)=>{
    res.send('hello world')
})

const server = app.listen(PORT,()=>{
    console.log(`listening on port:${PORT}`)
})
io.listen(server)


io.on('connection',(socket)=>{
    console.log('new web socket connection added')
    socket.join('room1')
    socket.on('divClicked',(data)=>{
        console.log("Hello ,div clicked===",data)
        // io.emit('divClicked',data);
        socket.broadcast.emit('divClicked',data);

        
    })
})



