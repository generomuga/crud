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