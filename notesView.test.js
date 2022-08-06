/**
 * @jest-environment jsdom
 */
const fs = require("fs");
const NotesView = require("./notesView");
const NotesModel = require("./notesModel");
const NotesApi = require("./notesApi");
const { hasUncaughtExceptionCaptureCallback } = require("process");
const { default: JSDOMEnvironment } = require("jest-environment-jsdom");

jest.mock("./notesApi");

describe("NotesView Test", () => {
  beforeEach(() => {
    document.body.innerHTML = fs.readFileSync("./index.html");
    NotesApi.mockClear();
  });

  it("initializes", () => {
    const model = new NotesModel();
    const apiDbl = new NotesApi();
    const view = new NotesView(model, apiDbl);
    expect(view).toBeDefined();
  });

  it("creates a new div element for a note", () => {
    const model = new NotesModel();
    model.addItem("Test Note");
    const apiDbl = new NotesApi();
    const view = new NotesView(model, apiDbl);
    view.displayNotes();

    expect(document.querySelectorAll("div").length).toBe(2);
  });

  it("creates a new div element for a note with the notes text inside", () => {
    const model = new NotesModel();
    model.addItem("Test Note");
    const apiDbl = new NotesApi();
    const view = new NotesView(model, apiDbl);
    view.displayNotes();

    expect(document.querySelectorAll("div")[1].innerText).toBe("Test Note");
  });

  it("creates 2 new div elements for notes with the class note", () => {
    const model = new NotesModel();
    model.addItem("Test Note");
    model.addItem("Second Test Note");
    const apiDbl = new NotesApi();
    const view = new NotesView(model, apiDbl);
    view.displayNotes();

    expect(document.getElementsByClassName("note").length).toBe(2);
  });
  it("adds a note and displays it", () => {
    const model = new NotesModel();
    const apiDbl = new NotesApi();
    const view = new NotesView(model, apiDbl);
    const inputEl = document.querySelector("#note-input");
    inputEl.value = "My first note";
    const buttonEl = document.querySelector("#add-button");
    buttonEl.click();

    expect(document.getElementsByClassName("note").length).toBe(1);
    expect(document.getElementsByClassName("note")[0].innerText).toBe(
      "My first note"
    );
  });
  it("removes all note elements before each display view function", () => {
    const model = new NotesModel();
    const apiDbl = new NotesApi();
    const view = new NotesView(model, apiDbl);
    const inputEl = document.querySelector("#note-input");
    inputEl.value = "My first note";
    const buttonEl = document.querySelector("#add-button");
    buttonEl.click();

    inputEl.value = "My second note";
    buttonEl.click();

    expect(document.getElementsByClassName("note").length).toBe(2);
  });

  it("clears the inputEl value after each click", () => {
    const model = new NotesModel();
    const apiDbl = new NotesApi();
    const view = new NotesView(model, apiDbl);
    const inputEl = document.querySelector("#note-input");
    inputEl.value = "My first note";
    const buttonEl = document.querySelector("#add-button");
    buttonEl.click();

    expect(inputEl.value).toBe("");
  });
  it("changes html page with notes recieved from Api", () => {
    const model = new NotesModel();
    const apiDbl = new NotesApi();

    apiDbl.loadNotes.mockImplementation((callback) =>
      callback(["Notes from mocked Api"])
    );

    const view = new NotesView(model, apiDbl);

    view.displayNotesFromApi();
    const noteEls = document.getElementsByClassName("note");
    Array.from(noteEls);

    expect(noteEls.length).toBe(1);
    expect(noteEls[0].innerText).toBe("Notes from mocked Api");
  });
  it("sends the input note to Api backend", () => {
    const model = new NotesModel();
    const apiDbl = new NotesApi();
    apiDbl.createNote.mockImplementation(() => {
      console.log("Tests");
    });

    const view = new NotesView(model, apiDbl);
    const inputEl = document.querySelector("#note-input");
    inputEl.value = "NOTE";

    const addButton = document.querySelector("#add-button");
    addButton.click();

    expect(apiDbl.createNote).toHaveBeenCalledTimes(1);
  });
});
