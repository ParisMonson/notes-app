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
});
