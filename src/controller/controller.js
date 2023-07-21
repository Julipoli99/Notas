import fs from "fs";
import { v4 as uuidv4 } from "uuid";

/*function generateStringifi(){

}*/

/*
let json_notes = fs.readFileSync("src/notes.json", "utf-8");
let notes;
*/

const PATH_JSON = "src/notes.json"

let notes = [];

function parseJson(data){
  return JSON.parse(data)
}

function readJson(){
  return fs.readFileSync(PATH_JSON, "utf8");
}

function showNotes(res, vista){
  try {
    let data = readJson();
    let notes = parseJson(data)
    res.render(vista, { notes });
  } catch (err) {
    console.error("Error leyendo el archivo JSON:", err);
    return res.status(500).json({ error: "Error del servidor" });
  }
}

const controller = {
  index: (req, res) => {
    showNotes(res, "index.ejs")
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

    try {
      let data = readJson();
      notes = parseJson(data);
    } catch (err) {
      console.error("Error leyendo el archivo JSON:", err);
      return res.status(500).json({ error: "Error del servidor" });
    }

    notes.push(noteCreated);

    // Escribir el archivo JSON de notas de manera síncrona
    try {
      fs.writeFileSync("src/notes.json", JSON.stringify(notes), "utf8");
    } catch (err) {
      console.error("Error escribiendo en el archivo JSON:", err);
      return res.status(500).json({ error: "Error del servidor" });
    }

    res.redirect("/");
  },

  viewEdit: (req, res) => {
    let notaFiltrada;
    let {id} = req.params;
   

    try {
      let data = fs.readFileSync("src/notes.json", "utf8");
      console.log(data);
      notes = JSON.parse(data);
      console.log(notes);
      notaFiltrada = notes.filter((note) => note.id == id); // NO SE ALTERA EL ARRAY ORIGINAL
      console.log(notaFiltrada);
    } catch (err) {
      console.error(err);
    }
    //console.log(notes) NO SE ALTERA EL ARRAY ORIGINAL

    res.render("edit.ejs", { notaFiltrada });
  },
  editPost: (req, res) => {
    let { title, description } = req.body;

    let { id } = req.params;

    // let notaAEditar = notes.filter(note => note.id == req.params.id)

    let noteEdited = {
      id,
      title,
      description,
    };

    notes.push(noteEdited);

    let note_json = JSON.stringify(noteEdited);

    console.log("stringify:", note_json);
    fs.writeFileSync("src/notes.json", note_json, "utf-8");

    res.redirect("/");
  },
};

export default controller;
