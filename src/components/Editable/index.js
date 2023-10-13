import React, { useState } from "react";

import { Plus, X } from "react-feather";

import "./index.css";

function Editable({ onSubmit, editClass, placeholder, text, displayClass }) {
  const [isEditable, setIsEditable] = useState(false);
  const [inputText, setInputText] = useState("");
  const submission = (e) => {
    e.preventDefault();
    if (inputText && onSubmit) {
      setInputText("");
      onSubmit(inputText);
    }
    setIsEditable(false);
  };

  return (
    <div className="editable">
      {isEditable ? (
        <form
          className={`editable_edit ${editClass ? editClass : ""}`}
          onSubmit={submission}
        >
          <input
            type="text"
            value={inputText}
            placeholder={placeholder || text}
            onChange={(event) => setInputText(event.target.value)}
            autoFocus
          />
          <div className="editable_edit_footer">
            <button type="submit">
              <Plus size={"16px"} /> Add
            </button>
            <X onClick={() => setIsEditable(false)} className="closeIcon" />
          </div>
        </form>
      ) : (
        <p
          className={`editable_display ${displayClass ? displayClass : ""}`}
          onClick={() => setIsEditable(true)}
        >
          <Plus className="plus" size={"16px"} /> {text}
        </p>
      )}
    </div>
  );
}

export default Editable;
