console.log("The notes app is running");

const NotesModel = require("./notesModel");
const NotesView = require("./notesView");

notesModel = new NotesModel();
notesView = new NotesView(notesModel);
