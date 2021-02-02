const noteId = location.hash.substring(1)
const titleElement = document.querySelector("#note-title")
const bodyElement = document.querySelector("#note-body")
const dateElement = document.querySelector("#last-edit")
const btnElement = document.querySelector("#remove-note")

// event listeners

// save on the fly
titleElement.addEventListener("input", (e) => updateTitle(e))
bodyElement.addEventListener("input", (e) => updateBody(e))
btnElement.addEventListener("click", (e) => onClickDelete(e))
// sync content across multiple tabs
window.addEventListener("storage", (e) => syncAllTabs(e))

refreshEdit()
