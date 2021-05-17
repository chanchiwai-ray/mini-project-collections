//
// Elements
//

const notesDivElement = document.querySelector("#notes");
const newButtonElement = document.querySelector("#new");
const filterInputElement = document.querySelector("#filter-notes");
const sortNotesDropdownElement = document.querySelector("#sort-notes");

//
// Event listeners
//

sortNotesDropdownElement.addEventListener("change", (e) => {
	setContent(filterText = undefined, sortBy = e.target.value);
});

filterInputElement.addEventListener("input", (e) => {
	setContent(filterText = e.target.value, sortAction = undefined);
});

newButtonElement.addEventListener("click", () => {
	const newId = uuidv4();
	const now = moment.now();
	notes.new(new Note(newId, "Untitled", null, now, now));
	location.assign(`edit-pages.html#${newId}`);
	setContent();
});

window.addEventListener("storage", (e) => {
	if (e.key === "notes"){
		notes = new Notes().concat(JSON.parse(e.newValue));
		notes.save();
		setContent();
	}
});

//
// Helper functions
//

function newNote(note){
	const innerContainer = document.createElement("a");
	const noteTitle = document.createElement("p");
	const status = document.createElement("p");

	innerContainer.classList.add("list-item");
	innerContainer.setAttribute("href", `edit-pages.html#${note.id}`);

	noteTitle.textContent = note.title;
	noteTitle.classList.add("list-item__title");

	status.textContent = `Last modified: ${moment(note.modifiedAt).fromNow()}`;
	status.classList.add("list-item__subtitle");

	innerContainer.appendChild(noteTitle);
	innerContainer.appendChild(status);

	return innerContainer;
}

function appendNewNotes(notes){
	if (notes.length === 0) {
    const emptyMessage = document.createElement("p");
    emptyMessage.textContent = "No notes to show";
    emptyMessage.classList.add("empty-message");
		notesDivElement.appendChild(emptyMessage);
	} else {
		notes.forEach((note) => {
			notesDivElement.appendChild(newNote(note));
		})
	}
}

function setContent(filterText = undefined, sortAction = undefined){
	// clear contents of #notes first
	notesDivElement.innerHTML = "";
  // then fill with new content
	appendNewNotes(sortNotes(filterNotes(notes, filterText), sortAction));
}

//
// Main: load the index page with data from local storage
//

setContent();
