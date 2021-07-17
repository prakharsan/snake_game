
const cvs = document.getElementById("snake");
const ctx = cvs.getContext("2d");

const box = 32;  //unit


//loading images
const ground = new Image(); 
ground.src = "img/ground.png";

const foodImg = new Image();
foodImg.src = "img/food.png"

//loading audio

const dead = new Audio();
const eat = new Audio();
const up = new Audio();
const left = new Audio();
const right = new Audio();
const down = new Audio();

dead.src = "audio/dead.mp3"
eat.src = "audio/eat.mp3"
up.src = "audio/up.mp3"
left.src = "audio/left.mp3"
right.src = "audio/right.mp3"
down.src = "audio/down.mp3"

//creating snake

let snake = [];
snake[0] = {
    x : 9*box,
    y: 10*box
}


//creating food

let food = {
    x : Math.floor(Math.random()*17+1) * box,
    y : Math.floor(Math.random()*15+3) * box
}

//creating score

let score = 0;

//controlling the snake

let d;

document.addEventListener("keydown",direction);

function direction(event){
    if(snake.length === 1){
        if(event.keyCode === 37 && d !== "left"){
            left.play();
            d = "left";
        } else  if(event.keyCode === 38 && d !=="up"){
            up.play();
            d = "up";
        } else  if(event.keyCode === 39 && d !== "right"){
            right.play();
            d = "right";
        } else  if(event.keyCode === 40 && d !== "down"){
            down.play();
            d = "down";
        }
    } else {
        if(event.keyCode === 37 && d !== "right" && d !== "left"){
            left.play();
            d = "left";
        } else  if(event.keyCode === 38 && d !== "down" && d !=="up"){
            up.play();
            d = "up";
        } else  if(event.keyCode === 39 && d !== "left" && d !== "right"){
            right.play();
            d = "right";
        } else  if(event.keyCode === 40 && d !== "up" && d !== "down"){
            down.play();
            d = "down";
        }
    }
    
}

//check collision

function collision(head,array){
    for(let i = 0; i < array.length; i++){
        if(head.x == array[i].x && head.y == array[i].y){
            return true;
        }
    }

    return false;
}

//drawing everything on canvas

function draw(){
    ctx.drawImage(ground,0,0);

    // looping over snake

    for(let i=0; i<snake.length; i++){
        ctx.fillStyle = (i == 0)? "green" : "white";
        ctx.fillRect(snake[i].x, snake[i].y,box,box);

        ctx.strokeStyle = "red";
        ctx.strokeRect(snake[i].x, snake[i].y,box,box);
    }

    ctx.drawImage(foodImg, food.x, food.y);

    //old head position

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    //increase snake size on eating food

    if(snakeX == food.x && snakeY == food.y){
        eat.play();
        score++;
        food = {
            x : Math.floor(Math.random()*17+1) * box,
            y : Math.floor(Math.random()*15+3) * box
        } 
        //if snake eats food dont remove tail
    } else {
          //remove tail
            snake.pop();
    }
    
    // direction
    if( d === "left") snakeX -= box;
    if( d === "right") snakeX += box;
    if( d === "up") snakeY -= box;
    if( d === "down") snakeY += box;

       //new head

       let newHead = {
        x : snakeX,
        y : snakeY
    }

    //game over 

    if(snakeX < box || snakeX > 17*box 
    || snakeY < 3*box || snakeY > 17*box || collision(newHead, snake) ){
        dead.play();
        clearInterval(game);
    }
     
    snake.unshift(newHead);

    ctx.fillStyle = "white";
    ctx.font = "45px Arial";
    ctx.fillText(score,2*box,1.65*box);
}

//calling draw function every 100 ms

let game = setInterval(draw,100);