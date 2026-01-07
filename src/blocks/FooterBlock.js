import React from "react";
import "./FooterBlock.css";

export default function FooterBlock({ content, onChange }) {
  return (
    <div className="block-footer">
      <p
        contentEditable
        suppressContentEditableWarning
        onBlur={(e) => onChange({ text: e.target.innerText })}
        className="footer-text"
      >
        {content.text || "Footer text here"}
      </p>
    </div>
  );
}
