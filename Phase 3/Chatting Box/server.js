let express = require("express");

// create the reference of epxress module 
let app = express();

// load the http module and connect to express module with Server property
let http = require("http").Server(app);

// load the socket.io module and connect http module 
// with IIFE features 
let io = require('socket.io')(http);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});
var i = 0;
ary=["Hello, how can I help you?","What kind of issue?","Somone will contact you soon.Be patient!","Did you found what you looking for?","Is there anyhting I can help you with?","Have a Good One!"];
io.on('connection', (socket) => {
  socket.on('message', (msg) => {
    socket.emit('message', (msg));
    socket.emit('message1',ary[i]);
    i = i+1;
  });
});

http.listen(9090,()=>console.log("Server running on port number 9090"));