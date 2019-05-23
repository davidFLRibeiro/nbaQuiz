let questionNumber = 0;
let score = 0;

//start quiz
function startQuiz() {
  $('.startButton').on('click', function (event) {
    $('main').append(generateQuizInfoSection());
    $('main').append(generateQuestionSection());
    $('.startButton').remove();
    $('h1').remove();
  });
}

//increment question
//render to the DOM number of the question 
//call new question
function generateQuiz() {
  questionNumber++
  $('.questionNumber').text(questionNumber+1)
  generateNewQuestion();
  
}

//generate New Question
function generateNewQuestion() {
  $('.question-section').append(generateQuestionSection());
}

//increment score
function updateScore() {
   score++
   $('.score').text(score);
}

//render info
function generateQuizInfoSection() {
  return `
  <section class="quiz-info">
  <ul>
      <li>Question: <span class="questionNumber">1</span>/10</li>
      <li>Score: <span class="score">0</span></li>
  </ul>`;
}


//render question 
function generateQuestionSection()  {
 if (questionNumber < STORE.length) {
    return `<section class="question-section">
    <h2>${STORE[questionNumber].question}</h2>
    <form>
    <fieldset>
    <label class="answerOption">
    <input type="radio" value="${STORE[questionNumber].answers[0]}" name="answer" required>
    <span>${STORE[questionNumber].answers[0]}</span>
    </label>
    <label class="answerOption">
    <input type="radio" value="${STORE[questionNumber].answers[1]}" name="answer" required>
    <span>${STORE[questionNumber].answers[1]}</span>
    </label>
    <label class="answerOption">
    <input type="radio" value="${STORE[questionNumber].answers[2]}" name="answer" required>
    <span>${STORE[questionNumber].answers[2]}</span>
    </label>
    <label class="answerOption">
    <input type="radio" value="${STORE[questionNumber].answers[3]}" name="answer" required>
    <span>${STORE[questionNumber].answers[3]}</span>
    </label>
    <button type="submit" class="submitButton">Submit</button>
    </fieldset>
    </form>
    </section>`;
  } else {
  
    renderFinalResult();
  }
}

//handle answer Submission
function handleSubmission() {
  $('main').on('submit', function (event) {
    event.preventDefault();
    const selected = $('input:checked');
    const answer = selected.val();
    const correctAnswer = `${STORE[questionNumber].correctAnswer}`;
    gradeAnswer(answer, correctAnswer, selected);
    $('.imageBottom').remove();
  });
  }

//if answer is correct
function renderCorrectAnswer(selected) {
  selected.parent().addClass('correct');
  renderFeedCorrect();
  updateScore();
}

//if answer is incorrect
function renderInCorrectAnswer(selected) {
  selected.parent().addClass('wrong');
  renderFeedincorrect();
}

// check if its correct or incorrect
function gradeAnswer(userAnswer, correctAnswer, selected) {
  if (userAnswer === correctAnswer) {
    renderCorrectAnswer(selected);
  } else {
    renderInCorrectAnswer(selected);
  }
}

// render question feedback
function renderFeedCorrect() {
  let correctAnswer = `${STORE[questionNumber].correctAnswer}`;
  $('.question-section').html(`<div class="correctFeedback"><div class="icon"><img src="${STORE[questionNumber].icon}" alt="${STORE[questionNumber].alt}"/></div><p>You got it right!</p><button type=button class="nextButton">Next</button></div>`)
}

function renderFeedincorrect() {
 let correctAnswer = `${STORE[questionNumber].correctAnswer}`;
  // let iconImage = `${STORE[questionNumber].icon}`;
  $('.question-section').html(`<div class="correctFeedback"><div class="icon"><img src="${STORE[questionNumber].icon}" alt="${STORE[questionNumber].alt}"/></div><p>You got it wrong<br>the correct answer is <span>"${correctAnswer}"</span></p><button type=button class="nextButton">Next</button></div>`);
}

// update quiz data (score, question number)
function updateQuizData() {
   $('main').on('click', '.nextButton', function (event) {
     $('.nextButton').remove();
     $('.correctFeedback').remove();
     generateQuiz();
  });
}

//render final score
function renderFinalScore() {
  $('.score').text(score);
}

//render the final result at the end off quiz
function renderFinalResult() {
let text = textFinalScore();

  $('main').html(`<section class="result">
    <h3>${text}</h3><section class="quiz-info">
    <button class="restartButton">Restart Quiz</button>
  <ul>
      <li>Final Result: <span class="score">0</span></li>
  </ul><img src="https://media.giphy.com/media/7Ee6I8ecvwFCU/giphy.gif"</section>`)
}

function textFinalScore() {
  let text = '';
  if (score === 10) {
    text = 'Perfect score';
  } else if (score >= 5 && score <= 9) {
     text = 'Well done';
  } else {
     text = 'Study more';
  }
  return text;
}




//restart button
  function submitRestartButton() {
    $('main').on('click', '.restartButton', function (event) {
      $('main').html('');
      questionNumber = 0;
      score = 0;
      $('main').append(generateQuizInfoSection());
      $('main').append(generateQuestionSection()); 
     });
  }



//create render quiz
function createQuiz() {
  startQuiz();
  handleSubmission();
  updateQuizData();
  submitRestartButton();
  
}

$(createQuiz);


