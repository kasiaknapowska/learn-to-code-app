import React, { useState } from "react";
import classNames from "classnames";
import { availableCategories } from "../quizAPI/fetch";

import closeIconDark from "../../images/icon-close-dark.svg";

export default function NoteForm({
  header,
  buttonText,
  isNoteFormEdited,
  setIsNoteFormOpen,
  setIsNoteFormEdited,
  onNoteSubmit,
  note,
}) {
  const [noteCategory, setNoteCategory] = useState(note.category);
  const [noteTitle, setNoteTitle] = useState(note.title);
  const [noteText, setNoteText] = useState(note.text);

  function saveNote(e) {
    e.preventDefault();

    const currentNote = {
      id: note.id,
      title: noteTitle,
      text: noteText,
      category: noteCategory,
    };

    onNoteSubmit(currentNote);
    isNoteFormEdited && setIsNoteFormEdited(false);
  }

  const closeNoteForm = () => {
    setIsNoteFormOpen(false);
    isNoteFormEdited && setIsNoteFormEdited(false);
  };

  return (
    <div className={classNames("container", { close: !setIsNoteFormOpen })}>
      <div className="note_form_bg"></div>
      <div className="note_form">
        <img
          className="close_icon"
          alt="close"
          src={closeIconDark}
          onClick={() => closeNoteForm()}
        />
        <h2>{header}</h2>
        <h4>Choose the topic</h4>
        <form onSubmit={(e) => saveNote(e)}>
          <div className="note_form_categories">
            {availableCategories.map((category, index) => {
              return (
                <input
                  key={index}
                  type="button"
                  className={classNames({
                    choosen_category: noteCategory === category,
                  })}
                  value={category}
                  onClick={(e) => setNoteCategory(e.target.value)}
                />
              );
            })}
            <input
              type="button"
              value="Other"
              className={classNames({
                choosen_category: noteCategory === "Other",
              })}
              onClick={(e) => setNoteCategory(e.target.value)}
            />
          </div>
          <input
            type="text"
            placeholder="Title"
            value={noteTitle}
            onChange={(e) => setNoteTitle(e.target.value)}
          />
          <textarea
            placeholder="Your text goes here..."
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
          />
          <button className="primary_btn" type="submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}
