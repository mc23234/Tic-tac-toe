let board;
const winCombo = [
					[0,1,2],
					[3,4,5],
					[6,7,8],
					[0,3,6],
					[1,4,7],
					[2,5,8],
					[0,4,8],
					[2,4,6]
				];
let playerX = 'x';
let playerO = 'o';
let counter = 0;
const blocks = document.querySelectorAll('.block');
const result = document.querySelector('.result');

function startGame(){
		result.style.visibility = 'hidden';
		board = Array.from(Array(9).keys());
		for(let i = 0; i < board.length; i++){
				blocks[i].innerText = '';
				blocks[i].style.background = 'none';
				blocks[i].addEventListener('click', addMarker);
			}
	}

function addMarker(cell){
		
		if(typeof board[cell.target.id] === 'number'){
				takeTurn(cell.target.id,playerX);	
			if(!checkTie())
				setTimeout(() => {takeTurn(findSpot(),playerO)},1000);

		}
	}

function findSpot(){
		return board.filter(e => typeof e === 'number')[0];
	}

function takeTurn(id,player){
		document.getElementById(id).innerText = player;
		board[id] = player;
		let gameWon = checkWin(player);
		if(gameWon) gameOver(gameWon);
		let tie = checkTie();
		if(!gameWon && tie){
				setTimeout(() => {result.style.visibility = 'visible'},1000);
				result.firstElementChild.innerText = `game tied`;
			}
	}

function checkTie(){
		let arr = board.filter(e => typeof e === 'number');
		if(arr.length === 0)
			return true;
		return false;
	}

function checkWin(player){
		let arr = board.reduce((a,b,c,d) => {return board[c] === player?a.concat(c):a},[]);
		let gameWon = null;
		for(let [index,combo] of winCombo.entries()){
				if(combo.every(a => arr.indexOf(a) > -1)){
					gameWon = {index,player};
					break;
				}
			}
		return gameWon;
	}

function gameOver(gameWon){
		blocks.forEach(cell => {cell.removeEventListener('click',addMarker)});
		reset(gameWon);
	}

function reset(gameWon){
		
		for(let i of winCombo[gameWon.index])
			blocks[i].style.background = 'rgba(23,212,212,0.25)';
		
		setTimeout(() => {result.style.visibility = 'visible'},1000);
		result.firstElementChild.innerText = `Player ${gameWon.player} \n wins`;
		
	}

result.lastElementChild.addEventListener('click',startGame);

startGame();

