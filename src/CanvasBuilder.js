// src/CanvasBuilder.js
import React, { useEffect, useRef, useState } from "react";
import interact from "interactjs";
import { useParams } from "react-router-dom";
import { auth, db } from "./components/firebase";
import { ref, set, get } from "firebase/database";
import "./App.css";

import HeroBlock from "./blocks/HeroBlock";
import AboutBlock from "./blocks/AboutBlock";
import GalleryBlock from "./blocks/GalleryBlock";
import PublicationsBlock from "./blocks/PublicationsBlock";
import ContactBlock from "./blocks/ContactBlock";
import FooterBlock from "./blocks/FooterBlock";
import PreviewPage from "./components/PreviewPage";
import ExportButton from "./components/ExportButton";





// Create block with content + onChange
function createBlock(type, content, onChange) {
  switch (type) {
    case "hero":
      return <HeroBlock content={content} onChange={onChange} />;
    case "about":
      return <AboutBlock content={content} onChange={onChange} />;
    case "gallery":
      return <GalleryBlock content={content} onChange={onChange} />;
    case "publications":
      return <PublicationsBlock content={content} onChange={onChange} />;
    case "contact":
      return <ContactBlock content={content} onChange={onChange} />;
    case "footer":
      return <FooterBlock content={content} onChange={onChange} />;
    default:
      return null;
  }
}

function CanvasItem({ block, selectedId, setSelectedId, updateBlock }) {
  const itemRef = useRef(null);

  useEffect(() => {
    const el = itemRef.current;
    if (!el) return;

    // initialize DOM position
    el.style.transform = `translate(${block.x}px, ${block.y}px)`;
    el.setAttribute("data-x", block.x);
    el.setAttribute("data-y", block.y);

    interact(el)
      .draggable({
        listeners: {
          move(event) {
            let x = (parseFloat(el.getAttribute("data-x")) || 0) + event.dx;
            let y = (parseFloat(el.getAttribute("data-y")) || 0) + event.dy;

            el.style.transform = `translate(${x}px, ${y}px)`;
            el.setAttribute("data-x", x);
            el.setAttribute("data-y", y);
          },
          end() {
            updateBlock(block.id, {
              x: parseFloat(el.getAttribute("data-x")),
              y: parseFloat(el.getAttribute("data-y")),
            });
          },
        },
      })
      .resizable({
        edges: { left: true, right: true, top: true, bottom: true },
        listeners: {
          move(event) {
            let x = parseFloat(el.getAttribute("data-x")) || 0;
            let y = parseFloat(el.getAttribute("data-y")) || 0;

            el.style.width = event.rect.width + "px";
            el.style.height = event.rect.height + "px";

            x += event.deltaRect.left;
            y += event.deltaRect.top;

            el.style.transform = `translate(${x}px, ${y}px)`;
            el.setAttribute("data-x", x);
            el.setAttribute("data-y", y);
          },
          end(event) {
            updateBlock(block.id, {
              width: event.rect.width,
              height: event.rect.height,
              x: parseFloat(el.getAttribute("data-x")),
              y: parseFloat(el.getAttribute("data-y")),
            });
          },
        },
      });

    return () => interact(el).unset();
  }, []); // ✅ IMPORTANT

  return (
    <div
      ref={itemRef}
      className={`canvas-item ${selectedId === block.id ? "selected" : ""}`}
      style={{
        width: block.width,
        height: block.height,
      }}
      onMouseDown={(e) => {
        e.stopPropagation();
        setSelectedId(block.id);
      }}
    >
      {createBlock(
        block.type,
        block.content || {},
        (updates) =>
          updateBlock(block.id, {
            content: { ...block.content, ...updates },
          })
      )}
    </div>
  );
}


