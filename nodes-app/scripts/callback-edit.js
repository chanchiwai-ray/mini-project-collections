function redirectHome(){
    const currentNote = notes.data.find((record) => record.id === noteId)

    if (currentNote === undefined){
        location.assign("/index.html")
    }
}

function updateTitle(e){
    const recordIdx = notes.data.findIndex((record) => record.id === noteId)
    
    notes.data[recordIdx].title = e.target.value
    notes.data[recordIdx].modifiedAt = moment.now()
    notes.save()

    dateElement.textContent = `Last Edited: ${moment(notes.data[recordIdx].modifiedAt).fromNow()}`
}

function updateBody(e){
    const recordIdx = notes.data.findIndex(function (record){
        return record.id === noteId
    })
    notes.data[recordIdx].body = e.target.value
    notes.data[recordIdx].modifiedAt = moment.now()
    notes.save()

    dateElement.textContent = `Last Edited: ${moment(notes.data[recordIdx].modifiedAt).fromNow()}`
}

function syncAllTabs(e){
    if (e.key === "notes"){
        notes.data = JSON.parse(e.newValue)
        notes.save()
        setContent()
    }
}

function setContent(){
    const recordIdx = notes.data.findIndex(function (record){
        return record.id === noteId
    })
    // if it is vaild index --> update data 
    if (recordIdx >= 0){
        titleElement.value = notes.data[recordIdx].title
        bodyElement.value = notes.data[recordIdx].body
        dateElement.textContent = `Last Edited: ${moment(notes.data[recordIdx].modifiedAt).fromNow()}`
    } 
    // else if not vaild index --> redirect to home
    else {
        redirectHome()
    }
}

function refreshEdit(){
    setContent()
    redirectHome()
}

function onClickDelete(record){
    const currentNote = notes.data.find((record) => record.id === noteId)
    notes.delete(currentNote.id)
    location.assign('/index.html')
}

