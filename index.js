console.log("The notes app is running");

const NotesModel = require("./notesModel");
const NotesView = require("./notesView");
const NotesApi = require("./notesApi");

api = new NotesApi();
model = new NotesModel();
view = new NotesView(model, api);

view.displayNotesFromApi();
