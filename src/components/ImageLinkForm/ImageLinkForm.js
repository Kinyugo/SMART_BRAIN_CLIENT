import React from "react";
import "./ImageLinkForm.css";

const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
  return (
    <div>
      <p className="f3">
        {"This Magic Brain will detect faces in your pictures. Give it a Try"}
      </p>
      <form className="form">
        <input
          type="text"
          className="form__field"
          placeholder="Your Image Link here"
          name="Image"
          onChange={onInputChange}
        />
        <button
          type="button"
          className="btn btn--primary btn--inside uppercase"
          onClick={onButtonSubmit}
        >
          Detect
        </button>
      </form>
    </div>
  );
};

export default ImageLinkForm;
