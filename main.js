import express from 'express';
import {createServer} from 'http';
import {Server} from 'socket.io';
import routes from './src/routes/index.js';
import GameState from './src/GameState.mjs';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

// Set up views engine
app.set('view engine', 'pug');
app.set('views', './views');

// Set up static files
app.use(express.static('public'));
app.use(express.static('node_modules/bulma/css/'));

// Set up routes
for (const {slug, route} of routes) app.get(slug, route);

// Start server
httpServer.listen(3000,
  () => console.log('Server is running: http://localhost:3000'));

// Socket.io
io.on('connection', (socket) => {
  const gameState = new GameState();

  // Connection
  const connectionMessage = `User connected as ${socket.id}`;
  console.info(connectionMessage);
  socket.emit('connected', connectionMessage);

  // Game Start
  socket.emit('init_game', gameState.init());
  socket.emit('question', gameState.getCurrentQuestion());

  // Answer Question -> Correct or Incorrect
  socket.on('answer_question', (optionId) => {
    const result = gameState.answerQuestion(optionId);
    socket.emit('result', result);
  });

  // Next Question -> Question
  socket.on('next_question', () => {
    const nextQuestion = gameState.nextQuestion();
    if (nextQuestion) socket.emit('question', nextQuestion);
    else socket.emit('game_end', gameState.score);
  });

  // Disconnect
  socket.on('disconnect', () => console.error('user disconnected', socket.id));
});