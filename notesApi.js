class NotesApi {
  constructor() {}
  loadNotes(callback) {
    fetch("http://localhost:3000/notes")
      .then((response) => response.json())
      .then((data) => {
        callback(JSON.stringify(data));
      });
  }
}

module.exports = NotesApi;
