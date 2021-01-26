// dynamically creating buttons and tasks
function createRecords(query, records){
    document.querySelector(query).innerHTML = ""
    records.forEach(function (record){
        const outerContainer = document.querySelector(query)

        const label = document.createElement("label")
        const container = document.createElement("div")
        const checkBox = document.createElement("input")
        const removeBtn = document.createElement("button")
        const todoText = document.createElement("span")
        
        // container
        container.classList.add("list-item__container")

        // checkbox
        checkBox.type = "checkbox"
        checkBox.addEventListener("change", function (){
            todos.toggle_state(record.id)
            HTML_updateAll(todos)
        })
        checkBox.checked = record.completed ? true: false

        // todo text
        todoText.textContent = record.task
        
        // group checkbox and todoText into container so that we can check the box by clicking the text
        container.appendChild(checkBox)
        container.appendChild(todoText)

        // remove buttton
        removeBtn.textContent = "remove"
        removeBtn.classList.add("button", "button--text")
        removeBtn.addEventListener("click", function (){
            todos.remove(record.id)
            HTML_updateAll(todos)
        })
	
        label.classList.add("list-item")

        // group all container  and removeBtn into label
        label.appendChild(container)
        label.appendChild(removeBtn)
        
        // append label to outterContainer
        outerContainer.appendChild(label)
    })
}

function HTML_updateAll(todos){
    HTML_updateIncompleteTodos(todos)
    HTML_updateCompleteTodos(todos)
}

function HTML_updateIncompleteTodos(todos){
    const data = todos.categorize("completed", false).data
    const plural = data.length > 1 ? "s" : ""
    createRecords("div#incomplete-todos", data)
    document.querySelector("#incomplete-summary").textContent = `You have ${data.filter(function (record){return !record.completed}).length} todo${plural} left.`
}

function HTML_updateCompleteTodos(todos){
    const data = todos.categorize("completed", true).data
    const plural = data.length > 1 ? "s" : ""
    createRecords("div#complete-todos", data)
    document.querySelector("#complete-summary").textContent = `You have completed ${data.filter(function (record){return record.completed}).length} todo${plural}.`
}

HTML_updateAll(todos)