import React, { useEffect, useRef, useState } from "react";

const EditableText = ({
  textTagName,
  textClassName,
  inputClassName,
  text,
  placeholder,
  handleTextChange,
  ...props
}) => {
  const [isEditing, setIsEditing] = useState(false);

  const inputRef = useRef();

  useEffect(() => {
    if (inputRef && inputRef.current && isEditing) {
      inputRef.current.focus();
    }
  }, [isEditing, inputRef]);

  const handleKeyDown = (event) => {
    const { key } = event;
    const keys = ["Escape", "Tab", "Enter"];

    if (keys.indexOf(key) > -1) {
      setIsEditing(false);
    }
  };

  const createText = () => {
    const className = textClassName || "text__content";

    const element = React.createElement(
      textTagName || "span",
      { className: `${className} ${text ? "" : className + "--empty"}` },
      text || placeholder || "Click here to edit text"
    );

    return element;
  };

  return (
    <section {...props}>
      {isEditing ? (
        <div
          onBlur={() => setIsEditing(false)}
          onKeyDown={(event) => handleKeyDown(event)}
        >
          <input
            className={inputClassName || "text__input"}
            ref={inputRef}
            type="text"
            placeholder={placeholder}
            value={text || ""}
            onChange={handleTextChange}
          />
        </div>
      ) : (
        <div onClick={() => setIsEditing(true)}>{createText()}</div>
      )}
    </section>
  );
};

export default EditableText;
