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
  setNotes(notes) {
    JSON.parse(notes).forEach((note) => {
      this.notes.push(note);
    });
  }
}

module.exports = NotesModel;
