import React, { useState, useEffect } from "react";

import {
  notesCollectionRef,
  getNotes,
  postNote,
  editNote,
  deleteNote,
} from "../lib/func-firebase";
import { onSnapshot } from "firebase/firestore";

import BackButton from "../components/BackButton";
import NoteForm from "../components/NoteForm";
import Note from "../components/Note";

import iconNotes from "../../images/icon-notes.svg";

export default function Notes() {
  const [isNoteFormOpen, setIsNoteFormOpen] = useState(false);
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    getNotes((response) => {
      const notesFromFirebase = response.docs.map((doc) => ({
        category: doc.data().category,
        title: doc.data().title,
        text: doc.data().text,
        id: doc.id,
      }));
      setNotes(notesFromFirebase);
    });
  }, []);

  //Realtime  watching firestore database
  useEffect(() => {
    const unsubscribe = onSnapshot(notesCollectionRef, (snapshot) => {
      setNotes(
        snapshot.docs.map((doc) => ({
          category: doc.data().category,
          title: doc.data().title,
          text: doc.data().text,
          id: doc.id,
        }))
      );
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const onSaveNote = (currentNote) => {
    const { category, title, text } = currentNote;
    if (title === "" || text === "") {
      return;
    }
    postNote(category, title, text);
    setIsNoteFormOpen(false);
  };

  const onRemoveNote = (id) => {
    deleteNote(id);
  };

  const onEditNote = (currentNote) => {
    const { category, title, text, id } = currentNote;
    if (title === "" || text === "") {
      return;
    }
    editNote(id, category, title, text);
    setIsNoteFormOpen(false);
  };
  const newNote = {
    id: undefined,
    title: "",
    text: "",
    category: "",
  };

  return (
    <>
      <BackButton />
      <main className="container">
        <img className="page_icon" alt="notes" src={iconNotes} />
        <h1>Notes</h1>
        <button className="primary_btn" onClick={() => setIsNoteFormOpen(true)}>
          Add note
        </button>
        {isNoteFormOpen && (
          <NoteForm
            header="New note"
            buttonText="Save"
            setIsNoteFormOpen={setIsNoteFormOpen}
            onNoteSubmit={onSaveNote}
            note={newNote}
          />
        )}

        <div className="notes_container">
          {notes &&
            notes.map((note) => {
              return (
                <Note
                  key={note.id}
                  note={note}
                  onRemoveNote={onRemoveNote}
                  onEditNote={onEditNote}
                  isNoteFormOpen={isNoteFormOpen}
                  setIsNoteFormOpen={setIsNoteFormOpen}
                />
              );
            })}
        </div>
      </main>
    </>
  );
}
