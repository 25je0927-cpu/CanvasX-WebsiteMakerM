// src/components/PreviewPage.js
import React from "react";
import "../App.css"; // keeps your existing block styles

export default function PreviewPage({ blocks }) {
  const renderBlock = (b) => {
    switch (b.type) {
      case "hero":
        return (
          <section className="block block-hero">
            <h1>{b.content?.title || "Hero Title"}</h1>
            <p>{b.content?.subtitle || "Subtitle goes here"}</p>
            {b.content?.cta && <button>{b.content.cta}</button>}
          </section>
        );

      case "about":
        return (
          <section className="block block-about">
            {b.content?.title && <h2>{b.content.title}</h2>}
            <p>{b.content?.text || "About text..."}</p>
          </section>
        );

      case "gallery":
        return (
          <section className="block block-gallery">
            <div className="gallery-row">
              {(b.content?.images || []).map((url, i) => (
                <div className="gallery-item" key={i}>
                  <img className="gallery-image" src={url} alt="Gallery" />
                </div>
              ))}
            </div>
          </section>
        );

      case "publications":
        return (
          <section className="block block-publications">
            {b.content?.title && <h2>{b.content.title}</h2>}
            {Array.isArray(b.content?.items) ? (
              <ul>
                {b.content.items.map((it, i) => (
                  <li key={i}>{it}</li>
                ))}
              </ul>
            ) : (
              <p>{b.content?.description || "Publication description..."}</p>
            )}
          </section>
        );

      case "contact":
        return (
          <section className="block block-contact">
            <h3>Contact Information</h3>
            <br />
            <h5>Email</h5>
            {b.content?.email && <input value={b.content.email} readOnly />}
            <h5>Phone</h5>
            {b.content?.phone && <input value={b.content.phone} readOnly />}
            <h5>Message</h5>
            {b.content?.message && (
              <textarea readOnly>{b.content.message}</textarea>
            )}
            {b.content?.button && <button>{b.content.button}</button>}
          </section>
        );

      case "footer":
        return (
          <footer className="block block-footer">
            <p>{b.content?.text || "Footer text..."}</p>
          </footer>
        );

      default:
        return null;
    }
  };

  return (
    <div
      className="preview-canvas"
      style={{
        position: "relative",
        width: "100%",
        minHeight: "100vh",
        background: "#ffffff",
      }}
    >
      {blocks.map((b) => (
        <div
          key={b.id}
          className="preview-item"
          style={{
            position: "absolute",
            transform: `translate(${b.x}px, ${b.y}px)`,
            width: b.width,
            height: b.height,
            boxSizing: "border-box",
          }}
        >
          {renderBlock(b)}
        </div>
      ))}
    </div>
  );
}
