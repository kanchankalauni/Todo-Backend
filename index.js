const express = require("express")

const app = express()

app.use(express.json())

let todos = [{
            "title": "arsh",
            "desc": "ugug",
            "isChecked": false,
            "id": 1
        },{
            "title": "fghf",
            "desc": "asfas",
            "isChecked": false,
            "id": 2
        },
        {
            "title": "ihoihio",
            "desc": "khkugu",
            "isChecked": false,
            "id": 3
        },
        {
            "title": "zfzxhg",
            "desc": "jby",
            "isChecked": false,
            "id": 4
        }]

app.post("/todos", (req, res) => {
    try {
        // const {title, description} = req.body;
        // todos.push({title, description})
        console.log(req.body)
        todos.push({...req.body, isChecked : false, id : todos.length + 1})
        return res.status(200).json({message : "Todo added successfully"})
    } catch (err) {
        return res.status(500).json({"message" : "please try again"})
    }
})

app.get("/todos", (req, res) => {
    try {
        return res.status(200).json({todos})
    } catch (err) {
        return res.status(500).json({"message" : "please try again"})
    }
})

app.delete("/todos/:id", (req, res) => {
    try {
        // console.log(req.params.id)
        todos.splice(Number(req.params.id) - 1, 1)
        return res.status(200).json({message : "Todo deleted successfully"})
                
                // OR

        // const filteredTodo = todos.filter(todo => todo.id != req.params.id)
        // todos = [...filteredTodo]
        // return res.status(200).json({filteredTodo})
    } catch (err) {
        return res.status(500).json({"message" : "please try again"})
    }
})

app.put("/todos/:id", (req, res) => {
    try {

        // 3 -> updated

        const index = todos.findIndex(todo => todo.id == req.params.id)
        todos[index] = {...todos[index] , ...req.body}

        return res.status(200).json({"message" : "Todo updated successfully"})
    } catch (err) {
        return res.status(500).json({"message" : "please try again"})
    }
})

app.get("/", (req, res) => {
    return res.status(200).json({
        "message": "kya haal h bhai ke"
    })
})

app.listen(3000, () => {
    console.log("server started")
})