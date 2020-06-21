var startBtn = document.querySelector(".startBtn");
var stratPage = document.querySelector(".startPage");
var gamingPage = document.querySelector(".gamingPage");
var mainGame = document.querySelector(".mainGame")
var scoreDiv = document.querySelector(".gamingPage .top .score")
var gameOver = document.querySelector(".gameOver");
var gameOverH1 = document.querySelector(".gameOver h1");
var aginBtn = document.querySelector(".Btn.agin");
var pauseBtn = document.querySelector(".pauseBtn");
var pausePage = document.querySelector(".page.pause");
var continueBtn = document.querySelector(".Btn.continue")
var aginBtn2 = document.querySelector(".Btn.agin2");
var pauseH1 = document.querySelector(".pause h1");

var interId;
var score = 0;
var snake = [{x:0,y:1},{x:1,y:1},{x:2,y:1}]
var food = {x:10,y:10}
var direction = {x:-1,y:0}  //向左

startBtn.onclick = function(){
	stratPage.style.display = "none";
	gamingPage.style.display = "block";
	gameBegin();
}
pauseBtn.onclick = function(e){
	console.log(e)
	clearInterval(interId);
	pausePage.style.display = "flex";
	pauseH1.innerHTML = "您的目前得分为"+score;
	gamingPage.style.display = "none";
}
continueBtn.onclick = function(){
	pausePage.style.display = "none";
	gamingPage.style.display = "block";
	gameBegin();
}
aginBtn2.onclick = function(){
	location.reload();
}

function renderGezi(){
	for(var i=0; i<20; i++){
		for(var j=0; j<15; j++){
			var gezi = document.createElement("div");
			gezi.className = "gezi";
			gezi.id = 'x'+j+'y'+i;
			mainGame.appendChild(gezi);
		}
	}
}

function creataSnake(){
	var randomX = parseInt(Math.random()*13);
	var randomY = parseInt(Math.random()*20);
	snake = [];
	for(var i=0; i<3; i++){
		snake.push({x:randomX+i,y:randomY})
	}
}
function renderSnake(){
	snake.forEach(function(item,i){
		var snakeBody = document.querySelector("#x"+item.x+"y"+item.y);
		snakeBody.className = "gezi snake";
	})
}
function renderFood(){
	var randomX = parseInt(Math.random()*15);
	var randomY = parseInt(Math.random()*20);	
	
	var foodDiv = document.querySelector("#x"+randomX+"y"+randomY);
	if(foodDiv.className=="gezi snake"){
		renderFood()
	}else{
		foodDiv.className = "gezi food";
	}
}

function gameBegin(){
 interId = setInterval(function(){
	var headerX = snake[0].x + direction.x;
	var headerY = snake[0].y + direction.y;

	if(headerX < 0){
		headerX = 14;
	}
	if(headerX > 14){
		headerX = 0;
	}
	if(headerY < 0){
		headerY = 19;
	}
	if(headerY > 19){
		headerY = 0;
	}
	
	var snakeHeader = {x:headerX, y:headerY};
	isSnake(snakeHeader);
	if(!isFood(snakeHeader)){
		var snakeFooder = snake.pop();
		var snakeFooderDiv = document.querySelector("#x"+snakeFooder.x+"y"+snakeFooder.y);
		snakeFooderDiv.className = "gezi";		
	}
	snake.unshift(snakeHeader);
	renderSnake()
},300)	
}

renderGezi()
creataSnake()
renderSnake()
renderFood() 

function isSnake(snakeHeader){
	var newHeader = document.querySelector("#x"+snakeHeader.x+"y"+snakeHeader.y);
	if(newHeader.className == "gezi snake"){
		clearInterval(interId);
		gamingPage.style.display = "none";
		gameOver.style.display = "flex";
		gameOverH1.innerHTML = "您的最终得分为："+"<br>"+score;
	}	
}

aginBtn.onclick = function(){
	location.reload();
}

function isFood(snakeHeader){
	var newHeader = document.querySelector("#x"+snakeHeader.x+"y"+snakeHeader.y);
	if(newHeader.className == "gezi food"){
		score++;
		scoreDiv.innerHTML = "得分："+score;
		renderFood();
		return true;
	}else{
		return false;
	}
}

var body = document.body;
body.addEventListener("keydown",function(e){
	console.log(e);
	if(e.key == "ArrowDown" && direction.y != -1){
		direction = {x:0,y:1};
	}
	if(e.key == "ArrowUp" && direction.y != 1){
		direction = {x:0,y:-1};
	}
	if(e.key == "ArrowLeft" && direction.x != 1){
		direction = {x:-1,y:0};
	}
	if(e.key == "ArrowRight" && direction.x != -1){
		direction = {x:1,y:0};
	}	
})

touchEvent.init(mainGame);
mainGame.addEvent("swiperLeft",function(){
	if(direction.x != 1){
		direction = {x:-1,y:0};
	}
})
mainGame.addEvent("swiperRight",function(){
	if(direction.x != -1){
		direction = {x:1,y:0};
	}
})
mainGame.addEvent("swiperDown",function(){
	if(direction.y != -1){
		direction = {x:0,y:1};
	}
})
mainGame.addEvent("swiperUp",function(){
	if(direction.y != 1){
		direction = {x:0,y:-1};
	}
})
