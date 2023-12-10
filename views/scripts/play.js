const socket = io();

// Sockets
socket.on('connected', res => console.log(res));

const option0Element = document.querySelector('#option_0');
const option1Element = document.querySelector('#option_1');


socket.on('init_game', score => console.log(score))

socket.on('question', question => {
  // TODO: Show score

  option0Element.querySelector("p").innerText = question.options[0].text;
  option1Element.querySelector("p").innerText = question.options[1].text;
  document.querySelector('#card_description').innerText = question.question;

  option0Element.addEventListener('click', handleOption0Click);
  option1Element.addEventListener('click', handleOption1Click);
});

const handleOption0Click = () => {
  socket.emit('answer_question', 0);
  option0Element.removeEventListener('click', handleOption0Click);
}
const handleOption1Click = () => {
  socket.emit('answer_question', 1)
  option1Element.removeEventListener('click', handleOption1Click);
}

socket.on("result", (result) => {
  document.querySelector('#card_title').innerText = result.isCorrect ? "Correct!" : "Incorrect!";
  document.querySelector('#card_description').innerText = result.description;
  document.querySelector('button#next_question').classList.remove('is-hidden');
});

document.querySelector('button#next_question').addEventListener('click', () => {
  socket.emit('next_question');
  document.querySelector('#card_title').innerText = "Question";
  document.querySelector('button#next_question').classList.add('is-hidden');
});

socket.on('game_end', score => {
  document.querySelector('#card_title').innerText = "Game Finished!";
  document.querySelector('#card_description').innerText = `Your score is ${score}`;
});