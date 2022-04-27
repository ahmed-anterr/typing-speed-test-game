// Array of words ..
const words = [
  "Hello",
  "Programming",
  "Code",
  "Javascript",
  "Town",
  "Country",
  "Testing",
  "Youtube",
  "Linkedin",
  "Twitter",
  "Github",
  "Leetcode",
  "Internet",
  "Python",
  "Scala",
  "Destructuring",
  "Paradigm",
  "Styling",
  "Cascade",
  "Documentation",
  "Coding",
  "Funny",
  "Working",
  "Dependencies",
  "Task",
  "Runner",
  "Roles",
  "Test",
  "Rust",
  "Playing",
];

// get elements ..
let myLvl = document.querySelector(".lvl .lvl-options");
let myLvls = document.querySelectorAll(".lvl .lvl-options option");
let myLvlTime = document.querySelector(".lvl .seconds-span");
let startPlaying = document.querySelector(".start-btn");
let theWord = document.querySelector(".the-word");
let theForm = document.forms[0];
let submit = document.querySelector("[type='submit']");
let myInput = document.querySelector(".input");
let wordsContainer = document.querySelector(".visible-words");
let timeLeft = document.querySelector(".time-left .seconds-left");
let myScore = document.querySelector(".score .my-score");
let totalScore = document.querySelector(".score .total-score");
let result = document.querySelector(".result");
let scoreResult = document.querySelector(".result .score-res");
let resultMsg = document.querySelector(".result .msg");

// setting up ..

// levels ..
const lvls = {
  Easy: 5,
  Normal: 3,
  Hard: 2,
};
// score ..
totalScore.innerHTML = words.length;
let defaultLvl = "Normal";
myLvl.onclick = () => {
  defaultLvl = myLvl.value;
  let defaultTime = lvls[defaultLvl];
  myLvlTime.innerHTML = defaultTime;
  timeLeft.innerHTML = defaultTime;
};
myInput.onpaste = () => {
  return false;
};
// main event ..
startPlaying.onclick = () => {
  startPlaying.style.display = "none";
  myInput.value = "";
  myInput.focus();
  theForm.style.borderColor = `#4caf50`;
  submit.style.backgroundColor = "#4caf50";
  creatDiv();
  creatTheWord();
  calcScore();
  time();
};
//creating the word ..
function creatTheWord() {
  let word = words[Math.floor(Math.random() * words.length)];
  theWord.innerHTML = word;
  words.splice(words.indexOf(word), 1);
}
//creating divs ..
function creatDiv() {
  wordsContainer.innerHTML = "";
  for (let i = 0; i < words.length; i++) {
    let div = document.createElement("div");
    div.className = "words";
    div.innerHTML = words[i];
    wordsContainer.appendChild(div);
  }
}
// time counter ..
function time() {
  let timeCounter = setInterval(() => {
    timeLeft.innerHTML--;
    if (timeLeft.innerHTML <= 0) {
      timeLeft.innerHTML = myLvlTime.innerHTML;
      theWord.innerHTML = "";
      wordsContainer.innerHTML = "";
      creatTheWord();
      creatDiv();
      if (myInput.value === "") {
        theForm.style.cssText = `background-color: rgba(255, 0, 0, 0.1)`;
        submit.style.backgroundColor = "#ff5722";
      } else {
        theForm.style.backgroundColor = "white";
      }
      if (words.length === 0) {
        clearInterval(timeCounter);
        theWord.style.display = "none";
        startPlaying.style.display = "block";
        startPlaying.innerHTML = "Play Again";
        theForm.style.backgroundColor = "white";
        resultFunc();
        startPlaying.onclick = () => location.reload();
      }
      myInput.value = "";
    }
  }, 1000);
}
function calcScore() {
  theForm.onsubmit = (e) => {
    e.preventDefault();
    let myTxt = myInput.value;
    if (myInput.value !== "") {
      if (words.length !== 0) {
        timeLeft.innerHTML = myLvlTime.innerHTML;
        if (myTxt === theWord.innerHTML.toLowerCase()) {
          myScore.innerHTML++;
          theForm.style.cssText = `background-color: rgba(0, 255, 0, 0.1); border-color: #4caf50;`;
          submit.style.backgroundColor = "#4caf50";
        } else {
          theForm.style.cssText = `background-color: rgba(255, 0, 0, 0.1)`;
          submit.style.backgroundColor = "#ff5722";
        }
        creatTheWord();
        creatDiv();
      } else {
        theWord.style.display = "none";
        startPlaying.style.display = "block";
        startPlaying.innerHTML = "Play Again";
        theForm.style.backgroundColor = "white";
        resultFunc();
      }
    }
    myInput.value = "";
  };
}

function resultFunc() {
  result.style.display = "block";
  if (myScore.innerHTML >= totalScore.innerHTML / 1.5) {
    result.style.backgroundColor = "#4caf50";
    resultMsg.innerHTML = "Good";
  } else {
    resultMsg.innerHTML = `Do It Again.. You Missed ${
      totalScore.innerHTML - myScore.innerHTML
    } Words`;
    result.style.backgroundColor = "#c62828";
  }
  scoreResult.innerHTML = `Your Score Is [ ${myScore.innerHTML} from ${totalScore.innerHTML} ]`;
}
