const express = require('express')
const app = express()


const port = 3000;

app.listen(port, ()=> {
    console.log(`App running on port ${port}`)
});

app.get('/foo', function(req, res) {
    res.send('Hello! CRUD')
});