let board = ["", "", "", "", "", "", "", "", ""];
const human = "X";
const ai = "O";

function startGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  render();
}

function render() {
  const container = document.getElementById("board");
  container.innerHTML = "";
  board.forEach((val, i) => {
    const square = document.createElement("div");
    square.className = "square";
    square.textContent = val;
    square.addEventListener("click", () => move(i));
    container.appendChild(square);
  });
}

function move(index) {
  if (board[index] !== "") return;
  board[index] = human;
  if (!checkWin(human)) {
    const best = minimax(board, ai);
    board[best.index] = ai;
  }
  render();
  checkWin(human) || checkWin(ai);
}

function minimax(newBoard, player) {
  const availSpots = newBoard.map((v, i) => v === "" ? i : null).filter(v => v !== null);

  if (checkWinner(newBoard, human)) return { score: -10 };
  if (checkWinner(newBoard, ai)) return { score: 10 };
  if (availSpots.length === 0) return { score: 0 };

  let moves = [];
  for (let i of availSpots) {
    let move = {};
    move.index = i;
    newBoard[i] = player;

    if (player === ai) {
      let result = minimax(newBoard, human);
      move.score = result.score;
    } else {
      let result = minimax(newBoard, ai);
      move.score = result.score;
    }

    newBoard[i] = "";
    moves.push(move);
  }

  return (player === ai)
    ? moves.reduce((best, m) => (m.score > best.score ? m : best))
    : moves.reduce((best, m) => (m.score < best.score ? m : best));
}

function checkWin(player) {
  if (checkWinner(board, player)) {
    setTimeout(() => alert(`${player} wins!`), 100);
    return true;
  }
  if (!board.includes("")) {
    setTimeout(() => alert("Draw!"), 100);
    return true;
  }
  return false;
}

function checkWinner(b, p) {
  return (
    [0, 1, 2].every(i => b[i] === p) ||
    [3, 4, 5].every(i => b[i] === p) ||
    [6, 7, 8].every(i => b[i] === p) ||
    [0, 3, 6].every(i => b[i] === p) ||
    [1, 4, 7].every(i => b[i] === p) ||
    [2, 5, 8].every(i => b[i] === p) ||
    [0, 4, 8].every(i => b[i] === p) ||
    [2, 4, 6].every(i => b[i] === p)
  );
}

startGame();
