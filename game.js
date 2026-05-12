const board = document.querySelector('.board');
const blockHeight = 30;
const blockWidth = 30;

function fillBoard() {
    board.innerHTML = '';
    const cols = Math.floor(board.clientWidth / blockWidth);
    const rows = Math.floor(board.clientHeight / blockHeight);
    for (let i = 0; i < rows * cols; i++) {
        const block = document.createElement('div');
        block.classList.add('block');
        board.appendChild(block);
    }
}

fillBoard();

const observer = new ResizeObserver(() => fillBoard());
observer.observe(board);