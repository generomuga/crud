const express = require('express');
const app = express();
const pool = require("./config/db");
// const pool = require('./config/knex');

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
    const { task, comment } = req.body;
    try {
        const newTodo = await pool.query(
            "INSERT INTO master.todo (task,comment) VALUES ($1,$2) RETURNING *",[task,comment]
        );
        res.json(newTodo);
    } catch (error) {
        console.error(error.message)
    }
});

app.delete('/todos/:id', async(req, res) => {
    const { id } = req.params;
    try {
        const removeTodo = await pool.query(
            "DELETE FROM master.todo WHERE id=$1 RETURNING *", [id]
        );
        res.json(removeTodo.rows[0]);
    } catch (error) {
        console.error(error.message)
    }
});

app.put('/todos/:id', async(req, res) => {
    const { id } = req.params;
    const { task, comment } = req.body;
    try {
        const updateTodo = await pool.query(
            "UPDATE master.todo SET task=$2, comment=$3 WHERE id=$1 RETURNING *",[id,task,comment]
        );
        res.json(updateTodo);
    } catch (error) {
        console.error(error.message)
    }
});
