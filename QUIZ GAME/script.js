const questions = [
    {
        question: "Which planet on Solar System has rings on it?",
        answers: [
            {text: "Mars", correct: false},
            {text: "Jupiter", correct: false},
            {text: "Saturn", correct: true},
            {text: "Uranus", correct: false},
        ]
    },
    {
        question: "What is the name of Earth's natural satellite?",
        answers: [
            {text: "Mars", correct: false},
            {text: "Sun", correct: false},
            {text: "Moon", correct: true},
            {text: "Venus", correct: false},
        ]
    },
    {
        question: "Which is the largest animal on land?",
        answers: [
            {text: "Elephant", correct: true},
            {text: "Tiger", correct: false},
            {text: "Rhinoceros", correct: false},
            {text: "Lion", correct: false},
        ]
    },
    {
        question: "Which organ pumps blood in our body?",
        answers: [
            {text: "Kidneys", correct: false},
            {text: "Lungs", correct: false},
            {text: "Brain", correct: false},
            {text: "Heart", correct: true},
        ]
    },
    {
        question: "Capital City of the Philippines?",
        answers: [
            {text: "Luzon", correct: false},
            {text: "Manila", correct: true},
            {text: "Cebu", correct: false},
            {text: "Davao", correct: false},
        ]
    },
    {
        question: "Biggest continent on the Earth?",
        answers: [
            {text: "Asia", correct: true},
            {text: "Africa", correct: false},
            {text: "Europe", correct: false},
            {text: "Australia", correct: false},
        ]
    },
    {
        question: "Largest ocean in the Earth?",
        answers: [
            {text: "Atlantic", correct: false},
            {text: "Indian", correct: false},
            {text: "Arctic", correct: false},
            {text: "Pacific", correct: true},
        ]
    },
    {
        question: "What is considered the earliest form of writing in the Philippines?",
        answers: [
            {text: "Sanskrit", correct: false},
            {text: "Tagbanwa", correct: false},
            {text: "Baybayin", correct: true},
            {text: "Buhid", correct: false},
        ]
    },
    {
        question: "How long did Spanish rule last in the Philippines?",
        answers: [
            {text: "297 yrs.", correct: false},
            {text: "333 yrs.", correct: true},
            {text: "300 yrs.", correct: false},
            {text: "335 yrs.", correct: false},
        ]
    },
    {
        question: "First President of the Philippines?",
        answers: [
            {text: "Manuel Quezon", correct: false},
            {text: "Emilio Aguinaldo", correct: true},
            {text: "Jose Laurel", correct: false},
            {text: "Sergio Osmeña", correct: false},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.
    question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}


function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.
    length} questions!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}


nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});


startQuiz();
