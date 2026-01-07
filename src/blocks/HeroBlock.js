import React from "react";
import "./HeroBlock.css";

export default function HeroBlock({ content, onChange }) {
  return (
    <div className="block-hero">
      <h1
        contentEditable
        suppressContentEditableWarning
        onBlur={(e) => onChange({ title: e.target.innerText })}
        className="hero-title"
      >
        {content.title || "Hero Title"}
      </h1>

      <p
        contentEditable
        suppressContentEditableWarning
        onBlur={(e) => onChange({ subtitle: e.target.innerText })}
        className="hero-subtitle"
      >
        {content.subtitle || "Hero subtitle text"}
      </p>

      <button>
        {content.buttonText || "Get Started"}
      </button>
    </div>
  );
}
