import React, { useState } from "react";
import { Plus, X } from "react-feather";
import "./index.css";

function Editable({ onSubmit, editClass, placeholder, text, displayClass, defaultValue }) {
  const [isEditable, setIsEditable] = useState(false);
  const [inputText, setInputText] = useState(defaultValue || "");
  
  const submission = (e) => {
    e.preventDefault(); // Prevent form submission
    if (inputText && onSubmit) {
      setInputText("");
      onSubmit(inputText);
    }
    setIsEditable(false);
  };

  return (
    <div className="editable">
      {isEditable ? (
        <div className={`editable_edit ${editClass ? editClass : ""}`}>
          <input
            type="text"
            value={inputText}
            placeholder={placeholder || text}
            onChange={(event) => setInputText(event.target.value)}
            autoFocus
          />
          <div className="editable_edit_footer">
            <button type="button" onClick={(e)=>submission(e)}> {/* Use button type="button" */}
              <Plus size={"16px"} /> Add
            </button>
            <X onClick={() => setIsEditable(false)} className="closeIcon" />
          </div>
        </div>
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
