const startButton = document.querySelector(".start");
const countdown = document.querySelector(".countdown");
const frontSideOfCard = document.querySelectorAll(".front");
const backSideOfCard = document.querySelectorAll(".back");
const score = document.querySelector(".score");
const cheat = document.querySelector(".cheat");
let gameActive = true;

let min = 1;
let max = 11;
let numArray = [];
let clickedCards = [];
let clickedCardsString = [];
let checkIfMatchArray = [];

//Fetch oldscore after refresh
let oldScore = sessionStorage.getItem("oldScore");
if (score.textContent = "0" && oldScore == null) {
   score.textContent = 0;
}
else {
   score.textContent = oldScore;
}
console.log(score.textContent)
console.log(oldScore)

function toggleCardsClickable() {
   frontSideOfCard.forEach((item) => {
      if (item.classList.contains("noClick")) {
         item.classList.remove("noClick")
         console.log("clickable");
      }
      else {
         item.classList.add("noClick")
         console.log("NOT clickable!")
      }
   })
}

//Counter display!
timeScore = 0;
let stopCounter;
function counter(duration) {

   const startingminutes = duration;
   let time = startingminutes * 600;

   const myInterval = setInterval(updateCountdown, 1000);
   function updateCountdown() {
      const minutes = Math.floor(time / 60);
      let secounds = time % 60;
      secounds = secounds < 10 ? "0" + secounds : secounds;
      countdown.innerHTML = `&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Time left: ${minutes}:${secounds}`;
      time--
      timeScore = time + 1;
      console.log(timeScore);
      if (minutes == 0 && secounds == 0) {
         timeIsOut();
      }
   }

   //Stop user from clicking on moore cards while no gameplay (time is out)
   function timeIsOut() {
      clearInterval(myInterval);

      countdown.innerHTML = "Time is up, you lost!"
      startButton.innerHTML = "Play again?!"
      gameActive = false;

      toggleCardsClickable();

   }
   stopCounter = timeIsOut;  //?<----------------------------------------------
}


function showScore() {

   stopCounter(); //? <-------------this finally worked by declaring a varible in global scope
   //? and asigning the function to the global varible.

   countdown.innerHTML = ""

   if (score.textContent == 0) {
      score.textContent = timeScore;
   }

   else if (timeScore > score.textContent && score.textContent != 0) {
      score.textContent = timeScore;
      console.log("it is bigger as in a better score")
      countdown.innerHTML = `&nbsp;&nbsp;&nbsp; new high score!!!`;

   }else {countdown.innerHTML="&nbsp; try again!"}

   // saves oldscore for comparison to the new score after location reaload
   sessionStorage.setItem("oldScore", score.textContent);
   startButton.innerHTML = "Play again?!"
   gameActive = false;
}


function hideCards() {
   document.querySelectorAll(".back").forEach((item) => { item.classList.add("hidden") })
}

hideCards();

let cardsClickedCounter = 0;


function showCard() {
   for (let i = 0; i < clickedCards.length; i++) {
      let cardToString = clickedCards[i].outerHTML;
      clickedCardsString.push(cardToString)
      clickedCards = []
   }

   let cardString1 = clickedCardsString[0];
   let cardString2 = clickedCardsString[1];

   if (cardsClickedCounter == 1) {
      let cardNumber1 = cardString1.match(/\d+/g);

      firstClickFrontSide = document.querySelector(`.card${cardNumber1[0]}-front`);
      firstClickBackSide = document.querySelector(`.card${cardNumber1[0]}-back`);

      firstClickFrontSide.classList.add("hidden");
      firstClickBackSide.classList.remove("hidden");
      checkIfMatchArray.push(firstClickBackSide.innerHTML);

   }

   else if (cardsClickedCounter == 2) {

      let cardNumber2 = cardString2.match(/\d+/g);

      secoundClickFrontside = document.querySelector(`.card${cardNumber2[0]}-front`);
      secoundClickBackside = document.querySelector(`.card${cardNumber2[0]}-back`);

      secoundClickFrontside.classList.add("hidden");
      secoundClickBackside.classList.remove("hidden");
      //cardsClickedCounter = 0;
      checkIfMatchArray.push(secoundClickBackside.innerHTML);
   }

   checkIfMatch();
   // console.log(firstClickBackSide)
}
// Returning values from showCard funtion.
function GetCardClickedValue() {
   try {
      return [firstClickBackSide, firstClickFrontSide, secoundClickBackside, secoundClickFrontside];
   }

   catch (error) {
      console.log("waiting user to click on another card!");
   }
}


