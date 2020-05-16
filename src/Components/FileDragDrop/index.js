import React from "react";
import "./FileDragDrop.scss";

export default function FileDragDrop({ handleDrop, loadingCallback }) {
  const readFile = file => {
    const reader = new FileReader();
    const textFile = /text.*/;

    if (file.type.match(textFile)) {
      reader.onload = function(event) {
        handleDrop({
          contents: event.target.result,
          error: false
        });
        loadingCallback && loadingCallback(false);
      };
    } else {
      handleDrop({
        contents: null,
        error: true
      });
      loadingCallback && loadingCallback(false);
    }
    reader.readAsText(file);
  };

  const onFile = e => {
    const file = e.currentTarget.files[0];
    if (!file) return;

    loadingCallback && loadingCallback(true);
    // Fake api call timing to show a loader. Delay: 2s
    setTimeout(() => {
      readFile(file);
    }, 2000);
  };

  const handleDragEnter = e => {
    e.target.parentNode.classList.add("dragging");
  };

  const handleDragLeave = e => {
    e.target.parentNode.classList.remove("dragging");
  };

  const handleFileDrop = e => {
    e.target.parentNode.classList.remove("dragging");
    onFile(e);
  };

  const handleChangeFile = e => {
    onFile(e);
  };

  return (
    <div className="drop-area">
      <input
        type="file"
        id="upload"
        onChange={handleChangeFile}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDrop={handleFileDrop}
      />
      <div className="upload-placeholder">
        <p>Drag and Drop the file</p>
        <p>OR</p>
        <p>Click to upload file</p>
      </div>
    </div>
  );
}
