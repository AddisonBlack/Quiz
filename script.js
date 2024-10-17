const questions = [
  {
    question: 'What is my favorite food?',
    answers: [
      { text: 'Acai Bowl', correct: false},
      { text: 'Poke', correct: true},
      { text: 'Quesedilla', correct: false},
      { text: 'Steak', correct: false},
    ]
  },
  {
    question: 'What is my favorite fast food restaurant?',
    answers: [
      { text: 'Jack in the Box', correct: false},
      { text: 'Chick Fil A', correct: false},
      { text: 'Raising Canes', correct: false},
      { text: 'Panda Express', correct: true},
    ] 
  },
  {
    question: 'What fact about me is not true?',
    answers: [
      { text: 'I have moved 14 times', correct: false},
      { text: 'I am good at surfing', correct: true},
      { text: 'I have accidentally met Tee Grizzley', correct: false},
      { text: 'I have never been to a concert', correct: false},
    ]
  },
  {
    question: 'What is my social security number?',
    answers: [
      { text: '118-90-4772', correct: true},
      { text: 'Trick question. I am not stupid enough to give out my social🤣', correct: false},
      { text: '112-33-4446', correct: false},
      { text: '112-33-4445', correct: false},
    ]
  }
];

const questionElement = document.getElementById('question');
const answerButtons = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = 'Next';
  showQuestion();
}

function showQuestion(){
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + '. ' + currentQuestion.question;

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement('button');
    button.innerHTML = answer.text;
    button.classList.add('btn');
    answerButtons.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;  
    }
    button.addEventListener('click', selectAnswer);
  })
}

function resetState() {
  nextButton.style.display = 'none';
  while(answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === 'true';
  if(isCorrect) {
    selectedBtn.classList.add('correct');
    score++;
  } else{
    selectedBtn.classList.add('incorrect');
  }
  Array.from(answerButtons.children).forEach(button => {
    if(button.dataset.correct === 'true') {
      button.classList.add('correct');
    }
    button.disabled = true;
  });
  nextButton.style.display = 'block';
}

function showScore() {
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
  nextButton.innerHTML = 'Play Again!';
  nextButton.style.display = 'block';
}

function handleNextButton() {
  currentQuestionIndex++;
  if(currentQuestionIndex < questions.length) {
    showQuestion();
  } else{
    showScore();
  }
}

nextButton.addEventListener('click', () => {
  if(currentQuestionIndex < questions.length){
    handleNextButton();
  } else{
    startQuiz();
  }
});

startQuiz();