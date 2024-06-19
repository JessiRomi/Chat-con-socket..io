
let socket = io.connect();

// Escucha el evento 'messages' del servidor
socket.on('messages', function(data) {
console.log(data);
});

// Función para renderizar los mensajes en el HTML
function render(data) {
    var html = data.map(function(elem, index){
    return(`<div>
    <strong>${elem.author}</strong>:
    <em>${elem.text}</em> </div>`)
    }).join(" ");

    document.getElementById('messages').innerHTML = html;
}
    
socket.on('messages', function(data) { render(data); });

// Es para agregar un nuevo mensaje
function addMessage(e) {
    var mensaje = {
    author: document.getElementById('username').value,
    text: document.getElementById('texto').value
    };

    socket.emit('new-message', mensaje); // Es para enviar un mensaje al servidor

    // Esto es para vaciar los campos después de enviar el mensaje
    document.getElementById('username').value = '';
    document.getElementById('texto').value = '';
    
    return false;
}