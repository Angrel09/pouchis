const http = require('http');
const { Server } = require('socket.io');
const app = require('./app');

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE"]
  }
});

// Compartir io con las rutas
app.set('io', io);

let onlineCount = 0;

io.on('connection', (socket) => {
  onlineCount++;
  console.log('Un usuario se ha conectado:', socket.id);
  io.emit('user_count', onlineCount);

  socket.on('disconnect', () => {
    onlineCount--;
    console.log('Usuario desconectado:', socket.id);
    io.emit('user_count', onlineCount);
  });
});

server.listen(PORT, () => {
  console.log(`PouAPI corriendo en http://localhost:${PORT}`);
});
