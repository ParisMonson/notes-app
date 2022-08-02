const notesModel = require("./notesModel");

describe("notesModel", () => {
  it("returns empty array", () => {
    const model = new notesModel();
    expect(model.getNotes()).toEqual([]);

  });
  it("adds item", () => {
    const model = new notesModel();
    model.addItem("Buy Milk");
    expect(model.getNotes()).toEqual(["Buy Milk"]);
  });

  it("adds 2 items", () => {
    const model = new notesModel();
    model.addItem("Buy Milk");
    model.addItem("Walk the dog");
    expect(model.getNotes()).toEqual(["Buy Milk", "Walk the dog"]);
  });

  it("resets array to empty", () => {
    const model = new notesModel();
    model.addItem("Buy Milk");
    model.addItem("Walk the dog");
    expect(model.getNotes()).toEqual(["Buy Milk", "Walk the dog"]);
    model.reset();
    expect(model.getNotes()).toEqual([]);
  });

});