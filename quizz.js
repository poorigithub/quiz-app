
const questions = [
      {
        question: "What is the capital of France?",
        answers: [
          { text: "Paris", correct: true },
          { text: "Rome", correct: false },
          { text: "Madrid", correct: false },
          { text: "Berlin", correct: false },
        ]
      },
      {
        question: "What is 2 + 2?",
        answers: [
          { text: "3", correct: false },
          { text: "4", correct: true },
          { text: "5", correct: false },
          { text: "22", correct: false },
        ]
      },
      {
        question: "Who wrote 'Hamlet'?",
        answers: [
          { text: "Charles Dickens", correct: false },
          { text: "William Shakespeare", correct: true },
          { text: "Leo Tolstoy", correct: false },
          { text: "Mark Twain", correct: false },
        ]
      }
    ];

    const questionEl = document.getElementById('question');
    const answerButtons = document.getElementById('answer-buttons');
    const nextButton = document.getElementById('next-btn');

    let currentQuestionIndex = 0;
    let score = 0;

    function startQuiz() {
      currentQuestionIndex = 0;
      score = 0;
      nextButton.innerText = "Next";
      showQuestion();
    }

    function showQuestion() {
      resetState();
      const currentQuestion = questions[currentQuestionIndex];
      questionEl.innerText = currentQuestion.question;

      currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerText = answer.text;
        button.classList.add("btn");
        if (answer.correct) {
          button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
        answerButtons.appendChild(button);
      });
    }

    function resetState() {
      nextButton.style.display = "none";
      while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
      }
    }

    function selectAnswer(e) {
      const selectedBtn = e.target;
      const isCorrect = selectedBtn.dataset.correct === "true";
      if (isCorrect) {
        selectedBtn.style.backgroundColor = "#90ee90";
        score++;
      } else {
        selectedBtn.style.backgroundColor = "#ff7f7f";
      }

      Array.from(answerButtons.children).forEach(button => {
        button.disabled = true;
        if (button.dataset.correct === "true") {
          button.style.backgroundColor = "#90ee90";
        }
      });

      nextButton.style.display = "inline-block";
    }

    function showScore() {
      resetState();
      questionEl.innerText = `You scored ${score} out of ${questions.length}!`;
      nextButton.innerText = "Play Again";
      nextButton.style.display = "inline-block";
    }

    function handleNextButton() {
      currentQuestionIndex++;
      if (currentQuestionIndex < questions.length) {
        showQuestion();
      } else {
        showScore();
      }
    }

    nextButton.addEventListener("click", () => {
      if (currentQuestionIndex < questions.length) {
        handleNextButton();
      } else {
        startQuiz();
      }
    });

    startQuiz();
