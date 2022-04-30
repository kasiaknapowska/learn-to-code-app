import React, { useState } from "react";
import NoteForm from "./NoteForm";

import iconPencil from "../../images/icon-pencil.svg";
import iconTrash from "../../images/icon-trash.svg";

export default function Note({
  note,
  onRemoveNote,
  onEditNote,
  isNoteFormOpen,
  setIsNoteFormOpen,
}) {
  const [isNoteFormEdited, setIsNoteFormEdited] = useState(false);

  const onEdit = () => {
    setIsNoteFormEdited(true);
    setIsNoteFormOpen(true);
  };
  return (
    <>
      <div className="note_container">
        <div className="note_header">
          <span>{note.category}</span>
          <span>
            <img
              className="note_icon"
              src={iconPencil}
              alt="edit"
              onClick={() => onEdit()}
            />
            <img
              className="note_icon"
              src={iconTrash}
              alt="delete"
              onClick={() => onRemoveNote(note.id)}
            />
          </span>
        </div>
        <h3>{note.title}</h3>
        <p>{note.text}</p>
      </div>
      {isNoteFormEdited && isNoteFormOpen && (
        <NoteForm
          header="Edit note"
          buttonText="Update"
          note={note}
          isNoteFormEdited={isNoteFormEdited}
          setIsNoteFormEdited={setIsNoteFormEdited}
          setIsNoteFormOpen={setIsNoteFormOpen}
          onNoteSubmit={onEditNote}
        />
      )}
    </>
  );
}
