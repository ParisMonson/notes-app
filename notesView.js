class NotesView {
  constructor(notesModel) {
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
}

module.exports = NotesView;
