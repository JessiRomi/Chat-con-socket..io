const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)

server.listen(8080, function() {
    console.log('Servidor corriendo en http://localhost:8080');
    })

let messages = [
        { author: "Jessica", text: "¡Hola! ¿Que tal?" },
        { author: "Gaston", text: "¡Muy bien! ¿Y vos?" },
        { author: "Saul", text: "¡Genial!" }
];

io.on('connection', function(socket) {
    console.log('Un cliente se ha conectado');
    socket.emit('messages', messages);

    socket.on('new-message', function(data) {
    messages.push(data);
    io.sockets.emit('messages', messages);
    });
});

app.use(express.static('public'));
