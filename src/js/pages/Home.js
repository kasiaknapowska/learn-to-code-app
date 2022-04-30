import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../images/logo.svg";
import Alert from "../components/Alert";

export default function Home() {
  const navigate = useNavigate();
  const [alert, setAlert] = useState("");
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || ""
  );

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  const logIn = (e) => {
    e.preventDefault();
    if (user) {
      console.log(localStorage.getItem("user"));
      navigate("/main");
    } else {
      setAlert("Type your name");
    }
  };

  return (
    <>
      <div className="bg center">
        <main className="container">
          <img className="logo_home" src={logo} alt="logo" />
          <form onSubmit={logIn}>
            <input
              type="text"
              name="user"
              placeholder={user || "Your name"}
              onChange={(e) => setUser(e.target.value)}
            />
            <button type="submit" className="home_btn">
              Zaczynamy
              {alert && <Alert text={alert} iconDirection="0" />}
            </button>
          </form>
        </main>
      </div>
    </>
  );
}
