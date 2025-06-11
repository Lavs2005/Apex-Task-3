const quizData = [
  {
    question: "Which language runs in a web browser?",
    options: ["Java", "C", "Python", "JavaScript"],
    answer: "JavaScript"
  },
  {
    question: "What does CSS stand for?",
    options: ["Central Style Sheets", "Cascading Style Sheets", "Cascading Simple Sheets", "Cars SUVs Sailboats"],
    answer: "Cascading Style Sheets"
  },
  {
    question: "What does HTML stand for?",
    options: ["Hypertext Markup Language", "Hyperloop Machine Language", "Helicopters Terminals Motorboats Lamborginis", "None of these"],
    answer: "Hypertext Markup Language"
  }
];

const quiz = document.getElementById("quiz");
const submitBtn = document.getElementById("submit");
const result = document.getElementById("result");

let currentQuiz = 0;
let score = 0;

loadQuiz();

function loadQuiz() {
  const currentData = quizData[currentQuiz];
  quiz.innerHTML = `
    <h2>${currentData.question}</h2>
    ${currentData.options.map(option => `
      <label>
        <input type="radio" name="answer" value="${option}"> ${option}
      </label><br>
    `).join('')}
  `;
}

submitBtn.addEventListener("click", () => {
  const answer = document.querySelector('input[name="answer"]:checked');
  if (answer) {
    if (answer.value === quizData[currentQuiz].answer) {
      score++;
    }
    currentQuiz++;
    if (currentQuiz < quizData.length) {
      loadQuiz();
    } else {
      quiz.style.display = "none";
      submitBtn.style.display = "none";

      let message = "";
      if (score === quizData.length) {
        message = "🎉 Awesome! You got a perfect score!";
      } else if (score >= quizData.length - 1) {
        message = "👏 Great job! Almost perfect!";
      } else if (score >= 1) {
        message = "😊 Good attempt! Keep practicing.";
      } else {
        message = "😢 Oops! Better luck next time.";
      }

      result.innerHTML = `${message} <br>You scored ${score} out of ${quizData.length}.`;
    }
  } else {
    alert("Please select an answer.");
  }
});

// API Fetch Logic
const getJokeBtn = document.getElementById("getJoke");
const jokeDiv = document.getElementById("joke");

getJokeBtn.addEventListener("click", () => {
  fetch("https://official-joke-api.appspot.com/random_joke")
    .then(res => res.json())
    .then(data => {
      jokeDiv.innerHTML = `
        <p><strong>${data.setup}</strong></p>
        <p>${data.punchline}</p>
      `;
    })
    .catch(err => {
      jokeDiv.innerHTML = "Failed to fetch joke. Please try again.";
      console.error(err);
    });
});
