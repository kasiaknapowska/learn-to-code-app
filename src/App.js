import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import './App.scss';

import Home from "./js/pages/Home";
import Main from "./js/pages/Main";
import Notes from "./js/pages/Notes";
import Results from "./js/pages/Results"
import Quiz from "./js/pages/Quiz"

export default function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/main" element={<Main/>}/>
          <Route path="/notes" element={<Notes/>}/>
          <Route path="/results" element={<Results/>}/>
          <Route path="/quiz" element={<Quiz/>}/>
          {/* <Route path="*" element={<NotFound/>}/> */}
        </Routes>
      </Router>
    </>
  );
}