// dependencies 
const express = require("express");
const res = require("express/lib/response");
const fs = require("fs");
const path = require("path");

// initialize the express, set inital port for listener
const app = express();
const PORT = process.env.PORT || 3001;

// bringing back data as json
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html"));
});

app.get("/api/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "db.json"));
});




