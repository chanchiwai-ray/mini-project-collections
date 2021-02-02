const notes = {
    data: [],
    filter: function (filter_text){
        if (filter_text === undefined){
            return this
        } else {
            const filter_data = this.data.filter(function (record){
                const processed_title = record.title.trim().toLowerCase()
                const processed_filter_text = filter_text.trim().toLowerCase()
                return processed_title.includes(processed_filter_text)
            })
            const tempNotes = Object.assign({}, this)
            tempNotes.data = filter_data
            return tempNotes
        }
    },
    sortBy: function (action){
        if (action == undefined){
            return this
        } else if (action === "byModified"){
            const sortData = this.data.sort(function (a, b){
                if (a.modifidAt > b.modifiedAy){
                    return -1
                } else if (a.modifidAt < b.modifidAt){
                    return 1
                } else {
                    return 0
                }
            })
            const tempNotes = Object.assign({}, this)
            tempNotes.data = sortData
            return tempNotes
        } else if (action === "byCreation"){
            const sortData = this.data.sort(function (a, b){
                if (a.createdAt > b.createdAt){
                    return -1
                } else if (a.createdAt < b.createdAt){
                    return 1
                } else {
                    return 0
                }
            })
            const tempNotes = Object.assign({}, this)
            tempNotes.data = sortData
            return tempNotes
        } else if (action === "byName"){
            const sortData = this.data.sort(function (a, b){
                if (a.title > b.title){
                    return 1
                } else if (a.title < b.title){
                    return -1
                } else {
                    return 0
                }
            })
            const tempNotes = Object.assign({}, this)
            tempNotes.data = sortData
            return tempNotes
        } else{
            console.log("wrong")
        }
    },
    categorize: function (category, feature = null){
        const categorized_data = this.data.filter(function (record){
            if (feature === null){
                return record !== null
            } else {
                return record[category] === feature
            }
        })
        const tempNotes = Object.assign({}, this)
        tempNotes.data = categorized_data
        return tempNotes
    },
    load: function (){
        const notesJSON = localStorage.getItem("notes") 
        if (notesJSON !== null){
            this.data = JSON.parse(notesJSON)
        }
    },
    new: function (notes){
        this.data = this.data.concat(notes)
        localStorage.setItem("notes", JSON.stringify(this.data))
    },
    delete: function (id){
        console.log(id)
        const index = this.data.findIndex((record) => record.id === id)

        if (index > -1){
            this.data.splice(index, 1)
            localStorage.setItem("notes", JSON.stringify(this.data))
        }

    },
    save: function (){
        localStorage.setItem("notes", JSON.stringify(this.data))
    }
}

notes.load()