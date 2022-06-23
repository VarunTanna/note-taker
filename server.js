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
const notes = require("./db/db.json");
const req = require("express/lib/request");
const res = require("express/lib/response");

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html"));
});

app.get("/api/notes", function(req, res) {
    // res.sendFile(path.join(__dirname, "./db/db.json"));
    res.json(notes);
});

app.get('/api/notes', function(req, res) {
    console.info(`${req.method} request received for notes`);
    res.json(notes);
})


app.post('/api/notes', (req, res) => {
    console.info(`${req.method} request received to add review`);
    const { title, text } = req.body;
    if (title && text) {
        const savedNote = {
            title, 
            text,
            id: uuid(),
        };
        const response = {
            status: 'Success',
            body: savedNote,
        };
        notes.push(savedNote)
        console.log(response);
        res.status(201).json(response);
    } else {
        res.status(500).json();
    }


});    
// delete function found online
app.delete("/api/notes/:id", (req, res) => {
    const { id } = req.params;
    const delNote = notes.findIndex(note => note.id ==id);
    notes.splice(delNote, 1);
    return res.send();
  });



// my delete function attempt

// app.delete('/api/notes/:id', (req, res) => {
//     console.log(req.params.id)
//      const newNotes = notes.filter(note => {
//         note.id !== req.params.id});
//     res.json(newNotes)
    
//     console.log(newNotes)
    
// })



app.listen(PORT, function() {
    console.log(`App is listening at http://localhost:${PORT}`);
});