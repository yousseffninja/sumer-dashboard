import { io } from 'socket.io-client';

const socket = io('http://localhost:8000', {
  transports: ['websocket'],
}); 
// Connect event listeners or any other socket configuration here
socket.on('connection', () => {
  console.log('Socket connected:', socket.id);
  // You can emit events or perform other actions when the socket connects
  // socket.emit('someEvent', data);
});

socket.on('disconnect', () => {
  console.log('Socket disconnected');
});

export default socket;
