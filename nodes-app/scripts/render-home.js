// functions
function newNote(note){
    const innerContainer = document.createElement("a")
    const noteTitle = document.createElement("p")
    const status = document.createElement("p")

    innerContainer.classList.add("list-item")
    innerContainer.setAttribute("href", `/edit-pages.html#${note.id}`)

    noteTitle.textContent = note.title
    noteTitle.classList.add("list-item__title")
    
    status.textContent = moment(note.modifiedAt).fromNow()
    status.classList.add("list-item__subtitle")

    innerContainer.appendChild(noteTitle)
    innerContainer.appendChild(status)

    return innerContainer
}

function appendNewNotes(notes, query = "#notes"){
    if (notes.length === 0){
    const emptyMessage = document.createElement("p")
    emptyMessage.textContent = "No notes to show"
    emptyMessage.classList.add("empty-message")
        document.querySelector(query).appendChild(emptyMessage)
    } else {
        const outterContainer = document.querySelector(query)
        notes.forEach(function (note){
            outterContainer.appendChild(newNote(note))
        })   
    }
}

// event listeners
document.querySelector("button#new").addEventListener("click", () => onClickNew())
document.querySelector("input#filter-notes").addEventListener("input", (e) => onChangeFilter(e))
document.querySelector("#sort-notes").addEventListener("change", (e) => onSort(e))
window.addEventListener("storage", (e) => syncAllTabs(e))

// main 
refreshHTML()
