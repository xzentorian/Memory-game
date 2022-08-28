const startButton = document.querySelector(".start");
const testButton = document.querySelector(".test");
const unHideButton = document.querySelector(".unhide");
const countdown = document.querySelector(".countdown");
const frontSideOfCard = document.querySelectorAll(".front");


let min = 1;
let max = 11;
let numArray = [];

//Counter display!
function counter(duration){
const startingminutes = duration;
let time  = startingminutes * 60;

setInterval(updateCountdown,1000);
 
function updateCountdown(){
   const minutes = Math.floor(time/60);
   let secounds = time % 60;

   secounds = secounds < 10 ? "0" + secounds : secounds;
   countdown.innerHTML = `${minutes}:${secounds}`;
   time --

   if(minutes == 0 && secounds == 0){
      timeIsOut();
   }
}

function timeIsOut(){
   clearInterval(time = 0);
   countdown.innerHTML="Timer has stopped"
}
}

function hideCards(){
   document.querySelectorAll(".back").forEach((item)=>{item.classList.add("hidden")})
}
hideCards();

function checkIfCardsMatch(){

   // 1) listen for witch card is clicked and add it to isMatchArrary.
   //! 2) Show the card. <-- do this now.
   // 3) empty array when 2 cards is clicked.
   // 4) if cards are a match keep them open otherwise flip them back.

   let nrOfCardsClicked = 0;
   let isMatch = [];
 frontSideOfCard.forEach(card => {
   card.addEventListener("click", function(){
isMatch.push(card);
nrOfCardsClicked ++;
if (nrOfCardsClicked == 2){
   
   
   //isMatch = [];
}
console.log(isMatch);
   })
 })
} 

checkIfCardsMatch();

 startButton.addEventListener("click", function(){

counter(0.1); 
    for (let i = 1; i < 11; i++){
     num = Math.floor(Math.random() * (max -min)) +1;
     
   if(!numArray.includes(num)){
      numArray.push(num);
      }else{i--};
   
     for (let j = 0; j < numArray.length; j++){
      randomImage=numArray[j];
     }

      let image =`<img src="/rcs/images/${randomImage}.png">`
        console.log(numArray);
     document.querySelector(`.card${i}-back`).innerHTML="";
     document.querySelector(`.card${i}-back`).insertAdjacentHTML("afterbegin",image) 
     
      }
  
    numArray = [];
    
 })

 
 

 testButton.addEventListener("click", function(){
   hideCards();
 })

unHideButton.addEventListener("click", function(){
  
})

