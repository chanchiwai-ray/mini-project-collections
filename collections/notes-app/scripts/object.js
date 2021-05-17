//
// Helper functions
//

function filterNotes(notes, filterText) {
  if (filterText === undefined) return notes;

  return notes.filter((record) => {
    const processedTitle = record.title.trim().toLowerCase();
    const processedFilterText = filterText.trim().toLowerCase();
    return processedTitle.includes(processedFilterText);
  });
}

function sortByModified(notes) {
  return notes.sort((a, b) => {
    if (a.modifiedAt > b.modifiedAt) {
      return -1;
    } else if (a.modifiedAt < b.modifiedAt) {
      return 1;
    } else {
      return 0;
    }
  })
}

function sortByCreation(notes) {
  return notes.sort((a, b) => {
    if (a.createdAt > b.createdAt) {
      return -1;
    } else if (a.createdAt < b.createdAt) {
      return 1;
    } else {
      return 0;
    }
  })
}

function sortByTitle(notes) {
  return notes.sort((a, b) => {
    if (a.title > b.title) {
      return 1;
    } else if (a.title < b.title) {
      return -1;
    } else {
      return 0;
    }
  })
}

function sortNotes(notes, action) {

  if (action == undefined) return sortByModified(notes);
  else if (action === "byModified") return sortByModified(notes);
  else if (action === "byCreation") return sortByCreation(notes);
  else if (action === "byTitle")    return sortByTitle(notes);
  else console.log("Unknown sorting method.");
}

//
// Note object class
//

class Note {
  constructor(id, title, body, createdAt, modifiedAt) {
    this.id = id;
    this.title = title;
    this.body = body;
    this.createdAt = createdAt;
    this.modifiedAt = modifiedAt;
  }
}

class Notes extends Array {
  new(note) {
    this.push(note);
    this.save();
  }

  delete(id) {
    const index = this.findIndex((record) => record.id === id);

    if (index > -1) {
      this.splice(index, 1);
      this.save();
    }
  }

  save() {
    localStorage.setItem("notes", JSON.stringify(this));
  }
}

//
// Main: load the data from local storage
//

const notesJSON = localStorage.getItem("notes") ;
let notes = new Notes();
if (notesJSON !== null) {
  notes = notes.concat(JSON.parse(notesJSON));
}