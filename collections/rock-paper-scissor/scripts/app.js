let humanScore = 0;
let compScore = 0;
const moves = ["r", "p", "s"];
const humanScore_span = document.getElementById("human-score");
const compScore_span = document.getElementById("comp-score");
const message_p = document.getElementById("message");
const rock_div = document.getElementById("r");
const paper_div = document.getElementById("p");
const scissor_div = document.getElementById("s");
const humanMove_span = document.getElementById("human-move");
const compMove_span = document.getElementById("comp-move");

function getWinMove(move) {
	if (move === "r") {
		return "p";
	} else if (move === "p") {
		return "s";
	} else if (move === "s") {
		return "r";
	} else {
		return null;
	}
}

function moveToText(move) {
	if (move === "r") {
		return "Rock";
	} else if (move === "p") {
		return "Paper";
	} else if (move === "s") {
		return "Scissor";
	} else {
		return null;
	}
}

function getComputerMove() {
	const index = Math.floor(Math.random() * 3);
	return moves[index];
}

function gameManagement(userMove) {
	const computerWinMove = getWinMove(userMove);
	const computerMove = getComputerMove();
	humanMove_span.innerHTML = `Human: ${moveToText(userMove)}`;
	compMove_span.innerHTML = `Computer: ${moveToText(computerMove)}`;
	if (computerMove !== computerWinMove && computerMove !== userMove) {
		document.getElementById(userMove).classList.add("green-glow");
		setTimeout(() => {document.getElementById(userMove).classList.remove("green-glow")}, 300);
		message_p.innerHTML = "You Win!";
		humanScore_span.innerHTML = ++humanScore;
	} else if (computerMove === userMove){
		document.getElementById(userMove).classList.add("gray-glow");
		setTimeout(() => {document.getElementById(userMove).classList.remove("gray-glow")}, 300);
		message_p.innerHTML = "Draw...";
	} else {
		document.getElementById(userMove).classList.add("red-glow");
		setTimeout(() => {document.getElementById(userMove).classList.remove("red-glow")}, 300);
		message_p.innerHTML = "You Lose!";
		compScore_span.innerHTML = ++compScore;
	}
}

rock_div.addEventListener("click", () => {
	gameManagement("r");
});
paper_div.addEventListener("click", () => {
	gameManagement("p");
});
scissor_div.addEventListener("click", () => {
	gameManagement("s");
});