const express = require('express');
const path = require('path');
const fs = require("fs");
const data = require("./db/db.json");
const { v4: uuidv4 } = require('uuid');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}))

app.use(express.static("public"))

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
})

app.get('/api/notes', (req, res) => {
    res.send(data);
});

app.post('/api/notes', (req, res) =>{
 console.log(req.body);
 let newNote = req.body;
 newNote.id = uuidv4();
 data.push(newNote);
 fs.writeFile("./db/db.json", JSON.stringify(data) ,(err) =>{
   if(err){
       console.log(err);
   } else {
       console.log("File updated.")
       res.json(req.body);
   }
 });
});

// app.delete('/api/notes/:id', (req,res)=>{
//    save readfile to var and create empty array
//     let savedNote = JSON.parse(fs.readFile("./db/db.json", utf-8));
    
//     let undeletedNote = [];
//     let deleted = req.params.id;
//     fs.readFile("./db/db.json", JSON.stringify(data) ,(err) =>{
//         if(err){
//             console.log(err);
//         } else {
//             console.log("Note deleted")
//             for (i = 0; i < savedNote.length; i++ ){
//                if (deleted === savedNote[i]){
//                specify id 
//                }
//             }
//         }
     // });

//});

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.listen(PORT, () => {

    console.log("Listening on PORT", PORT);
});