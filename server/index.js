const http = require('http');
const express = require('express');
const cors = require('cors');
const socketIO = require('socket.io');

const app = express();
const port = 4500 || process.env.PORT;

const users = [{}];

app.use(cors());
app.get("/", (req,res)=>{
    res.send("live chat");
})

const server  = http.createServer(app);

const io = socketIO(server);

io.on('connection', (socket)=>{
    console.log("New connection");

    socket.on('joined', ({user})=>{  //on means recieve data
    users[socket.id] = user;
    socket.broadcast.emit('userJoined',{user:'Admin',message: `${users[socket.id]} has joined`}); //broadcast means send message everyone except the one who send data
    socket.emit('welcome', {user: 'Admin', message:`Welcome to the chat, ${users[socket.id]}`})
    })

    socket.on('message', ({message,id})=>{
        io.emit('sendMessage',{user:users[id],message,id});  //io.emit to send everyone

    })

    socket.on('disconnect',()=>{
        socket.broadcast.emit('leave',{user: 'Admin', message:`${users[socket.id]} has left`})
    })
    
})

server.listen(port,()=>{
    console.log(`server is working on http://localhost:${port}`);
})