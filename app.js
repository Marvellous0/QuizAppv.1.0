const questions = [
    {
    numb: 1,
    question: "What does HTML stand for?",
    answer: "Hyper Text Markup Language",
    options: [
      "Hyper Text Preprocessor",
      "Hyper Text Markup Language",
      "Hyper Text Multiple Language",
      "Hyper Tool Multi Language"
    ]
  },
    {
    numb: 2,
    question: "What does CSS stand for?",
    answer: "Cascading Style Sheet",
    options: [
      "Common Style Sheet",
      "Colorful Style Sheet",
      "Computer Style Sheet",
      "Cascading Style Sheet"
    ]
  },
    {
    numb: 3,
    question: "What does PHP stand for?",
    answer: "Hypertext Preprocessor",
    options: [
      "Hypertext Preprocessor",
      "Hypertext Programming",
      "Hypertext Preprogramming",
      "Hometext Preprocessor"
    ]
  },
    {
    numb: 4,
    question: "What does SQL stand for?",
    answer: "Structured Query Language",
    options: [
      "Stylish Question Language",
      "Stylesheet Query Language",
      "Statement Question Language",
      "Structured Query Language"
    ]
  },
    {
    numb: 5,
    question: "What does XML stand for?",
    answer: "eXtensible Markup Language",
    options: [
      "eXtensible Markup Language",
      "eXecutable Multiple Language",
      "eXTra Multi-Program Language",
      "eXamine Multiple Language"
    ]
  },
];

var body = document.querySelector('body')
const option_list = document.querySelector(".option_list");
const quiz_box = document.querySelector(".quiz_box");
let displayQues = document.querySelector('username_btn')
var rulesPage = `<div class="rules">
<h2>Some Rules of this Quiz</h2>
<hr>
<ol class="rule__item">
    <li>Once you select your answer, it can't be undone.</li>
    <li> You can't select any option once time goes off</li>
    <li>You can't exit from the Quiz while you're playing</li>
    <li>You'll get points on the basis of your correct answers.</li>
</ol>
<hr>
<div class="btns">
<button class="continue__btn" onclick='renderUserNamePage()'>Continue</button>
</div>
</div>`

const renderRules = ()=>{
    body.innerHTML= rulesPage;
}

const userNamePage = ` <div class="accept__username">
<h3>Please Enter Username</h3>
<input type="text" name="username" id="username">
<button class="username_btn" onclick="getUserName(); renderQuestion()">Continue</button>
</div>
`
const renderUserNamePage = ()=>{
    body.innerHTML= userNamePage;
}


const getUserName = ()=>{
    var userName = document.querySelector('#username')
    var userDetails = JSON.parse(localStorage.getItem('users'))
    if (userDetails===null){
        userDetails=[]
    }

    var userDetail = {
        username : userName.value,
        score : 0,
        id : userDetails.length+1
    }

    userDetails.push(userDetail)
    localStorage.setItem("users", JSON.stringify(userDetails))
}

var question_details = `
    <div class="quiz_box">
    <h2>Question?</h2>Score: <h1></h1>
        <div class="que_text">
           
        </div>
        <div class="option_list">
            
        </div>

        <button class="next_btn" onclick="nextQuestion()">Next Question</button>
</div>`

const renderQuestion = ()=>{    
    body.innerHTML= question_details;
    nextQuestion()
}

let userScore = 0;

var question_tag;

var i=0;
const selectAnswer = (e)=>{
    let target = e.target.textContent;

        if(target != questions[i-1].answer)
        {
        
          e.target.style.backgroundColor = "red";

        }

        else {
             e.target.style.backgroundColor = "rgb(20,230,100)";
             userScore += 1;
            var score = document.createElement('div')
            score.textContent = userScore
        }

        const option_list = document.querySelector(".option_list");
        const allOptions = option_list.children.length;
        for(j = 0; j < allOptions; j++){
          option_list.children[j].classList.add("disabled"); 

          e.innerHTML = userScore + ' out of ' + questions.length;

      } 
}

var score_details = `
<div class="score_text">

</div><div class="result_box">
    <div class="icon">
        <i class="fas fa-crown"></i>
    </div>
    <div class="complete_text">You've completed the Quiz!</div>
    <div class="score_text">
       
    </div>
    <div class="buttons">
        <button class="restart" onlick="showResult()">Score</button>
        <button class="quit">Quit Quiz</button>
    </div>
</div>`


const nextQuestion = ()=>{
    const que_text = document.querySelector(".que_text");
    const option_list = document.querySelector(".option_list");
    que_text.textContent = questions[i].numb + '.' + questions[i].question

    for(var q = 0; q < questions[i].options.length; q++)
    {
        console.log(questions[i].options[q])
        option_list.innerHTML = `<div>${questions[i].options[q]}</div>`;
    }

    option_list.textContent = []
    questions[i].options.forEach((option)=>{
        var li = document.createElement('div');
        li.onclick = selectAnswer;
        question_tag = document.querySelectorAll('.option_list div')
        li.textContent = option;
	    option_list.appendChild(li);
    })
    i+=1
    console.log(i)  
}


const showResult = () => {
  quiz_box.classList.remove("next_btn"); //hide quiz box
  result_box.classList.add("showResult"); //show result box
  const scoreText = result_box.querySelector(".score_text");
  if (userScore > 3){ // if user scored more than 3
      //creating a new span tag and passing the user score number and total question number
      let scoreTag = '<span>and congrats! 🎉, You got <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
      scoreText.innerHTML = scoreTag;  //adding new span tag inside score_Text
  }
  else if(userScore > 1){ // if user scored more than 1
      let scoreTag = '<span>and nice 😎, You got <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
      scoreText.innerHTML = scoreTag;
  }
  else{ // if user scored less than 1
      let scoreTag = '<span>and sorry 😐, You got only <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
      scoreText.innerHTML = scoreTag;
  }
}


