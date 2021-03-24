//
// Helper functions
//

function filterTodos(todos, filterText) {
  return todos.filter((record) => {
    const processedTask = record.task.trim().toLowerCase();
    const processedFilterText = filterText.trim().toLowerCase();
    return processedTask.includes(processedFilterText);
  });
}

//
// Todo class
//

class TodoRecord {
  constructor(id, task, completed) {
    this.id = id;
    this.task = task;
    this.completed = completed;
  }
}

class Todos extends Array {
  getCompleted() {
    return this.filter(record => {
      return record.completed;
    });
  }

  getIncomplete() {
    return this.filter(record => {
      return !record.completed;
    });
  }

  add(record) {
    this.push(record);
    localStorage.setItem("records", JSON.stringify(this));
  }

  remove(id) {
    const index = this.findIndex((record) => {
        return record.id === id;
    })

    if (index > -1) {
      this.splice(index, 1);
      localStorage.setItem("records", JSON.stringify(this));
    }
  }

  toggleState(id) {
    const index = this.findIndex((record) => {
        return record.id === id;
    })

    if (index > -1) {
        this[index].completed = !this[index].completed;
        localStorage.setItem("records", JSON.stringify(this));
    }
  }
}

//
// Main: load all the data from local storage
//

const recordsJSON = localStorage.getItem("records");
let todos = new Todos();
if (recordsJSON !== null){
  todos = todos.concat(JSON.parse(recordsJSON));
}
