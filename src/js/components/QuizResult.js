import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ResultElement from "./ResultElement";
import { postResult } from "../lib/func-firebase";

import iconDone from "../../images/icon-done.svg";
import iconTime from "../../images/icon-time.svg";
import iconScores from "../../images/icon-scores.svg";
import iconReward1 from "../../images/icon-reward-1.svg";
import iconReward2 from "../../images/icon-reward-2.svg";
import iconReward3 from "../../images/icon-reward-3.svg";
import iconRewardConsolation from "../../images/icon-reward-consolation.svg";

export default function QuizResult({
  correctAnswersChecked,
  setShowCorrectAnswers,
  category,
  time,
}) {
  const navigate = useNavigate();
  const user = localStorage
    .getItem("user")
    .substring(1, localStorage.getItem("user").length - 1);

  const numberOfCorrectAnswers = correctAnswersChecked.length;
  const percentage = numberOfCorrectAnswers * 10 + "%";

  const score =
    numberOfCorrectAnswers === 10
      ? Math.floor(
          (numberOfCorrectAnswers * 100) / time + numberOfCorrectAnswers * 10
        ) + 100
      : Math.floor(
          (numberOfCorrectAnswers * 100) / time + numberOfCorrectAnswers * 10
        );

  const currentDate = new Date();
  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1;
  const year = currentDate.getFullYear();
  const dateForSort = currentDate.getTime();

  let prizeIcon;
  let prizeHeading;

  if (score > 200 && numberOfCorrectAnswers === 10) {
    prizeIcon = "icon-reward-3.svg";
    prizeHeading = `Wow you're the best, ${user}!`;
  } else if (score > 125) {
    prizeIcon = "icon-reward-2.svg";
    prizeHeading = `Good job, ${user}!`;
  } else if (score > 50) {
    prizeIcon = "icon-reward-1.svg";
    prizeHeading = `Not bad, practice makes perfect!`;
  } else {
    prizeIcon = "icon-reward-consolation.svg";
    prizeHeading = `You need more practice, ${user}!`;
  }
  const date = `${day}/${month}/${year.toString().slice(2, 4)}`;

  useEffect(() => {
    postResult(
      category,
      numberOfCorrectAnswers,
      time,
      score,
      date,
      prizeIcon,
      dateForSort
    );
  }, []);

  return (
    <>
      <h3>{prizeHeading}</h3>
      <div className="el_container">
        <ResultElement icon={iconDone} title={percentage} text="CORRECT" />
        <ResultElement icon={iconTime} title={time} text="SECONDS" />
        <ResultElement icon={iconScores} title={score} text="SCORE" />
        <div className="prize_element">
          <img
            className="el_icon"
            alt="prize"
            src={
              prizeIcon === "icon-reward-1.svg"
                ? iconReward1
                : prizeIcon === "icon-reward-2.svg"
                ? iconReward2
                : prizeIcon === "icon-reward-3.svg"
                ? iconReward3
                : prizeIcon === "icon-reward-consolation.svg"
                ? iconRewardConsolation
                : ""
            }
          />
          <h3 className="el_title">
            {score > 50 ? "Your prize" : "Take a break & come back"}
          </h3>
        </div>
      </div>
      <div className="el_container">
        <button
          className="secondary_btn"
          onClick={(e) => setShowCorrectAnswers(true)}
        >
          Show me correct answers
        </button>
        <button className="secondary_btn" onClick={() => navigate("/results")}>
          Go to results
        </button>
      </div>
    </>
  );
}
