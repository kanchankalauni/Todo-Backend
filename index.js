const express = require("express")

const app = express()

app.use(express.json())

let todos = []

app.post("/todos", (req, res) => {
    try {
        // const {title, description} = req.body;
        // todos.push({title, description})
        todos.push({...req.body, isChecked : false})
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

app.get("/", (req, res) => {
    return res.status(200).json({
        "message": "kya haal h bhai ke"
    })
})

app.listen(3000, () => {
    console.log("server started")
})