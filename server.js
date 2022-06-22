// dependencies 
const express = require("express");
const fs = require("fs");
const path = require("path");

// initialize the express, set inital port for listener
const app = express();
const PORT = process.env.PORT || 3001;

// bringing back data as json
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
const { uuid } = require("./utils/utilis")
const notes = require("./db/db.json")

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html"));
});

app.get("/api/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "./db/db.json"));
});

app.get('/api/notes', function(req, res) {
    console.info(`${req.method} request received for notes`);
    res.json(notes);
})

app.post('/api/notes', (req, res) => {
    const { title, text } = req.body;
    if (title && text) {
        const savedNote = {
            title, 
            text,
            id: uuid(),
        };
        notes.push(savedNote);
        let noteArray = JSON.stringify((notes), null, 2);
        fs.writeFile('./db/db.json', noteArray, () => {
            const response = {
                body: savedNote,
            }
            res.json(response);
        })
    };;
});




app.listen(PORT, function() {
    console.log(`App is listening on Port ${PORT}`);
});