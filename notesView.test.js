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
  it("adds a note and displays it", () => {
    model = new NotesModel();
    view = new NotesView(model);
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
    model = new NotesModel();
    view = new NotesView(model);
    const inputEl = document.querySelector("#note-input");
    inputEl.value = "My first note";
    const buttonEl = document.querySelector("#add-button");
    buttonEl.click();

    inputEl.value = "My second note";
    buttonEl.click();

    expect(document.getElementsByClassName("note").length).toBe(2);
  });

  it("clears the inputEl value after each click", () => {
    model = new NotesModel();
    view = new NotesView(model);
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
      callback(JSON.stringify(["Notes from mocked Api"]))
    );

    const view = new NotesView(model, apiDbl);

    // 2. We mock the method getMove, replacing its normal implementation
    // with a custom function (which here simply returns 'paper').
    // mockRandomGenerator.getMove.mockImplementation(() => 'paper');

    view.displayNotesFromApi();
    const noteEls = document.getElementsByClassName("note");
    Array.from(noteEls);

    expect(noteEls.length).toBe(1);
  });
});
