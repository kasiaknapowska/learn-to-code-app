import React from "react";

export default function ResultElement({ icon, title, text }) {
  return (
    <div className="result_element">
      <img className="el_icon" alt="result" src={icon} />
      <h3 className="el_title">{title}</h3>
      <strong>{text}</strong>
    </div>
  );
}
