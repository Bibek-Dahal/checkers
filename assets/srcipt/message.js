import {socket} from './socket.js'

document.querySelector('#msg-form').addEventListener('submit',function (event){
    event.preventDefault()
    sendMessage()
})

document.querySelector('#msg-input').addEventListener('keyup',function (){
    socket.emit('isTyping',{isTyping:false})
})

document.querySelector('#msg-input').addEventListener('keydown',function (){
    socket.emit('isTyping',{isTyping:true})
})

function appenChatMsg(data){
    const element = document.createElement('div')
    element.innerHTML = `
        <p><span style="font-weight:bold">${data.user}<span/>: <span style=""> ${data.msg}<span/><p/>
    `

    document.querySelector('.inner-div').appendChild(element)
}



function sendMessage(){
    const msgInput = document.querySelector('#msg-input')
    const data = msgInput.value
    if(data.trim().length !== 0){
        console.log("chat msg==",data)
        socket.emit('onMessage',{msg:data,user:'Anonymous'})
        msgInput.value = ''
        
    }
}

socket.on('onMessage',(data)=>{
    console.log("chat msg from server ==",data.user)
    appenChatMsg(data)
})

socket.on('isTyping',(data)=>{
    if(data.isTyping){
        console.log("is typing ",data)
        document.querySelector('#is-typing').innerHTML = `
        
            <h1>Anonymous typing<h1/>
        `
    }else{
        setTimeout(()=>{
            document.querySelector('#is-typing').innerHTML = `
        

        `
        },400)
    }
})

