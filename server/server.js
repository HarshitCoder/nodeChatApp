const express=require('express');
const http=require('http');
var app = express();
var server=http.createServer(app);
var {generatemessage}=require('./utils/message.js');
var {generatelocationmessage}=require('./utils/message.js');
const path = require('path');
const publicPath=path.join(__dirname ,'../public');
const socketIO =require('socket.io');
const port=process.env.PORT|| 3000;
app.use(express.static(publicPath));
var io=socketIO(server);
io.on('connection',(socket)=>{
	console.log("new user connected");
    socket.emit('newMessage',generatemessage('Admin','Welcome to node chat app from server'));
	socket.broadcast.emit('newMessage',generatemessage('Admin','New User Joined'));
	socket.on('disconnect',()=>{
		console.log("user disconnected");
	});
	// socket.emit('newMessage',{from:'k@yfrom.com',text:'hey how are you?',createdAt:'1234'});
	socket.on('createMessage',(message,callback)=>
		{
		io.emit('newMessage',{from:message.from,
		text:message.text});
		callback('this is from server');
	});


socket.on('createLocationMessage',(coords)=>
		{
		io.emit('newLocationMessage',generatelocationmessage('User',coords.latitude,coords.longitude,coords.createdAt));
	});
	



	});


server.listen(port,()=>{
	console.log("server running");
});   