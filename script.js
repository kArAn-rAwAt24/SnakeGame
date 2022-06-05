//all constant and variabel
let inputDir ={x:0,y:0};
const foodSound = new Audio('music/food.mp3');
const gameOverSound = new Audio('music/gameover.mp3');
const moveSound = new Audio('music/move.mp3');
const musicSound = new Audio('music/music.mp3');
let speed=7;
let lastPaintTime=0;
let snakeArr =[
    {x:12, y:13}
]
food={x:5,y:4};
let score=0;



//game functions

function main(ctime){
    window.requestAnimationFrame(main);
    if((ctime-lastPaintTime)/1000<1/speed){
        return;
    }
    lastPaintTime=ctime; 
    gameEngine();
}

function isCollide(sArr){
        //if u bump into yourself
        for(let i=1; i<sArr.length; i++){
            if(sArr[i].x===sArr[0].x && sArr[i].y===sArr[0].y){
                return true;
            }
        }
        //if u ump into wall
        if(sArr[0].x<0||sArr[0].x>=18 || sArr[0].y<0||sArr[0].y>=18){
            return true;
        }
        return false;
}


function gameEngine(){
    // updating the snake array
     if(isCollide(snakeArr)){
         gameOverSound.play();
         musicSound.pause();
         inputDir ={x:0,y:0};
         alert("Game Over.");
         snakeArr=[{x:12,y:13}];
        //  musicSound.play();
         score=0;
         scoreBoard.innerHTML="Score: "+0;
     }


    // if u eaten the food, inc. score and regenerate the food
     if(snakeArr[0].x===food.x && snakeArr[0].y===food.y){
         foodSound.play();
         score+=1;
         if(score>highestScoreVal){
            highestScoreVal=score;
            localStorage.setItem("highestScore", JSON.stringify(highestScoreVal))
            highestScoreBoard.innerHTML="Highest score: "+highestScoreVal;
         }
         scoreBoard.innerHTML="Score: "+score;
        snakeArr.unshift({x:snakeArr[0].x+inputDir.x,y:snakeArr[0].y+inputDir.y});
        let a=2;
        let b=16;
        food = {x: Math.round(a+(b-a)*Math.random()),y: Math.round(a+(b-a)*Math.random())}
     }

     //moving the snake 
    
     for (let i = snakeArr.length - 2; i>=0; i--) { 
        snakeArr[i+1] = {...snakeArr[i]};
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    //display the snake 
    board.innerHTML ="";
    snakeArr.forEach((e,index)=>{
        snakeElement =document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if(index===0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snakeBody');
          }
        
        board.appendChild(snakeElement);
    })
   
    //display the food
    foodElement =document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);

}




//main logic
let highestScore=localStorage.getItem("highestScore");
if(highestScore===null){
    let highestScoreVal=0;
    localStorage.setItem("highestScore", JSON.stringify(highestScoreVal))
}
else{
    highestScoreVal=JSON.parse(highestScore);
    highestScoreBoard.innerHTML="Highest score: "+highestScoreVal; 
}

window.requestAnimationFrame(main);

window.addEventListener('keydown',e=>{
    inputDir={x:0, y:1} //start the game
    // musicSound.play();
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        default:
            break;
    }

});
