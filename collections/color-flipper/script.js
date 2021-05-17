const bodyElement = document.querySelector("body");
const color_span = document.getElementById("color");
const binary_li = document.getElementById("rgb");
const hex_li = document.getElementById("hex");
const button_span = document.getElementById("btn");

let choice = "RGB";

function getRandomColor(display) {
	const R = Math.floor(Math.random() * 256);
	const G = Math.floor(Math.random() * 256);
	const B = Math.floor(Math.random() * 256);
	
	if (display === "RGB") {
		return `rgb(${R}, ${G}, ${B})`;
	} else {
		return `#${R.toString(16)}${G.toString(16)}${B.toString(16)}`;
	}
}

hex_li.addEventListener("click", () => {
	choice = "Hex";
	console.log(choice);
});

binary_li.addEventListener("click", () => {
	choice = "RGB";
	console.log(choice);
});

button_span.addEventListener("click", () => {
	let color = getRandomColor(choice);
	console.log(color);
	color_span.innerHTML = color;
	bodyElement.style.backgroundColor = color;
})