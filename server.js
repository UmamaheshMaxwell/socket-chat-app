const express = require("express");
const app = express();
const socket = require("socket.io");

app.use(express.static("public"))

const PORT = process.env.PORT || 3000;

var server = app.listen(PORT, () =>{
    console.log(`Server listening at port ${PORT}`);
})

// socket set up
const io = socket(server);

io.on("connection", (socket) => {
    console.log("connection made to socket", socket.id);

    socket.on("chat", function(data){
        console.log(data);
        io.sockets.emit("chat", data);
    })

    socket.on("typing", (data) =>{
        socket.broadcast.emit("typing", data);
    })
})
