class NotesApi {
  constructor() {}
  loadNotes(callback) {
    fetch("http://localhost:3000/notes")
      .then((response) => response.json())
      .then((data) => {
        callback(data);
      });
  }
  createNote(data, callback) {
    const a = [data];

    fetch("http://localhost:3000/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(a),
    })
      .then((response) => response.json())
      .then((jsObject) => {
        callback(jsObject);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
}

// We now want to update the NotesView class so that the new method api.createNote()
// is called when the user submits the form — test-drive this feature. Remember, here again, to mock the dependency on NotesApi in this test.

// Make sure the view is "refreshed" with the newly created note, by
//  calling displayNotes() again.

module.exports = NotesApi;
