import React, { useState } from "react";

import BackButton from "../components/BackButton";
import SelectCategory from "../components/SelectCategory";
import QuestionForm from "../components/QuestionForm";
import Alert from "../components/Alert";

import iconQuiz from "../../images/icon-quiz.svg";

export default function Quiz() {
  const [category, setCategory] = useState(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [alert, setAlert] = useState("");

  const setQuiz = (e) => {
    if (category) {
      setShowQuiz(true);
    } else {
      setAlert("Select quiz");
    }
  };

  return (
    <>
      <BackButton />
      <main className="container">
        <img className="page_icon" alt="quiz" src={iconQuiz} />
        <h1>Quiz</h1>
        <SelectCategory
          category={category}
          setCategory={setCategory}
          setShowQuiz={setShowQuiz}
          setAlert={setAlert}
        />
        <button className="primary_btn" onClick={setQuiz}>
          Start quiz
          {alert && <Alert text={alert} iconDirection="0" />}
        </button>

        {showQuiz && <QuestionForm category={category} />}
      </main>
    </>
  );
}
