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
    question: 'What is my favorite app?',
    answers: [
      { text: 'NYT Spelling Bee', correct: false},
      { text: "Crossy Road", correct: false},
      { text: 'Tinder', correct: true},
      { text: 'Surfline', correct: false},
    ]
  },
  {
    question: 'Who is my favorite comedian?',
    answers: [
      { text: 'Theo Von', correct: false},
      { text: 'Bobby Lee', correct: false},
      { text: 'Andrew Santino', correct: false},
      { text: 'Rene Vaca', correct: true},
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