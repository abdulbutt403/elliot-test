var noteInput = document.getElementById("note-input");
var addNoteButton = document.getElementById("add-note");
var notesContainer = document.getElementById("notes-container");
var notes = JSON.parse(localStorage.getItem("notes") || "[]");
// Render existing notes on page load
function renderNotes() {
    notesContainer.innerHTML = ""; // Clear any existing content
    notes.forEach(function (note) {
        // Create a new div element for each note
        var noteElement = document.createElement("div");
        noteElement.classList.add("note");
        // Create content for each note
        var noteContent = document.createElement("div");
        noteContent.textContent = note.content;
        noteContent.contentEditable = "false"; // Set initially as non-editable
        noteElement.appendChild(noteContent);
        // Create a delete button for each note
        var deleteButton = document.createElement("button");
        deleteButton.classList.add("delete");
        deleteButton.textContent = "x";
        deleteButton.onclick = function () { return deleteNote(note.id); };
        // Create the edit button for each note
        var editButton = document.createElement("button");
        editButton.classList.add("edit");
        editButton.textContent = "Edit";
        editButton.onclick = function () {
            if (editButton.textContent === "Save") {
                note.content = noteContent.textContent || ""; // Update the note content
                localStorage.setItem("notes", JSON.stringify(notes)); // Update localStorage
                editButton.textContent = "Edit";
                renderNotes(); // Re-render notes
            }
            noteContent.contentEditable = "true"; // Make content editable
            noteContent.focus();
            editButton.textContent = "Save";
        };
        // Append the delete button to the note element
        noteElement.appendChild(deleteButton);
        noteElement.appendChild(editButton);
        // Append the note element to the notes container
        notesContainer.appendChild(noteElement);
    });
}
// Function to add a new note
function addNote() {
    var content = noteInput.value.trim();
    if (content) {
        var newNote = {
            id: Date.now(),
            content: content,
        };
        notes.push(newNote);
        localStorage.setItem("notes", JSON.stringify(notes));
        renderNotes();
        noteInput.value = "";
    }
}
// Function to delete a note
function deleteNote(id) {
    notes = notes.filter(function (note) { return note.id !== id; }); // Remove the note with the given ID
    localStorage.setItem("notes", JSON.stringify(notes)); // Update localStorage
    renderNotes(); // Re-render notes
}
// Attach event listener to the button
addNoteButton.addEventListener("click", addNote);
// Initial rendering of notes
renderNotes();
