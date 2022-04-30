import React, { useState, useEffect } from "react";
import BackButton from "../components/BackButton";

import { getResults } from "../lib/func-firebase";

import iconResults from "../../images/icon-results.svg";
import iconReward1 from "../../images/icon-reward-1.svg";
import iconReward2 from "../../images/icon-reward-2.svg";
import iconReward3 from "../../images/icon-reward-3.svg";
import iconRewardConsolation from "../../images/icon-reward-consolation.svg";

export default function Results() {
  const [bashResults, setBashResults] = useState([]);
  const [devOpsResults, setDevOpsResults] = useState([]);
  const [htmlResults, setHtmlResults] = useState([]);
  const [javaScriptResults, setJavaScriptResults] = useState([]);
  const [dockerResults, setDockerResults] = useState([]);
  const [mySqlResults, setMySqlResults] = useState([]);
  const [phpResults, setPhpResults] = useState([]);
  const [wordPressResults, setWordPressResults] = useState([]);

  const [results, setResults] = useState([]);

  const templateResult = (response, successCallback) => {
    const res = response.docs.map((doc) => {
      return {
        id: doc.id,
        category: doc.data().category,
        date: doc.data().date,
        correct: doc.data().correct,
        score: doc.data().score,
        time: doc.data().time,
        prize: doc.data().prize,
        dateForSort: doc.data().dateForSort,
      };
    });
    successCallback(res);
  };

  useEffect(() => {
    getResults("BASH", (response) => {
      templateResult(response, setBashResults);
    });
  }, []);

  useEffect(() => {
    getResults("DevOps", (response) => {
      templateResult(response, setDevOpsResults);
    });
  }, []);

  useEffect(() => {
    getResults("HTML", (response) => {
      templateResult(response, setHtmlResults);
    });
  }, []);

  useEffect(() => {
    getResults("JavaScript", (response) => {
      templateResult(response, setJavaScriptResults);
    });
  }, []);

  useEffect(() => {
    getResults("Docker", (response) => {
      templateResult(response, setDockerResults);
    });
  }, []);

  useEffect(() => {
    getResults("MySQL", (response) => {
      templateResult(response, setMySqlResults);
    });
  }, []);

  useEffect(() => {
    getResults("PHP", (response) => {
      templateResult(response, setPhpResults);
    });
  }, []);

  useEffect(() => {
    getResults("WordPress", (response) => {
      templateResult(response, setWordPressResults);
    });
  }, []);

  useEffect(() => {
    setResults([
      [...bashResults],
      [...devOpsResults],
      [...htmlResults],
      [...javaScriptResults],
      [...dockerResults],
      [...mySqlResults],
      [...phpResults],
      [...wordPressResults],
    ]);
  }, [
    bashResults,
    devOpsResults,
    htmlResults,
    javaScriptResults,
    dockerResults,
    mySqlResults,
    phpResults,
    wordPressResults,
  ]);

  // useEffect(() => {
  //   console.log(results);
  // }, [results]);

  return (
    <>
      <BackButton />
      <main className="container">
        <img className="page_icon" alt="results" src={iconResults} />
        <h1>Results</h1>
        <div className="tables_container">
          {results &&
            results
              .map((el) => el.sort((a, b) => b.dateForSort - a.dateForSort))
              .map((res, index) => {
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
                            {res.length > 0 &&
                              res
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
                                        : el.prize ===
                                          "icon-reward-consolation.svg"
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
