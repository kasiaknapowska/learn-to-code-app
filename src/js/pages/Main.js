import NavElement from "../components/NavElement";
import Protip from "../components/Protip";

import logo from "../../images/logo.svg";
import iconQuiz from "../../images/icon-quiz.svg";
import iconResults from "../../images/icon-results.svg";
import iconNotes from "../../images/icon-notes.svg";

export default function Main() {
  const user = localStorage
    .getItem("user")
    .substring(1, localStorage.getItem("user").length - 1);
  return (
    <>
      <div className="bg_main">
        <main className="container">
          <img className="logo_main" src={logo} alt="logo" />
          <h2>Hi, {user}! What do you want to do?</h2>
          <div className="el_container">
            <NavElement
              navIcon={iconNotes}
              navTitle="notes"
              navigateTo="/notes"
            />
            <NavElement navIcon={iconQuiz} navTitle="quiz" navigateTo="/quiz" />
            <NavElement
              navIcon={iconResults}
              navTitle="results"
              navigateTo="/results"
            />
          </div>
        </main>
        <Protip />
      </div>
    </>
  );
}
