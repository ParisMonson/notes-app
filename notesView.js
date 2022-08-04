class NotesView {
  constructor(notesModel, notesApi) {
    this.notesApi = notesApi;
    this.notesModel = notesModel;
    const addButtonEl = document.querySelector("#add-button");

    addButtonEl.addEventListener("click", () => {
      const inputEl = document.querySelector("#note-input");
      this.notesModel.addItem(inputEl.value);
      inputEl.value = null;
      this.displayNotes();
    });
  }

  displayNotes() {
    const noteEl = document.getElementsByClassName("note");
    if (!(noteEl.length === 0)) {
      Array.from(noteEl).forEach((note) => {
        note.remove();
      });
    }

    const notes = this.notesModel.getNotes();

    notes.forEach((note) => {
      let divEl = document.createElement("div");
      divEl.innerText = note;
      divEl.className = "note";
      let mainDivEl = document.querySelector("#main-container");
      mainDivEl.append(divEl);
    });
  }
  displayNotesFromApi() {
    const notes = this.notesApi.loadNotes((data) => {
      return data;
    });
    this.notesModel.setNotes(notes);
    this.displayNotes();
  }
}

// Test-drive a new method displayNotesFromApi() on the NotesView class - this method should:

// call loadNotes() on the API class.
// when the response data is received, set the list of notes on the model and call displayNotes():

// This method is new — you'll need to add it to the model class
// model.setNotes(notes);
// view.displayNotes();

module.exports = NotesView;
