function clearHTML(query = "#notes"){
    // clear contents of #notes
    document.querySelector(query).innerHTML = ""
}

function refreshHTML(filterText = undefined, sortAction = undefined, query = "#notes"){
    clearHTML(query)
    appendNewNotes(notes.filter(filterText).sortBy(sortAction).data)
}

function syncAllTabs(e){
    if (e.key === "notes"){
        notes.data = JSON.parse(e.newValue)
        notes.save()
        refreshHTML()
    }
}

// callback functions
function onChangeFilter(e) {
    refreshHTML(filterText = e.target.value, sortAction = undefined)
}

function onClickNew(){
    const newId = uuidv4()
    const now = moment.now()
    notes.new([{id: newId, title: "Untitled", body: null, createdAt: now, modifiedAt: now}])
    notes.save()
    location.assign(`/edit-pages.html#${newId}`)
    refreshHTML()
}

function onClickDelete(note){
    notes.delete(note.id)
    refreshHTML()
}

function onClickEdit(note){
    location.assign(`/edit-pages.html#${note.id}`)
}

function onSort(e){
    refreshHTML(filterText = undefined, sortBy = e.target.value)
}