const startButton = document.querySelector(".start");
const testButton = document.querySelector(".test");
const unHideButton = document.querySelector(".unhide");
const countdown = document.querySelector(".countdown");
const frontSideOfCard = document.querySelectorAll(".front");
const backSideOfCard = document.querySelectorAll(".back");



let min = 1;
let max = 11;
let numArray = [];
let clickedCards = [];
let clickedCardsString = [];
let checkIfMatchArray = [];

//Counter display!
function counter(duration) {
   const startingminutes = duration;
   let time = startingminutes * 60;

   setInterval(updateCountdown, 1000);

   function updateCountdown() {
      const minutes = Math.floor(time / 60);
      let secounds = time % 60;
      secounds = secounds < 10 ? "0" + secounds : secounds;
      countdown.innerHTML = `${minutes}:${secounds}`;
      time--

      if (minutes == 0 && secounds == 0) {
         timeIsOut();
      }
   }

   function timeIsOut() {
      clearInterval(time = 0);
      countdown.innerHTML = "Timer has stopped"
   }
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
      cardsClickedCounter = 0;
      checkIfMatchArray.push(secoundClickBackside.innerHTML); 
      //! trying to return this so i can use it to undo showcards();
      return [firstClickBackSide, firstClickFrontSide, secoundClickBackside, secoundClickFrontside];
      
   }
   
   checkIfMatch();
   
   // console.log(firstClickBackSide)

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

   } else {

      let cardNumber2 = secoundCard.match(/\d+/g);
      checkIfMatchArray.push(cardNumber2[0]);
      checkIfMatchArray.splice(1, 1)
   }
   console.log(checkIfMatchArray)

   function tryCardNumbers(tryMatch) {
      let cardNumbers = tryMatch;
      let matchingPairs = cardNumbers.every(value => {
         return checkIfMatchArray.includes(value);
      });

      console.log(matchingPairs);

      if (matchingPairs == true) {
         //call a function that does something when a pair is found.
         foundMatch();
      }

      else {
         //call a function when there is no match

         noMatch();
      }
   }

   tryCardNumbers(["1", "2"]);
   tryCardNumbers(["3", "4"]);
   tryCardNumbers(["5", "6"]);
   tryCardNumbers(["7", "8"]);
   tryCardNumbers(["9", "10"]);
}

function foundMatch() {

   //backSideOfCard.forEach(card => {
   // card.addEventListener()
   //})

   //! Another thing to try is to do the show card function again, but backwards... 
   //! just make it dry.
}

function noMatch() {

   console.log(firstClickBackSide.classList)
   if (firstClickBackSide.classList.contains("hidden")) {
      console.log("do nothing")
   } else {
      firstClickBackSide.classList.add("hidden");
      firstClickFrontSide.classList.remove("hidden");
      secoundClickBackside.classList.add("hidden");
      secoundClickFrontside.classList.remove("hidden");
   }
   // this fires of for every match that is no match, that is 9 times!!! //!fix!!
   //some awsomne code
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

startButton.addEventListener("click", function () {
   counter(0.1);
   for (let i = 1; i < 11; i++) {
      num = Math.floor(Math.random() * (max - min)) + 1;

      if (!numArray.includes(num)) {
         numArray.push(num);
      } else { i-- };

      for (let j = 0; j < numArray.length; j++) {
         randomImage = numArray[j];
      }

      let image = `<img src="/rcs/images/${randomImage}.png">`
      console.log(numArray);
      document.querySelector(`.card${i}-back`).innerHTML = "";
      document.querySelector(`.card${i}-back`).insertAdjacentHTML("afterbegin", image)
   }
   numArray = [];
})



testButton.addEventListener("click", function () {
   hideCards();
})

unHideButton.addEventListener("click", function () {

})

