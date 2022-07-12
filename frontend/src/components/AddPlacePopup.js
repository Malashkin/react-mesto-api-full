import React, { useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm";

const AddPlacePopup = ({ isOpen, onClose, onAddPlace, buttonText }) => {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");

  const handelChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const handelChangeLink = (e) => {
    setLink(e.target.value);
  };

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name: title,
      link,
    });
  }

  useEffect(() => {
    setTitle("");
    setLink("");
  }, [isOpen]);

  return (
    <PopupWithForm
      name="add"
      title="Новое место"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText={buttonText}
    >
      <input
        id="input-title"
        className="popup__input popup__input_title"
        type="text"
        placeholder="Название"
        name="title"
        onChange={handelChangeTitle}
        value={title || ""}
        minLength="2"
        maxLength="30"
        required
      />
      <span className="popup__span input-title-error"> </span>
      <input
        id="input-url"
        className="popup__input popup__input_image"
        type="url"
        placeholder="Ссылка на картинку"
        name="link"
        onChange={handelChangeLink}
        value={link || ""}
        required
      />
      <span className="popup__span input-url-error"></span>
    </PopupWithForm>
  );
};

export default AddPlacePopup;
