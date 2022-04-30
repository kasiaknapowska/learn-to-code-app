import React, { useState, useEffect } from "react";
import { getQuiz } from "../quizAPI/fetch";
import Question from "./Question";
import Alert from "./Alert";
import Timer from "./Timer";
import QuizResult from "./QuizResult";

export default function QuestionForm({ category }) {
  //question form
  const [isLoading, setIsLoading] = useState(true);
  const [newQuiz, setNewQuiz] = useState(null);
  const [reloadQuiz, setReloadQuiz] = useState(false);
  const [answers, setAnswers] = useState({});
  const [correctAnswers, setCorrectAnswers] = useState({});
  const [correctAnswersChecked, setCorrectAnswersChecked] = useState(null);
  const [alert, setAlert] = useState("");
  const [showCorrectAnswers, setShowCorrectAnswers] = useState(false);
  const [formCanBeHandled, setFormCanBeHandled] = useState(true);

  //timer
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(true);

  //user
  const user = localStorage
    .getItem("user")
    .substring(1, localStorage.getItem("user").length - 1);

  // functions
  useEffect(() => {
    getQuiz(category, (data) => {
      const areMultipleCorrectAnswers = data.filter(
        (el) => el.multiple_correct_answers === "true"
      );
      if (areMultipleCorrectAnswers.length === 0) {
        setNewQuiz(data);
        getCorrectAnswers(data);
        setIsLoading(false);
        setIsRunning(true);
      } else {
        setReloadQuiz(reloadQuiz === false ? true : false);
      }
    });
  }, [reloadQuiz, category]);

  function getCorrectAnswers(quiz) {
    return quiz.map((question) => {
      const correct = Object.keys(question.correct_answers).filter(
        (key) => question.correct_answers[key] === "true"
      );
      return setCorrectAnswers((prevState) => {
        return {
          ...prevState,
          [question.id]: correct[0],
        };
      });
    });
  }

  function handleForm(e) {
    const { name, value } = e.target;

    if (formCanBeHandled) {
      setAnswers((prevState) => {
        return {
          ...prevState,
          [name]: value,
        };
      });
    }
    setAlert("");
  }

  function onSubmit(e, correctAnswers, answers) {
    e.preventDefault();
    if (Object.keys(answers).length === 10) {
      setAlert("");
      setIsRunning(false);
      setCorrectAnswersChecked(
        Object.keys(correctAnswers).filter(
          (key) =>
            answers.hasOwnProperty(key) &&
            answers[key] === correctAnswers[key].substring(0, 8)
        )
      );
      setFormCanBeHandled(false);
    } else {
      setAlert("You have to answer all questions");
    }
  }

  // console.log(correctAnswersChecked);

  let count = 1;

  return (
    <>
      <div className="question_form_container">
        {isLoading && (
          <div className="loading_container">
            <div className="loading_animation"></div>
            <h2>Your QUIZ is loading...</h2>
          </div>
        )}
        {!isLoading && (
          <>
            <div className="timer_container">
              <h2>Good luck, {user}!</h2>
              <Timer time={time} setTime={setTime} isRunning={isRunning} />
            </div>

            <form
              className="question_form"
              onSubmit={(e) => onSubmit(e, correctAnswers, answers)}
            >
              {newQuiz &&
                newQuiz.map((question) => {
                  return (
                    <div key={question.id}>
                      <Question
                        count={count++}
                        id={question.id}
                        question={question.question}
                        answers={question.answers}
                        handleForm={handleForm}
                        correctAnswers={correctAnswers}
                        showCorrectAnswers={showCorrectAnswers}
                      />
                    </div>
                  );
                })}
              <button type="submit" className="primary_btn">
                Check it out
              </button>
            </form>
          </>
        )}
        {alert && (
          <Alert
            text={alert}
            iconDirection="180deg"
            additionalClass="question_alert"
          />
        )}
      </div>
      {correctAnswersChecked && (
        <QuizResult
          correctAnswersChecked={correctAnswersChecked}
          setShowCorrectAnswers={setShowCorrectAnswers}
          category={category}
          time={time}
        />
      )}
    </>
  );
}
