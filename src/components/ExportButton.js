
import "../App.css";
import "../blocks/AboutBlock.css";
import "../blocks/ContactBlock.css";
import "../blocks/FooterBlock.css";
import "../blocks/GalleryBlock.css";
import "../blocks/HeroBlock.css";
import "../blocks/PublicationsBlock.css";
import React from "react";

export default function ExportButton({ blocks = [] }) {

  const exportProject = () => {
    // ✅ normalize once
    const normalizedBlocks = Array.isArray(blocks)
      ? blocks
      : Object.values(blocks || {});

    console.log("EXPORT BLOCKS:", normalizedBlocks);

    const blocksHTML = normalizedBlocks
      .map(
        (b) => `
        <div
          class="canvas-item"
          style="
            transform: translate(${b.x}px, ${b.y}px);
            width: ${b.width}px;
            height: ${b.height}px;
          "
        >
          ${renderBlockHTML(b)}
        </div>
      `
      )
      .join("");

    const css = `
     body {
  font-family: system-ui, sans-serif;
  margin: 0;
  background: #f3f4f6;
}

      .preview-canvas {
        position: relative;
        width: 1200px;
        min-height: 1600px;
        margin: 40px auto;
        background: white;
      }

      .canvas-item {
        position: absolute;
      }

      .block {
        width: 100%;
        height: 100%;
        box-sizing: border-box;
      }

      /* HERO */
      .block-hero {
        background: #111827;
        color: #fff;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 40px;
        border-radius: 8px;
      }

      /* ABOUT */
      .block-about {
        background: #f3f4f6;
        padding: 20px;
        border-radius: 8px;
      }

      /* CONTACT */
      .block-contact {
  background: #f3f4f6;
  padding: 20px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  font-family: inherit;
}
.block-contact input,
.block-contact textarea {
  padding: 8px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 1rem;
  font-family: inherit;
}

.block-contact button {
  background: #10b981;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-family: inherit;
}

.block-contact h3 {
  font-size: 1.25rem;
  margin-bottom: 12px;
  color: #111827;
}

.contact-field {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 12px;
}

.contact-field h5 {
  font-size: 0.95rem;
  font-weight: 600;
  color: #374151;
  margin: 0;
}

.contact-field p {
  font-size: 1rem;
  color: #111827;
  margin: 0;
}


      /* GALLERY */
      .gallery-row {
        display: flex;
        gap: 12px;
        overflow-x: auto;
      }

      .gallery-image {
        width: 200px;
        height: 150px;
        object-fit: cover;
        border-radius: 6px;
      }

      /* PUBLICATIONS */
      .block-publications {
        background: #f9fafb;
        padding: 20px;
        border-radius: 8px;
      }

      .block-publications h3 {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 10px;
  color: #111827;
}

.block-publications p {
  font-size: 0.95rem;
  line-height: 1.6;
  color: #374151;
}


      /* FOOTER */
      .block-footer {
        background: #111827;
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
      }

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

/* PAGE BACKGROUND */
body {
  background: #ffffff;
  margin: 0;
  padding: 0;
  font-family: Arial, sans-serif;
}

.canvas {
  width: 1200px;
  max-width: 100%;
  margin: 0 auto;
  background: #ffffff;
  padding: 40px;
  min-height: 100vh;
}


/* SECTIONS */
section, footer {
  margin-bottom: 40px;
}

/* BLOCK STYLES */
.hero h1 {
  font-size: 36px;
  margin-bottom: 12px;
}

.hero p {
  font-size: 18px;
  color: #555;
}

.about p,
.publications p,
.contact p,
.footer p {
  font-size: 16px;
  line-height: 1.6;
}

/* GALLERY */
.gallery img {
  max-width: 100%;
  display: block;
  margin-bottom: 12px;
}

.gallery-caption {
  font-style: italic;
  color: #666;
}

/* FOOTER */
.footer {
  border-top: 1px solid #ddd;
  padding-top: 20px;
  text-align: center;
}


    `;

    const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <title>CanvasX Export</title>
  <style>${css}
  body {
    margin: 0;
    font-family: system-ui, -apple-system, BlinkMacSystemFont,
      "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    background: #ffffff;
    color: #111827;
  }</style>
  
</head>
<body>
  <div class="canvas">
    ${blocksHTML}
  </div>
</body>

</html>
`;

    const blob = new Blob([html], { type: "text/html" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "canvasx-export.html";
    link.click();
  };

  return (
    <button onClick={exportProject} className="btn btn-primary">
      Export Project
    </button>
  );
}

/* ---------- helpers ---------- */

function renderBlockHTML(b) {
  switch (b.type) {
    case "hero":
      return `
        <section class="block block-hero">
          <h1>${b.content?.title || "Title"}</h1>
          <p>${b.content?.subtitle || ""}</p>
        </section>
      `;

    case "about":
      return `
        <section class="block block-about">
          <p>${b.content?.text || ""}</p>
        </section>
      `;

    case "gallery":
      return `
        <section class="block block-gallery">
          <div class="gallery-row">
            ${(b.content?.images || [])
          .map((url) => `<img class="gallery-image" src="${url}" />`)
          .join("")}
          </div>
        </section>
      `;

    case "publications":
      return `
    <section class="block block-publications">
      ${b.content?.title ? `<h3>${b.content.title}</h3>` : ""}
      ${b.content?.description ? `<p>${b.content.description}</p>` : ""}
    </section>
  `;


  case "contact":
  return `
    <section class="block block-contact">
      <h3>Contact Information</h3>

      ${b.content?.email ? `
        <div class="contact-field">
          <h5>Email</h5>
          <p>${b.content.email}</p>
        </div>` : ""}

      ${b.content?.phone ? `
        <div class="contact-field">
          <h5>Phone</h5>
          <p>${b.content.phone}</p>
        </div>` : ""}

      ${b.content?.message ? `
        <div class="contact-field">
          <h5>Message</h5>
          <p>${b.content.message}</p>
        </div>` : ""}
    </section>
  `;


    case "footer":
      return `
        <footer class="block block-footer">
          <p>${b.content?.text || ""}</p>
        </footer>
      `;

    default:
      return "";
  }
}
