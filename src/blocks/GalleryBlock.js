import React from "react";
import "./GalleryBlock.css";

export default function GalleryBlock({ content, onChange }) {
  const images = content.images || [];

  const addImage = () => {
    onChange({ images: [...images, ""] }); // add empty slot
  };

  const updateImage = (index, url) => {
    const newImages = [...images];
    newImages[index] = url;
    onChange({ images: newImages });
  };

  return (
    <div className="block-gallery">
     

      {/* Render all images */}
      <div className="gallery-row">
        {images.map((url, i) => (
          <div key={i} className="gallery-item">
            <img
              src={url || "https://via.placeholder.com/150"}
              alt={`Gallery ${i}`}
              className="gallery-image"
            />
            <input
              type="text"
              placeholder="Paste image URL"
              value={url}
              onChange={(e) => updateImage(i, e.target.value)}
              className="gallery-url-input"
            />
          </div>
        ))}
      </div>

      {/* Add Image button */}
      <button onClick={addImage} className="btn btn-secondary mt-2">
        + Add Image
      </button>

      {/* Editable caption */}
      <p
        contentEditable
        suppressContentEditableWarning
        onBlur={(e) => onChange({ caption: e.target.innerText })}
        className="gallery-caption"
      >
        {content.caption || "Gallery caption"}
      </p>
    </div>
  );
}
