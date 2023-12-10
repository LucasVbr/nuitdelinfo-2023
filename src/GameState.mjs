import fs from 'fs';

const questions = JSON.parse(fs.readFileSync('src/questions.json', 'utf8'));

export default class GameState {
  questionList = questions;

  constructor() {
    this.score = 0;
    this.currentQuestion = 0;
  }

  init() {
    return {score: this.score};
  }

  getCurrentQuestion() {
    const question = {...this.questionList[this.currentQuestion]};
    delete question.answer;

    return {id: this.currentQuestion, ...question};
  }

  answerQuestion(optionId) {
    const {option, description} = this.questionList[this.currentQuestion].answer;

    const isCorrect = optionId === option;
    if (isCorrect) this.score++;

    return {isCorrect, description, score: this.score};
  }

  nextQuestion() {
    this.currentQuestion++;
    if (this.currentQuestion <= this.questionList.length - 1)
      return this.getCurrentQuestion();
    return null
  }
}