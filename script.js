const gameBoard = (() => {
	
	const container = document.querySelector('.game-board');
	const boardArr = Array.from(document.querySelectorAll('.blocks'));
	return boardArr;
})();

const game = document.querySelector('.game');
const text = document.querySelector('.text');
const reset = document.querySelector('.reset');

let xArr = [];
let oArr = [];


function playRound(flag,status){
gameBoard.forEach((block) => {
	block.addEventListener('click',() => {
		if(!block.textContent && !status ){

			if(flag){
				block.textContent = 'x';
				xArr.push(`${gameBoard.indexOf(block)}`);
				if(xArr.length>=3)
					status = check(xArr);
				if(status)
					text.textContent = 'Player X wins';
				flag = false;
			}
			else{
				block.textContent = 'o';
				oArr.push(`${gameBoard.indexOf(block)}`);
				if(oArr.length>=3)
					status = check(oArr);
				if(status)
					text.textContent = 'Player O wins';
				flag = true;
			}
		}
		})
	
});

}
const check = (indexArr) => {
	
	indexArr.sort();
	let newarr = [];
	let str = '';
	let win = ['012','345','678','036','147','258','048','246'];

	for (let i = 0; i < indexArr.length; i++){
	
		for(let j = i+1; j < indexArr.length; j++){
	
			for(let k = j+1; k < indexArr.length; k++){
			
				str = indexArr[i]+ indexArr[j]+ indexArr[k];
				newarr.push(str);
			}
		}
	}
	for(let i = 0; i < newarr.length; i++){
	
		if(win.includes(newarr[i])){
			game.style.display = 'flex';
			return true;
		}
	}
};

playRound(true,false);
