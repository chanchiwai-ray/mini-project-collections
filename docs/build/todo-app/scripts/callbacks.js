document.querySelector("#filter-incomplete-todos").addEventListener("input", (text) => {
  HTML_updateIncompleteTodos(filterTodos(todos, text.target.value));
})

document.querySelector("#filter-completed-todos").addEventListener("input", (text) => {
  HTML_updateCompleteTodos(filterTodos(todos, text.target.value));
})

document.querySelector("form#new-todo").addEventListener("submit", (e) => {
  text = e.target.elements.text.value.trim();
  e.preventDefault();

  if (text !== "") {
    todos.add(new TodoRecord(
      uuidv4(),
      text,
      false
    ));
    HTML_updateIncompleteTodos(todos);
    e.target.elements.text.value = "";
  }
})
