type Note = {
  id: number;
  content: string;
};

const noteInput = document.getElementById("note-input") as HTMLInputElement;
const addNoteButton = document.getElementById("add-note") as HTMLButtonElement;
const notesContainer = document.getElementById(
  "notes-container"
) as HTMLElement;

let notes: Note[] = JSON.parse(localStorage.getItem("notes") || "[]");

// Render existing notes on page load
function renderNotes() {
  notesContainer.innerHTML = ""; // Clear any existing content

  notes.forEach((note) => {
    // Create a new div element for each note
    const noteElement = document.createElement("div");
    noteElement.classList.add("note");

    // Create content for each note
    const noteContent = document.createElement("div");
    noteContent.textContent = note.content;
    noteContent.contentEditable = "false"; // Set initially as non-editable
    noteElement.appendChild(noteContent);

    // Create a delete button for each note
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete");
    deleteButton.textContent = "x";
    deleteButton.onclick = () => deleteNote(note.id);

    // Create the edit button for each note
    const editButton = document.createElement("button");
    editButton.classList.add("edit");
    editButton.textContent = "Edit";

    editButton.onclick = () => {
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
  const content = noteInput.value.trim();
  if (content) {
    const newNote: Note = {
      id: Date.now(),
      content,
    };

    notes.push(newNote);

    localStorage.setItem("notes", JSON.stringify(notes));
    renderNotes();

    noteInput.value = "";
  }
}

// Function to delete a note
function deleteNote(id: number) {
  notes = notes.filter((note) => note.id !== id); // Remove the note with the given ID

  localStorage.setItem("notes", JSON.stringify(notes)); // Update localStorage
  renderNotes(); // Re-render notes
}

// Attach event listener to the button
addNoteButton.addEventListener("click", addNote);

// Initial rendering of notes
renderNotes();
