import fs from "fs";
import { v4 as uuidv4 } from 'uuid';

/*function generateStringifi(){

}*/


let json_notes = fs.readFileSync("src/notes.json", "utf-8");
let notes = JSON.parse(json_notes)

const controller = {
  index: (req, res) => {
    res.render("index.ejs", {
      notes
    });
  },
  add: (req, res) => {
    res.render("add.ejs");
  },
  create: (req, res) => {
    const { title, description } = req.body;

    let noteCreated = {
      id: uuidv4(),
      title,
      description,
    };

    notes.push(noteCreated)

    //CREAR FUNCION
    let note_json = JSON.stringify(notes);
    fs.writeFileSync("src/notes.json", note_json, "utf-8");
    

    res.redirect("/")
  },
  viewEdit: (req, res) => {

    let {id} = req.params;
   
    let notaFiltrada = notes.filter(note => note.id == id) // NO SE ALTERA EL ARRAY ORIGINAL


    
    console.log(notaFiltrada);
    //console.log(notes) NO SE ALTERA EL ARRAY ORIGINAL

    res.render("edit.ejs", {notaFiltrada})
  }
};

export default controller;
