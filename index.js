const express = require("express")
const fs = require("fs")

const app = express()

app.use(express.json())

let path = __dirname + "/todos.json"

app.post("/todos", (req, res) => {
    try {
        // const {title, description} = req.body;
        // todos.push({title, description})

        fs.readFile(path, {encoding : "utf-8"}, (err, todos) => {
            
            todos = todos ? JSON.parse(todos) : []
            todos.push({...req.body, isChecked : false, id : todos.length + 1})
            
            fs.writeFile(path, JSON.stringify(todos), {encoding : "utf-8"}, (err) => {
                if (err) {
                    return res.status(500).json({"message" : "please try again"})
                }else{
                    return res.status(200).json({"message" : "Todo added successfully"})
                }
            })

        })
    } catch (err) {
        return res.status(500).json({"message" : "please try again"})
    }
})

app.get("/todos", (req, res) => {
    try {
        fs.readFile(path, {encoding : "utf-8"}, (err, todos) => {
            todos = todos ? JSON.parse(todos) : []
            return res.status(200).json({todos})
        })
    } catch (err) {
        return res.status(500).json({"message" : "please try again"})
    }
})

app.delete("/todos/:id", (req, res) => {
    try {
        // console.log(req.params.id)
        
        // todos.splice(Number(req.params.id) - 1, 1)
        // return res.status(200).json({message : "Todo deleted successfully"})
                
                // OR

        // const filteredTodo = todos.filter(todo => todo.id != req.params.id)
        // todos = [...filteredTodo]
        // return res.status(200).json({filteredTodo})

        fs.readFile(path, {encoding : "utf-8"}, (err, todos) => {
            
            todos = todos ? JSON.parse(todos) : []

            const filteredTodo = todos.filter(todo => todo.id != req.params.id)
            
            fs.writeFile(path, JSON.stringify(filteredTodo), {encoding : "utf-8"}, (err) => {
                if (err) {
                    return res.status(500).json({"message" : "please try again"})
                }else{
                    return res.status(200).json({message : "Todo deleted successfully"})
                }
            })

        })

    } catch (err) {
        return res.status(500).json({"message" : "please try again"})
    }
})

app.put("/todos/:id", (req, res) => {
    try {

        // 3 -> updated

        fs.readFile(path, {encoding : "utf-8"}, (err, todos) => {
            
            todos = todos ? JSON.parse(todos) : []

            const index = todos.findIndex(todo => todo.id == req.params.id)
            todos[index] = {...todos[index] , ...req.body}
            
            fs.writeFile(path, JSON.stringify(todos), {encoding : "utf-8"}, (err) => {
                if (err) {
                    return res.status(500).json({"message" : "please try again"})
                }else{
                    return res.status(200).json({"message" : "Todo updated successfully"})
                }
            })

        })

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