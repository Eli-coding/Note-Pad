const express = require('express');
const path = require('path');
const app = express();
const PORT = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true
}))

app.use(express.static("public"))

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
})

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
})

app.get('/api/notes', (req, res) => {
    res.readFile(path.join(__dirname, 'db.json'));
  });


app.listen(PORT, () => {

    console.log("Listening on PORT", PORT);
})