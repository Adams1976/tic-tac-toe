// Создаем HTML-структуру с использованием методов DOM
const createHTMLStructure = () => {
    const body = document.body;

    const playerInputs = document.createElement('div');
    playerInputs.className = 'playerInputs';

    const labelPlayer1 = document.createElement('label');
    labelPlayer1.innerHTML = 'Игрок 1 <span class="label-circle">(Нолики): </span>';
    const inputPlayer1 = document.createElement('input');
    inputPlayer1.id = 'inputPlayer1';
    inputPlayer1.type = 'text';
    inputPlayer1.placeholder = 'Введите имя';
    labelPlayer1.appendChild(inputPlayer1);

    const labelPlayer2 = document.createElement('label');
    labelPlayer2.innerHTML = 'Игрок 2 <span class="label-krest">(Крестики): </span>';
    const inputPlayer2 = document.createElement('input');
    inputPlayer2.id = 'inputPlayer2';
    inputPlayer2.type = 'text';
    inputPlayer2.placeholder = 'Введите имя';
    labelPlayer2.appendChild(inputPlayer2);

    const btnStartGame = document.createElement('button');
    btnStartGame.id = 'btnStartGame';
    btnStartGame.textContent = 'Начать игру';

    playerInputs.appendChild(labelPlayer1);
    playerInputs.appendChild(labelPlayer2);
    playerInputs.appendChild(btnStartGame);


    const main = document.createElement('main');

    const blockWho = document.createElement('div');
    blockWho.className = 'blockWho';
    const textWho = document.createElement('div');
    textWho.className = 'text';
    textWho.innerHTML = 'Ход: <span id="spanWho"></span>';
    blockWho.appendChild(textWho);

    const blockArea = document.createElement('div');
    blockArea.id = 'blockArea';
    blockArea.className = 'blockArea';
    blockArea.style.pointerEvents = 'none';

    for (let i = 0; i < 9; i++) {
        const blockItem = document.createElement('div');
        blockItem.className = 'blockItem';
        blockArea.appendChild(blockItem);
    }

    const blockWinner = document.createElement('div');
    blockWinner.id = 'blockWinner';
    blockWinner.className = 'blockWinner';
    blockWinner.style.display = 'none';
    const textWin = document.createElement('div');
    textWin.className = 'textWin';
    textWin.innerHTML = 'Победитель: <span id="spanWin"></span>';
    const btnNewGame = document.createElement('button');
    btnNewGame.id = 'btnNewGame';
    btnNewGame.textContent = 'Новая игра';
    blockWinner.appendChild(textWin);
    blockWinner.appendChild(btnNewGame);

    main.appendChild(blockWho);
    main.appendChild(blockArea);
    main.appendChild(blockWinner);

   
    body.appendChild(playerInputs);
    body.appendChild(main);
};


createHTMLStructure();

let player1Name = "Нолики";
let player2Name = "Крестики";
let step = "circle";
let spanWho = document.getElementById('spanWho');
let blockItem = document.querySelectorAll('.blockItem');
let blockWinner = document.getElementById('blockWinner');
let spanWin = document.getElementById('spanWin');
let btnNewGame = document.getElementById('btnNewGame');
let btnStartGame = document.getElementById('btnStartGame');
let blockArea = document.getElementById('blockArea');
let inputPlayer1 = document.getElementById('inputPlayer1');
let inputPlayer2 = document.getElementById('inputPlayer2');
let counter = 0;
let winner = "";

// Меняем текущего игрока и обновляем текст
const who = () => {
    if (step == 'circle') {
        step = 'krest';
        spanWho.innerText = player2Name;
        spanWho.style.color = 'red'; 
    } else {
        step = 'circle';
        spanWho.innerText = player1Name;
        spanWho.style.color = 'green'; 
    }
};

// Запускаем игру
const startGame = () => {
    player1Name = inputPlayer1.value || "Нолики";
    player2Name = inputPlayer2.value || "Крестики";
    spanWho.style.color = 'green';
    spanWho.innerText = player1Name;
    blockArea.style.pointerEvents = 'auto';
    blockWinner.style.display = 'none';
    blockItem.forEach(cell => {
        cell.innerText = "";
        cell.className = "blockItem";
    });
    step = "circle";
    counter = 0;
    winner = "";
};

// Добавляем обработчик клика для каждой клетки
blockItem.forEach((item) => {
    item.addEventListener('click', () => {
        if (!item.classList.contains('circle') && !item.classList.contains('krest')) {
            if (step == 'krest') {
                item.innerText = 'X';
            } else {
                item.innerText = 'O';
            }
            item.classList.add(step);
            counter++;
            circleWin();
            krestWin();
            noWin();
            who();
        }
    });
});

// Массив с выигрышными комбинациями
let win = [
    [0, 1, 2],
    [0, 4, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8]
];

// Проверяем победу ноликов
let circleWin = () => {
    for (let i = 0; i < win.length; i++) {
        if (
            blockItem[win[i][0]].classList.contains('circle') &&
            blockItem[win[i][1]].classList.contains('circle') &&
            blockItem[win[i][2]].classList.contains('circle')
        ) {
            blockItem[win[i][0]].classList.add('winColor');
            blockItem[win[i][1]].classList.add('winColor');
            blockItem[win[i][2]].classList.add('winColor');
            winner = player1Name;
            endGame(winner);
            return true;
        }
    }
    return false;
};

// Проверяем победу крестиков
let krestWin = () => {
    for (let i = 0; i < win.length; i++) {
        if (
            blockItem[win[i][0]].classList.contains('krest') &&
            blockItem[win[i][1]].classList.contains('krest') &&
            blockItem[win[i][2]].classList.contains('krest')
        ) {
            blockItem[win[i][0]].classList.add('winColor');
            blockItem[win[i][1]].classList.add('winColor');
            blockItem[win[i][2]].classList.add('winColor');
            winner = player2Name;
            endGame(winner);
            return true;
        }
    }
    return false;
};

// Проверяем ничью
let noWin = () => {
    if (!krestWin() && !circleWin() && counter >= 9) {
        winner = 'Ничья';
        endGame(winner);
    }
};

// Завершаем игру
let endGame = (winner) => {
    blockArea.style.pointerEvents = 'none';
    blockWinner.style.display = 'flex';
    spanWin.innerText = winner;

    
    if (winner === player1Name) {
        spanWin.style.color = 'green'; 
    } else if (winner === player2Name) {
        spanWin.style.color = 'red'; 
    } else {
        spanWin.style.color = 'blue'; 
    }

    btnStartGame.style.display = 'none';
};


btnNewGame.addEventListener('click', startGame);


btnStartGame.addEventListener('click', startGame);