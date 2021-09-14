let express = require("express");

// create the reference of epxress module 
let app = express();

// load the http module and connect to express module with Server property
let http = require("http").Server(app);

// load the socket.io module and connect http module 
// with IIFE features 
let io = require('socket.io')(http);
// load the module 
let mongoose = require("mongoose");
let bodyParser = require("body-parser");

//url 
let url = "mongodb://localhost:27017/Sample";
mongoose.pluralize(null);          
// connect the database it return promise object 
mongoose.connect(url).
then(res=>console.log("connected")).
catch(err=>console.log(err))

//to use this db connection we have to call function 
let db = mongoose.connection;
db.once("open",()=> {
    // We have to defined schema which provide the structure for collection 
    let msgSchema = mongoose.Schema({
        name:String,
        message:String
    });
    let msgModel = mongoose.model("info",msgSchema);

    app.use(bodyParser.urlencoded({extended:true}))

    app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
    });

    io.on('connection', (socket) => {
    socket.on('message', (msg) => {
      let umsg= msg.usrMsg;
      let uname = msg.usrName;
      console.log(uname,umsg);
    socket.emit('message', umsg );
    console.log(msg);
    msgModel.insertMany({name:uname,message:umsg},(err,result)=>{
        if(!err){
            console.log(result)
        } else {
            console.log(err);
        }
        // mongoose.disconnect(); 
    })
    });
});
});


http.listen(9090,()=>console.log("Server running on port number 9090"));