console.log('The notes app is running');

const notesModel = require("./notesModel");

const model = new notesModel();

model.addItem("Buy Milk");
console.log(model.getNotes());