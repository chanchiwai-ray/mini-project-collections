//
// Elements
//

const noteId = location.hash.substring(1);
const titleElement = document.querySelector("#note-title");
const bodyElement = document.querySelector("#note-body");
const dateElement = document.querySelector("#last-edit");
const btnElement = document.querySelector("#remove-note");

//
// Event listeners
//

titleElement.addEventListener("input", (e) => {
	const recordIdx = notes.findIndex((record) => record.id === noteId);
	notes[recordIdx].title = e.target.value;
	notes[recordIdx].modifiedAt = moment.now();
	notes.save();

	dateElement.textContent = `Last Edited: ${moment(notes[recordIdx].modifiedAt).fromNow()}`;
});

bodyElement.addEventListener("input", (e) => {
	const recordIdx = notes.findIndex((record) => record.id === noteId);
	notes[recordIdx].body = e.target.value;
	notes[recordIdx].modifiedAt = moment.now();
	notes.save();

	dateElement.textContent = `Last Edited: ${moment(notes[recordIdx].modifiedAt).fromNow()}`;
});

btnElement.addEventListener("click", (e) => {
	const currentNote = notes.find((record) => record.id === noteId);
	notes.delete(currentNote.id);
	location.assign("./");
});

// sync content across multiple tabs
window.addEventListener("storage", (e) => {
	if (e.key === "notes") {
		notes = new Notes().concat(JSON.parse(e.newValue));
		notes.save();
		setContent();
	}
});

//
// Helper functions
//

function setContent() {
	const recordIdx = notes.findIndex((record) => {
		return record.id === noteId;
	})
	// if it is vaild index --> update data
	if (recordIdx >= 0) {
		titleElement.value = notes[recordIdx].title;
		bodyElement.value = notes[recordIdx].body;
		dateElement.textContent = `Last Edited: ${moment(notes[recordIdx].modifiedAt).fromNow()}`;
	}
	// else if not vaild index --> redirect to home
	else {
    const currentNote = notes.find((record) => record.id === noteId);
    if (currentNote === undefined) {
      location.assign("./");
    }
  }
}

//
// Main: load the edit page with data from local storage
//

setContent();
