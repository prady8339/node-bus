
module.exports = function(app){


    const server = require("http").createServer(app);
    
    
  
    const io = require('socket.io')(server);
    
    io.on("connection", (socket) => {
        console.log("what is socket",socket);
        console.log("socket is active to be connected");

        

        socket.on("chat",(payload)=>{
            console.log("what is payload:",payload);

            io.emit("chat",payload);
        })
    });
    

         
    }