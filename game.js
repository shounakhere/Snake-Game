const board = document.querySelector('.board');
const blockHeight = 30;
const blockWidth = 30;
const blocks = {};
const snake = [
    { x: 5, y: 25},
    { x: 5, y: 26 },
    { x: 5, y: 27 }
];
let direction = 'left';
rows =0;
cols =0;
function fillBoard() {
    board.innerHTML = '';
    cols = Math.floor(board.clientWidth / blockWidth);
    rows = Math.floor(board.clientHeight / blockHeight);

    for (let i = 0; i < rows * cols; i++) {
        const block = document.createElement('div');
        block.classList.add('block');

        const row = Math.floor(i / cols) + 1;
        const col = (i % cols) + 1;
        block.textContent = `${row},${col}`;

        blocks[`${row}-${col}`] = block; 

        board.appendChild(block);
    }
}

fillBoard();

const observer = new ResizeObserver(() => fillBoard());
observer.observe(board);

function render() {
    snake.forEach(element => {                              
        const block = blocks[`${element.x}-${element.y}`]; 
        if (block) block.classList.add('fill');             
    });

}
function gameover(){
    alert("Game Over")
    location.reload()
    clearInterval(gameLoop)
}

const gameLoop = setInterval(() => {
    let head = null
    if(direction=="left"){
        head = {x:snake[0].x,y:snake[0].y-1}
    }else if(direction =="right") {
        head = {x:snake[0].x,y:snake[0].y+1}
    }else if(direction =="up"){
        head = {x:snake[0].x-1,y:snake[0].y}
    }else if(direction=="down"){
        head = {x:snake[0].x+1,y:snake[0].y}
    }
    if(head.x<0 || head.y<0 || head.x>=rows|| head.y>=cols){
        gameover();
        gameover.reload();
        return;
    }
    snake.forEach(element => {                              
        const block = blocks[`${element.x}-${element.y}`]; 
        if (block) block.classList.remove('fill');             
    });
    snake.unshift(head)
    snake.pop()
    render();
}, 100);

addEventListener("keydown",(event)=>{
    if(event.key=="ArrowUp"){
        direction="up"
    }else if(event.key=="ArrowDown"){
        direction="down"
    }else if(event.key=="ArrowRight"){
        direction="right"
    }else if(event.key=="ArrowLeft"){
        direction="left"
    }
})