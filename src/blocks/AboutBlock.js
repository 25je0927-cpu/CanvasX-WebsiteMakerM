import React from "react";
import "./AboutBlock.css";

export default function AboutBlock({ content, onChange }) {
  return (
    <div className="block-about">
      <p
        contentEditable
        suppressContentEditableWarning
        onBlur={(e) => onChange({ text: e.target.innerText })}
        className="about-text"
      >
        {content.text || "Write about yourself..."}
      </p>
    </div>
  );
}
