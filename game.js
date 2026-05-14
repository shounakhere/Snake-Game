const board = document.querySelector('.board');

const blockHeight = 30;
const blockWidth = 30;
const blocks = {};

const snake = [
    { x: 5, y: 25 },
    { x: 5, y: 26 },
    { x: 5, y: 27 }
];
let direction = 'left';
let rows = 0;  
let cols = 0;   
let food = null 
let isPaused = false;

function spawnFood() {
    food = {
        x: Math.floor(Math.random() * rows) + 1, 
        y: Math.floor(Math.random() * cols) + 1
    }
    const block = blocks[`${food.x}-${food.y}`]
    if (block) block.classList.add('food')
}

function fillBoard() {
    board.innerHTML = '';
    cols = Math.floor(board.clientWidth / blockWidth);
    rows = Math.floor(board.clientHeight / blockHeight);

    for (let i = 0; i < rows * cols; i++) {
        const block = document.createElement('div');
        block.classList.add('block');

        const row = Math.floor(i / cols) + 1;
        const col = (i % cols) + 1;

        blocks[`${row}-${col}`] = block;
        board.appendChild(block);
    }
    spawnFood()
}

fillBoard();

const observer = new ResizeObserver(() => fillBoard());
observer.observe(board);

function render() {

    snake.forEach(element => {
        const block = blocks[`${element.x}-${element.y}`];
        if (block) block.classList.add('fill');
    });

    if (food) {
        const foodBlock = blocks[`${food.x}-${food.y}`]
        if (foodBlock) foodBlock.classList.add('food')
    }
}

function gameover() {
    clearInterval(gameLoop) 
    alert("Game Over")
    location.reload()
}

const gameLoop = setInterval(() => {
    let head = null;
    if(isPaused) return;
    if (direction == "left")       head = { x: snake[0].x,     y: snake[0].y - 1 }
    else if (direction == "right") head = { x: snake[0].x,     y: snake[0].y + 1 }
    else if (direction == "up")    head = { x: snake[0].x - 1, y: snake[0].y     }
    else if (direction == "down")  head = { x: snake[0].x + 1, y: snake[0].y     }
    if(head.y < 1){
        head.y = cols;
    }
    else if(head.y > cols){
        head.y = 1;
    }
    if(head.x < 1){
        head.x = rows;
    }
    else if(head.x > rows){
        head.x = 1;
    }

    const selfCollision = snake.some(s => s.x === head.x && s.y === head.y)
    if (selfCollision) {
        gameover();
        return;
    }

    if (head.x == food.x && head.y == food.y) {
        const foodBlock = blocks[`${food.x}-${food.y}`]
        if (foodBlock) foodBlock.classList.remove('food')  
        snake.unshift(head)  
        spawnFood()          
        render()
        return
    }

    snake.forEach(element => {
        const block = blocks[`${element.x}-${element.y}`];
        if (block) block.classList.remove('fill');
    });

    snake.unshift(head)
    snake.pop()
    render();
}, 70);

addEventListener("keydown", (event) => {
    if(event.code === "Space"){
        isPaused = !isPaused;
        return;
        
    }
    if (event.key == "ArrowUp"    && direction !== 'down')  direction = 'up'
    else if (event.key == "ArrowDown"  && direction !== 'up')    direction = 'down'
    else if (event.key == "ArrowRight" && direction !== 'left')  direction = 'right'
    else if (event.key == "ArrowLeft"  && direction !== 'right') direction = 'left'
})