function checkIfMatch() {

   for (let i = 0; i < checkIfMatchArray.length; i++) {
      if (i == 2) {
         checkIfMatchArray.splice(0, 2);
      }
   }

   let firstCard = checkIfMatchArray[0];
   let secoundCard = checkIfMatchArray[1]

   if (cardsClickedCounter == 1) {

      let cardNumber1 = firstCard.match(/\d+/g);
      checkIfMatchArray.push(cardNumber1[0]);
      checkIfMatchArray.splice(0, 1)

   }
   
   else {

      let cardNumber2 = secoundCard.match(/\d+/g);
      checkIfMatchArray.push(cardNumber2[0]);
      checkIfMatchArray.splice(1, 1)
   }
   console.log(checkIfMatchArray)

   let nrOfFails = 0;

   function tryCardNumbers(tryMatch) {

      let cardNumbers = tryMatch;
      let matchingPairs = cardNumbers.every(value => {
         return checkIfMatchArray.includes(value);
      });

      console.log(matchingPairs);

      if (matchingPairs == true) {
         // Call a function that does something when a pair is found.
         foundMatch();
      }
      else {
         nrOfFails++;
         // Call a function when there is no match using a counter to only call it once
         if (nrOfFails == 5 && cardsClickedCounter == 2) {
            nrOfFails = 0;
            resetData();
            noMatch();
         }
      }
   }

   tryCardNumbers(["1", "2"]);
   tryCardNumbers(["3", "4"]);
   tryCardNumbers(["5", "6"]);
   tryCardNumbers(["7", "8"]);
   tryCardNumbers(["9", "10"]);
}

//keep the cards visible and change the border color to green.
let matchingPairs = 0;
function foundMatch() {




   let card = GetCardClickedValue();

   let firstClickBackSide = card[0];
   let firstClickFrontSide = card[1];
   let secoundClickBackside = card[2];
   let secoundClickFrontside = card[3];

   for (let i = 0; i < card.length; i++) {
      card[i].classList.remove("back");
      card[i].classList.add("back-match");
   }
   matchingPairs++;

   console.log(`match  ${matchingPairs}`);

   if (matchingPairs == 5) {
      console.log("yay");
      showScore();
      startButton.innerHTML = "Play again?!"
      gameActive = false;
      toggleCardsClickable();
   }
   resetData();
}


function resetData() {
   nrOfFails = 0;
   cardsClickedCounter = 0;
   checkIfMatchArray = [];
   clickedCardsString = [];
}

// hide the cards again after 2 secounds if there is no match!
function noMatch() {
   toggleCardsClickable();
   let card = GetCardClickedValue();
   let firstClickBackSide = card[0];
   let firstClickFrontSide = card[1];
   let secoundClickBackside = card[2];
   let secoundClickFrontside = card[3];

   //console.log(firstClickBackSide, firstClickFrontSide, secoundClickBackside, secoundClickFrontside);
   for (let i = 0; i < card.length; i++) {
      setTimeout(function () {

         if (card[i].classList.contains("hidden")) {
            card[i].classList.remove("hidden");

         } else { card[i].classList.add("hidden"); }

      }, 2000);

   }
   setTimeout(function () {
      toggleCardsClickable();
   }, 2000);
}

function clickedCard() {

   //* 1) listen for witch card is clicked.
   //*2) Show the card.
   // 3) empty array when 2 cards is clicked.
   // 4) if cards are a match keep them open otherwise flip them back.

   frontSideOfCard.forEach(card => {
      card.addEventListener("click", function () {
         cardsClickedCounter++;
         clickedCards.push(card);
         showCard();
      })
   })
}

clickedCard();


toggleCardsClickable();


startButton.addEventListener("click", function () {
   if (!gameActive) {
      location.reload();

   } else {
      toggleCardsClickable();

      counter(0.1);

      for (let i = 1; i < 11; i++) {
         num = Math.floor(Math.random() * (max - min)) + 1;

         if (!numArray.includes(num)) {
            numArray.push(num);
         } else { i-- };

         for (let j = 0; j < numArray.length; j++) {
            randomImage = numArray[j];
         }

         let image = `<img src="Memory-game/rcs/images/${randomImage}.png">`
         console.log(numArray);
         document.querySelector(`.card${i}-back`).innerHTML = "";
         document.querySelector(`.card${i}-back`).insertAdjacentHTML("afterbegin", image)
      }
      numArray = [];

      //location.reload();
   }


})

cheat.addEventListener("click", function() {
   matchingPairs = 4;
   foundMatch()});



// when time is out do some scoring
//! some sort of score keeper maybe.
//! mayby a cool animation when cards get flipped.




