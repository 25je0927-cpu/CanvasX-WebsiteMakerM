import React from "react";
import "./PublicationsBlock.css";

export default function PublicationsBlock({ content, onChange }) {
  return (
    <div className="block-publications">
      <h3
        contentEditable
        suppressContentEditableWarning
        onBlur={(e) => onChange({ title: e.target.innerText })}
        className="publication-title"
      >
        {content.title || "Publication Title"}
      </h3>

      <p
        contentEditable
        suppressContentEditableWarning
        onBlur={(e) => onChange({ description: e.target.innerText })}
        className="publication-description"
      >
        {content.description || "Publication description"}
      </p>
    </div>
  );
}
