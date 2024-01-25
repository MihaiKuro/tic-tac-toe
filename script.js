const cells=document.querySelectorAll('.cell');
const statusText=document.querySelector('#statusText');
const restartButton=document.querySelector('#restartBtn');
const winConditions=[
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[6,4,2]
];
let options=['','','','','','','','',''];
let currentPlayer='X';
let gameActive=false;

initGame();

function initGame(){
    cells.forEach(cell=>cell.addEventListener('click',cellClicked));
    restartButton.addEventListener('click',restartGame);
    statusText.textContent=`Player ${currentPlayer}'s turn`;   
    gameActive=true;
    };


function cellClicked(){
    const cellIndex=this.getAttribute('cellIndex');
    if(options[cellIndex]!==''||!gameActive){
        return;
    }
    updateCell(this, cellIndex);
    
    checkWin();
    
}
function updateCell(cell,index){
    options[index]=currentPlayer;
    cell.textContent=currentPlayer;
}

function changePlayer(){
    currentPlayer=(currentPlayer==='X')?'O':'X';
    statusText.textContent=`Player ${currentPlayer}'s turn`;

}
function checkWin(){
    let roundWon=false;
    for(let i=0;i<winConditions.length;i++){
        const winCondition=winConditions[i];
        let a=options[winCondition[0]];
        let b=options[winCondition[1]];
        let c=options[winCondition[2]];

        if(a===''||b===''||c===''){
            continue;
        }
        if(a===b&&b===c){
            roundWon=true;
            break;
        }
    }
    if(roundWon){
        statusText.textContent=`Player ${currentPlayer} has won!`;
        gameActive=false;
        
    }else if(!options.includes('')){
        statusText.textContent='It is a tie!';
        gameActive=false;
        
    }else{
        changePlayer();
    }
}

function restartGame(){
    options=['','','','','','','','',''];
    cells.forEach(cell=>cell.textContent='');
    statusText.textContent=`Player ${currentPlayer}'s turn`;
    gameActive=true;

}