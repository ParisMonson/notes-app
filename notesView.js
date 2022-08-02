class NotesView {
  constructor(notesModel) {
    this.notesModel = notesModel;
  }

  displayNotes() {
    const notes = this.notesModel.getNotes();
    notes.forEach((note) => {
      let divEl = document.createElement("div");
      divEl.innerText = note;
      let bodyEl = document.querySelector("body");
      bodyEl.append(divEl);
    });
  }
}

// have a constructor
// the model should be dependency-injected into it.
// have a method displayNotes which will:
// get the list of notes from the model.
// for each note, create a new div element on the page (with an HTML class "note").

module.exports = NotesView;
