import React from "react";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./index.css";

export default function NoResult({ text = "No result" }) {
  return (
    <div className="no-result">
      <FontAwesomeIcon className="icon" icon={faExclamationTriangle} />
      <p className="text">{text}</p>
    </div>
  );
}
