const digit_span = document.getElementById("count");
const decrease_btn = document.getElementById("decrease-btn");
const reset_btn = document.getElementById("reset-btn");
const increase_btn = document.getElementById("increase-btn");

let count = 0;

function refresh() {
	digit_span.innerHTML = `${count}`;
}

decrease_btn.addEventListener("click", () => {
	count--;
	refresh();
});

reset_btn.addEventListener("click", () => {
	count = 0;
	refresh();
});

increase_btn.addEventListener("click", () => {
	count++;
	refresh();
});