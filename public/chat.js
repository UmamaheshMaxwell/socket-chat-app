// Make Connection
var socket = io.connect("http://localhost:3000/");

// Query DOM
const handle = document.getElementById("handle"),
      message = document.getElementById("message"),
      btn = document.getElementById("send"),
      output = document.getElementById("output"),
      feedback = document.getElementById("feedback");

//Emit event
btn.addEventListener("click", ()=>{
    socket.emit("chat", {
        message: message.value,
        handle: handle.value
    })
})

message.addEventListener("keypress", ()=>{
    socket.emit("typing", handle.value);
})

socket.on("chat", (data) => {
    feedback.innerHTML ="";
    output.innerHTML += "<p><strong>" + data.handle + ": </strong>" + data.message + "</p>"
})

socket.on("typing", (data) =>{
    feedback.innerHTML = "<p><em>" + data + " is typing message... <em></p>"
})