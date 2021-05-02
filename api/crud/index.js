const express = require('express');
const app = express();
const pool = require("./db");

const port = 3000;

app.use(express.json());

app.listen(port, ()=> {
    console.log(`App running on port ${port}`)
});

app.get('/foo', function(req, res) {
    res.send('Hello! CRUD')
});

app.get('/todos', async(req, res) => {
    try {
        const allTodo = await pool.query(
            "SELECT * FROM master.todo"
        );
        res.json(allTodo.rows);
    } catch (error) {
        console.error(error.message)
    }
});

app.get('/todos/:id', async(req, res) => {
    const { id } = req.params;
    try {
        const todo = await pool.query(
            "SELECT * FROM master.todo WHERE id=$1", [id]
        );
        res.json(todo.rows[0]);
    } catch (error) {
        console.error(error.message)
    }
});

app.post('/todos', async(req, res) => {
    const { id, task, comment } = req.body;
    try {
        const newTodo = await pool.query(
            "INSERT INTO master.todo (id,task,comment) VALUES ($1,$2,$3) RETURNING *",[id,task,comment]
        );
        res.json(newTodo);
    } catch (error) {
        console.error(error.message)
    }
});