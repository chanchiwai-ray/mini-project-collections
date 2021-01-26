const todos = {
    data: [],
    filter: function (filter_text){
        const filter_data = this.data.filter(function (record){
            const processed_task = record.task.trim().toLowerCase()
            const processed_filter_text = filter_text.trim().toLowerCase()
            return processed_task.includes(processed_filter_text)
        })
        const tempTodos = Object.assign({}, this)
        tempTodos.data = filter_data
        return tempTodos
    },
    categorize: function (category, feature = null){
        const categorized_data = this.data.filter(function (record){
            if (feature === null){
                return record !== null
            } else {
                return record[category] === feature
            }
        })
        const tempTodos = Object.assign({}, this)
        tempTodos.data = categorized_data
        return tempTodos
    },
    load: function (){
        const recordsJSON = localStorage.getItem("records") 
        if (recordsJSON !== null){
            this.data = JSON.parse(recordsJSON)
        }
    },
    add: function (records){
        this.data = this.data.concat(records)
        localStorage.setItem("records", JSON.stringify(this.data))
    },
    remove: function (id){
        const index = this.data.findIndex(function (record){
            return record.id === id
        })

        if (index > -1){
            this.data.splice(index, 1)
            localStorage.setItem("records", JSON.stringify(this.data))
        }

    },
    toggle_state: function (id){
        const index = this.data.findIndex(function (record){
            return record.id === id
        })

        if (index > -1){
            this.data[index].completed = !this.data[index].completed
            localStorage.setItem("records", JSON.stringify(this.data))
        }
    }
}

todos.load()
