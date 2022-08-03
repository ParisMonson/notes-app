console.log("The notes app is running");

const NotesModel = require("./notesModel");
const NotesView = require("./notesView");
const NotesApi = require("./notesApi");

notesApi = new NotesApi();
notesModel = new NotesModel();
notesView = new NotesView(notesModel);
