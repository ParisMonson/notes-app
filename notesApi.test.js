const { default: JSDOMEnvironment } = require("jest-environment-jsdom");
const NotesApi = require("./notesApi");

require("jest-fetch-mock").enableMocks();

describe("NotesApi", () => {
  it("initializes", () => {
    const api = new NotesApi();
    expect(api).toBeDefined();
  });
  it("calls fetch and loads data", async () => {
    const api = new NotesApi();
    fetch.mockResponseOnce(JSON.stringify(["A note from the Api"]));

    api.loadNotes((returnedData) => {
      expect(returnedData).toEqual(["A note from the Api"]);
    });
  });
  it("uses fetch to send a POST request to backend", async () => {
    const api = new NotesApi();

    fetch.mockResponseOnce(
      JSON.stringify(["A note from the Api", "A new note from the Api"])
    );

    api.createNote("A new note from the Api", (jsObject) => {
      expect(jsObject).toEqual([
        "A note from the Api",
        "A new note from the Api",
      ]);
    });
  });
});
