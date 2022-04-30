import React, { useEffect } from "react";

export default function Timer({ time, setTime, isRunning }) {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  useEffect(() => {
    let intervalId;
    if (isRunning) {
      intervalId = setInterval(() => {
        setTime((prevState) => prevState + 1);
      }, 1000);
    }
    return () => {
      clearInterval(intervalId);
    };
  }, [isRunning]);

  return (
    <div className="timer">
      <span className="minutes">{minutes < 10 ? "0" + minutes : minutes}</span>:
      <span className="seconds">{seconds < 10 ? "0" + seconds : seconds}</span>
    </div>
  );
}
