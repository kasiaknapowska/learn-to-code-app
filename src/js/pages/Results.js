import React, { useState, useEffect } from "react";
import BackButton from "../components/BackButton";

import { availableCategories } from "../quizAPI/fetch";
import { getResults } from "../lib/func-firebase";

import iconResults from "../../images/icon-results.svg";
import iconReward1 from "../../images/icon-reward-1.svg";
import iconReward2 from "../../images/icon-reward-2.svg";
import iconReward3 from "../../images/icon-reward-3.svg";
import iconRewardConsolation from "../../images/icon-reward-consolation.svg";

export default function Results() {
  const [results, setResults] = useState([]);

  useEffect(() => {
    console.log("1");
    availableCategories.map((category) => {
      getResults(category, (response) => {
        const resultsFromFirebase = response.docs.map((doc) => ({
          id: doc.id,
          category: doc.data().category,
          date: doc.data().date,
          correct: doc.data().correct,
          score: doc.data().score,
          time: doc.data().time,
          prize: doc.data().prize,
          dateForSort: doc.data().dateForSort,
        }));
        setResults((prevState) => [...prevState, resultsFromFirebase]);
      });
    });
  }, []);

  useEffect(() => {
    results.map((el) => el.sort((a, b) => b.dateForSort - a.dateForSort));
  }, [results]);

  console.log(results);

  return (
    <>
      <BackButton />
      <main className="container">
        <img className="page_icon" alt="results" src={iconResults} />
        <h1>Results</h1>
        <div className="tables_container">
          {results.map((res, index) => {
            return (
              <div key={index} className="table_container">
                <div className="table_header_container">
                  <h2>{res.map((el) => el.category)[0]}</h2>
                  <div>
                    <div className="table_info table_best">
                      Best score{" "}
                      <span>
                        {res.map((el) => el.score).sort((a, b) => b - a)[0]}
                      </span>
                    </div>
                    <div className="table_info table_total">
                      Total{" "}
                      <span>
                        {res
                          .map((el) => el.score)
                          .reduce((total, item) => total + item)}
                      </span>
                    </div>
                  </div>
                </div>
                <table>
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Correct</th>
                      <th>Time</th>
                      <th>Score</th>
                      <th>Prize</th>
                    </tr>
                  </thead>
                  <tbody>
                    {res.map((el, index) => {
                      return (
                        <tr key={index}>
                          <td>{el.date}</td>
                          <td>{el.correct}</td>
                          <td>{el.time}s</td>
                          <td>{el.score}</td>
                          <td>
                            <div className="table_icon_container">
                              <img
                                className="table_icon"
                                alt="prize"
                                src={
                                  el.prize === "icon-reward-1.svg"
                                    ? iconReward1
                                    : el.prize === "icon-reward-2.svg"
                                    ? iconReward2
                                    : el.prize === "icon-reward-3.svg"
                                    ? iconReward3
                                    : el.prize === "icon-reward-consolation.svg"
                                    ? iconRewardConsolation
                                    : ""
                                }
                              />
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            );
          })}
        </div>
      </main>
    </>
  );
}
