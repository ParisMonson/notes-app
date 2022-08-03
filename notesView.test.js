/**
 * @jest-environment jsdom
 */
const fs = require("fs");
const NotesView = require("./notesView");
const NotesModel = require("./notesModel");
const { hasUncaughtExceptionCaptureCallback } = require("process");
describe("NotesView Test", () => {
  beforeEach(() => {
    document.body.innerHTML = fs.readFileSync("./index.html");
  });

  it("initializes", () => {
    model = new NotesModel();
    view = new NotesView(model);
    expect(view).toBeDefined();
  });

  it("creates a new div element for a note", () => {
    model = new NotesModel();
    model.addItem("Test Note");

    view = new NotesView(model);
    view.displayNotes();

    expect(document.querySelectorAll("div").length).toBe(2);
  });

  it("creates a new div element for a note with the notes text inside", () => {
    model = new NotesModel();
    model.addItem("Test Note");

    view = new NotesView(model);
    view.displayNotes();

    expect(document.querySelectorAll("div")[1].innerText).toBe("Test Note");
  });

  it("creates 2 new div elements for notes with the class note", () => {
    model = new NotesModel();
    model.addItem("Test Note");
    model.addItem("Second Test Note");

    view = new NotesView(model);
    view.displayNotes();

    expect(document.getElementsByClassName("note").length).toBe(2);
  });
});
