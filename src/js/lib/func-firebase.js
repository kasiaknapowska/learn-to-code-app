import {
  doc,
  addDoc,
  collection,
  getDocs,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "./init-firebase";

const protipsCollectionRef = collection(db, "protips");
const notesCollectionRef = collection(db, "notes");

const getProtips = (successCallback) => {
  getDocs(protipsCollectionRef)
    .then((response) => {
      //   console.log(response.docs)
      successCallback(response);
    })
    .catch((err) => console.log(err.message));
};

const getNotes = (successCallback) => {
  getDocs(notesCollectionRef)
    .then((response) => {
      successCallback(response);
    })
    .catch((err) => console.log(err.message));
};

const postNote = (category, title, text) => {
  addDoc(notesCollectionRef, { category: category, title: title, text: text })
    .then((response) => {
      console.log("Note posted");
    })
    .catch((err) => console.log(err.message));
};

const editNote = (id, category, title, text) => {
  const docNotesRef = doc(db, "notes", id);
  updateDoc(docNotesRef, { category: category, title: title, text: text })
    .then((response) => {
      console.log("Note edited");
    })
    .catch((err) => console.log(err.message));
};

const deleteNote = (id) => {
  const docNotesRef = doc(db, "notes", id);
  deleteDoc(docNotesRef)
    .then(() => {
      console.log("Note deleted");
    })
    .catch((err) => console.log(err.message));
};

const getResults = (category, successCallback) => {
  getDocs(collection(db, `results-${category}`))
    .then((response) => {
      successCallback(response);
      // console.log(response.docs)
    })
    .catch((err) => console.log(err.message));
};

const postResult = (
  category,
  correct,
  time,
  score,
  date,
  prize,
  dateForSort
) => {
  addDoc(collection(db, `results-${category}`), {
    category: category,
    correct: correct,
    time: time,
    score: score,
    date: date,
    prize: prize,
    dateForSort: dateForSort,
  })
    .then((response) => {
      console.log("Result posted");
    })
    .catch((err) => console.log(err.message));
};

export {
  notesCollectionRef,
  getProtips,
  getNotes,
  postNote,
  editNote,
  deleteNote,
  getResults,
  postResult,
};
