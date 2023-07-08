var h1 = document.querySelector("h1")
var optionsEl = document.getElementById('options')
var index = 0
var score = 0
var scoreEl = document.getElementById('.score')
var timerEl = document.getElementById('timer')
var sec = 45;
var textUpdate = false




var questions = [
    {
        question: "Beginner JavaScript Quiz",
        options: ['Start Quiz!'],
        answer: 'Start Quiz'
    },
    {
        question: "Do Java and JavaScript mean the same thing?",
        options: ['Why yes of course, they both have Java in them', 'Absolutely not, if they were the same they would have the same name.', 'They are different, but they are interchangable.', 'They are just different versions of the same thing.'],
        answer: 'Absolutely not, if they were the same they would have the same name.'
    },

    {
        question: "How do you call a function in JavaSctipt?",
        options: ['You ask for its phone number, and hope it gies it to you.', 'You write function.functionname().', 'Wite functionname().', 'Use the call() function.'],
        answer: 'Wite functionname().'
    },

    {
        question: "How would you get an element by its id in JavaScript?",   
        options: ['myElement = document.getElementById("id01");', 'myElement = $("#id01");.', 'myElement = document.retrieveElementbyId("id01");.', 'myElement = &("#id01");.'],
        answer: 'myElement = document.getElementById("id01");'
    },

    {
        question: "What is the syntax for preventing a page from refreshing after a function runs?",
        options: ['function.preventRefresh();.', 'function.preventDefault();.', 'event.preventRefresh();.', 'event.preventDefault();.'],
        answer: 'event.preventDefault();.'
    },
    {
        question: "You have finished the beginner JavaScript quiz! How well did you do?",
        options: ['Try again!', 'Show me my score!'],
        answer: "Try again!"
    }
];


function timer(){
    
    var timer = setInterval(function(){
        document.getElementById('timer').innerHTML=sec + " seconds";
        sec--;
        console.log(sec)
        console.log(textUpdate)
        if (sec == -1) {
            saveScore()
            textUpdate = true
        }
        if (textUpdate) {
            clearInterval(timer);
        }
    }, 1000);
}



function renderQuestions() {
    h1.innerText = questions[index].question
    optionsEl.innerHTML = ""
    
    for (var i = 0; i < questions[index].options.length; i ++) {
        var li = document.createElement('ol')
        var buttons = document.createElement('button')
        var option = questions[index].options[i]
        var answers = questions[index].answer
        answers.innerText = questions[index].answer
        li.innerText = ''
        buttons.innerText = option
        optionsEl.appendChild(li), optionsEl.appendChild(buttons)
        buttons.addEventListener("mouseenter", function( event ){
            event.target.style.backgroundColor = "gold";
            event.target.style.cursor = "pointer";
        }, false);
        buttons.addEventListener("mouseleave", function( event ) {   
            event.target.style.backgroundColor = "";
        }, false);
        
        
        
        buttons.addEventListener('click', function() {
            console.log(this.innerText)
            if (index > 4) {
                    index = 4
                }
            if (this.innerText == "Start Quiz!"){
                timer()
            }
            if (this.innerText == answers) {
                score ++
                //scoreEl.innerText == score
                document.getElementById("score").textContent=score;
                console.log(scoreEl)
                index ++
                sec += 5
                renderQuestions()
            } else {
                if (this.innerText != 'Show me my score!') {
                    sec -= 5
                }
                index ++
                renderQuestions()
            }
            if (this.innerText == 'Show me my score!') {
                index = 0
                alert("Final Score: " + score + " Final Time: " + sec + " Initials: " + localStorage.getItem("Initals: "))
            }
            if (this.innerText == 'Try again!') {
                textUpdate = false
                sec = 45
                score = 0
                index = 0
                renderQuestions()
            }
            if (index > 4) {
                saveScore()
                textUpdate = true
            }
            console.log(buttons.innerText)
            console.log(answers)
            console.log(index)
            console.log(sec)
        })
    }
}

function saveScore() {
    var initials = prompt("Please enter first and last initial.")
    localStorage.setItem("Initals: ", initials)
    localStorage.setItem("Score: ", score)
    localStorage.setItem("Time left: ", sec)
}




renderQuestions()