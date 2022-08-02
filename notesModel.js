class NotesModel {
  constructor() {
    this.notes = [];
  }
  getNotes() {
    return this.notes;
  }
  addItem(note) {
    this.notes.push(note);
  }
  reset() {
    this.notes = [];
  }
}

module.exports = NotesModel;
