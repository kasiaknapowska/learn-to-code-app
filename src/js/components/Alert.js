// import React from "react";
import alertArrow from "../../images/alert-arrow.svg";

export default function Alert({ text, iconDirection, additionalClass }) {
  return (
    <div className={`alert ${additionalClass}`}>
      {text}{" "}
      <img
        className="alert_icon"
        alt="alert"
        src={alertArrow}
        style={{ transform: `rotate(${iconDirection})` }}
      />
    </div>
  );
}
