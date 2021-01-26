document.querySelector("#filter-incomplete-todos").addEventListener("input", function (text){
    HTML_updateIncompleteTodos(todos.filter(text.target.value))
})

document.querySelector("#filter-complete-todos").addEventListener("input", function (text){
    HTML_updateCompleteTodos(todos.filter(text.target.value))
})

document.querySelector("form#new-todo").addEventListener("submit", function(e){
    text = e.target.elements.text.value.trim()
    e.preventDefault()

    if (text !== "") {
        todos.add([{
            id: uuidv4(),
            task: text,
            completed: false
        }])
        HTML_updateIncompleteTodos(todos)
        e.target.elements.text.value = ""
    }
})