export default function CanvasBuilder() {
  const { projectId } = useParams();
  const dropzoneRef = useRef(null);
  const [blocks, setBlocks] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  // 👇 new state for preview toggle
  const [showPreview, setShowPreview] = useState(false);

  // Load saved blocks
  useEffect(() => {
    const user = auth.currentUser;
    if (!user || !projectId) return;

    const fetchBlocks = async () => {
      const snapshot = await get(ref(db, `Users/${user.uid}/projects/${projectId}`));
      if (snapshot.exists()) {
        const data = snapshot.val();
        setBlocks(data.blocks || []);
      }
    };

    fetchBlocks();
  }, [projectId]);

  // Save blocks whenever they change
  useEffect(() => {
    const user = auth.currentUser;
    if (!user || !projectId) return;

    set(ref(db, `Users/${user.uid}/projects/${projectId}`), {
      blocks,
      updatedAt: new Date().toISOString(),
    });
  }, [blocks, projectId]);

  // Toolbox + dropzone
  useEffect(() => {
    interact(".tool-item").draggable({
      listeners: {

        start(event) {
          // 🔑 reset drop flag for this drag session
          event.interaction.dropHandled = false;
        },


        move(event) {
          const t = event.target;
          let x = (parseFloat(t.getAttribute("data-x")) || 0) + event.dx;
          let y = (parseFloat(t.getAttribute("data-y")) || 0) + event.dy;
          t.style.transform = `translate(${x}px, ${y}px)`;
          t.setAttribute("data-x", x);
          t.setAttribute("data-y", y);
        },
        end(event) {
          event.target.style.transform = "translate(0,0)";
          event.target.removeAttribute("data-x");
          event.target.removeAttribute("data-y");
        },
      },
    });

    interact(dropzoneRef.current).dropzone({
      accept: ".tool-item",
      overlap: 0.5,
      ondrop(event) {

        if (event.interaction.dropHandled) return;
        event.interaction.dropHandled = true;


        const source = event.relatedTarget;
        if (!source.closest(".toolbox")) return;

        const dzRect = dropzoneRef.current.getBoundingClientRect();
        const srcRect = source.getBoundingClientRect();

        const x = srcRect.left - dzRect.left;
        const y = srcRect.top - dzRect.top;

        setBlocks((prev) => [
          ...prev,
          {
            id: crypto.randomUUID(),

            type: source.dataset.type,
            x,
            y,
            width: 420,
            height: 160,
            content: {}, // initialize content
          },
        ]);
      },
    });
  }, []);

  // Delete selected block
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Delete" && selectedId) {
        setBlocks((prev) => prev.filter((b) => b.id !== selectedId));
        setSelectedId(null);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [selectedId]);

  // Export function
//   const exportProject = () => {
//     const blocksHTML = blocks
//       .map((b) => {
//         switch (b.type) {
//           case "hero":
//             return `<section class="hero"><h1>${b.content?.title || ""}</h1><p>${b.content?.subtitle || ""}</p></section>`;
//           case "about":
//             return `<section class="about"><p>${b.content?.text || ""}</p></section>`;
//           case "gallery":
//             return `<section class="gallery">
//               ${(b.content?.images || [])
//                 .map((url) => `<img src="${url}" alt="Gallery image"/>`)
//                 .join("")}
//               ${b.content?.caption ? `<p class="gallery-caption">${b.content.caption}</p>` : ""}
//             </section>`;
//           case "publications":
//             return `<section class="publications"><h3>${b.content?.title || ""}</h3><p>${b.content?.description || ""}</p></section>`;
//           case "contact":
//             return `<section class="contact"><p>${b.content?.email || ""}</p><p>${b.content?.phone || ""}</p></section>`;
//           case "footer":
//             return `<footer class="footer"><p>${b.content?.text || ""}</p></footer>`;
//           default:
//             return "";
//         }
//       })
//       .join("\n");

//     const css = `/* your CSS string here */`;

//     const html = `<!DOCTYPE html>
// <html>
// <head>
//   <meta charset="UTF-8">
//   <title>CanvasX Export</title>
//   <meta name="viewport" content="width=device-width, initial-scale=1">
//   <style>${css}</style>
// </head>
// <body>
// ${blocksHTML}
// </body>
// </html>`;

//     const blob = new Blob([html], { type: "text/html" });
//     const url = URL.createObjectURL(blob);
//     const link = document.createElement("a");
//     link.href = url;
//     link.download = "canvasx-project.html";
//     document.body.appendChild(link);
//     link.click();
//     link.remove();
//     URL.revokeObjectURL(url);
//   };

  return (
    <div className="builder">
      {/* Toolbox */}
      <div className="toolbox">
        <h2 className="toolbox-heading">LIBRARY</h2>
        <div className="tool-item" data-type="hero">Hero</div>
        <div className="tool-item" data-type="about">About</div>
        <div className="tool-item" data-type="gallery">Gallery</div>
        <div className="tool-item" data-type="publications">Publications</div>
        <div className="tool-item" data-type="contact">Contact</div>
        <div className="tool-item" data-type="footer">Footer</div>

        <ExportButton blocks={blocks} />


        {/* Preview toggle button */}
        <button onClick={() => setShowPreview(!showPreview)} className="btn btn-secondary" style={{ marginTop: 8 }}>
          {showPreview ? "Back to Editor" : "Preview"}
        </button>
      </div>

      {/* Canvas OR Preview */}
      {showPreview ? (
        <PreviewPage blocks={blocks} />
      ) : (
        <div ref={dropzoneRef} className="dropzone" onMouseDown={() => setSelectedId(null)}>
          {blocks.map((b) => (
            <CanvasItem
              key={b.id}
              block={b}
              selectedId={selectedId}
              setSelectedId={setSelectedId}
              updateBlock={(id, updates) =>
                setBlocks((prev) =>
                  prev.map((blk) => (blk.id === id ? { ...blk, ...updates } : blk))
                )
              }
            />
          ))}
        </div>
      )}
    </div>
  );
}
