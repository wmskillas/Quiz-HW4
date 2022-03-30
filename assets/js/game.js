const question = document.querySelector("#questions");
const choices = Array.from(document.querySelectorAll(".choice-text"));
const scoreText = document.querySelector("#score");
const progressText = document.querySelector("#progressText");

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question:"Where is the correct place to insert JavaScript into HTML?",
        choice1:"The <body> section",
        choice2:"The <header> section",
        choice3:"The <link> section",
        choice4:"None of the above",
        answer: 1,
    },
    {
        question:"What correlation does JavaScript have to Java?",
        choice1:"The same company, just different languages",
        choice2:"They are the same language",
        choice3:"Java wanted a different format",
        choice4:"None of the above",
        answer: 4,
    },
    {
        question:"How do you insert multiline comments into Javascript?",
        choice1:"//",
        choice2:"/* */",
        choice3:"<!-- -->",
        choice4:"None of the above",
        answer: 2,
    },
    {
        question:"What is the correct way to write a JavaScript array?",
        choice1:"var colors = 1 = ('red'), 2 = ('green'), 3 = ('blue')",
        choice2:"var colors = (1:'red', 2:'green', 3:'blue')",
        choice3:"var colors = ['red', 'green', 'blue']",
        choice4:"var colors = 'red', 'green', 'blue'",
        answer: 3,
    },
    {
        question:"What method removes the last element from an array and returns that element?",
        choice1:"remove()",
        choice2:"pop()",
        choice3:"push()",
        choice4:"concat()",
        answer: 2,
    }
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 5

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('/es.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    questions.innerText = currentQuestion.questions
    question.innerText = currentQuestion.question
    console.log(questions);

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}
choices.forEach(choice => {
    choice.addEventListener('click', e =>{
        if(!acceptingAnswers)return
        acceptingAnswers = false

        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct'){
            incrementScore(SCORE_POINTS)
        }
        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(()=> {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()
        }, 1000)
    })
})

incrementScore = num => {
    score += num
    scoreText.innerText = score
}

startGame()