import React, { useContext, useState, useEffect } from "react";
import CurrentUserContext from "./../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

const EditProfilePopup = ({ isOpen, onClose, onUpdateUser, buttonText }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const currentUser = useContext(CurrentUserContext);

  const handelChangeName = (e) => {
    setName(e.target.value);
  };

  const handelChangeDescription = (e) => {
    setDescription(e.target.value);
  };

  const handelSubmit = (e) => {
    e.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  };

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handelSubmit}
      name="popup_edit"
      title="Редактировать профиль"
      buttonText={buttonText}
    >
      <input
        id="input-name"
        className="popup__input popup__input_name"
        type="text"
        value={name || ""}
        placeholder="Имя"
        name="name"
        required
        minLength="2"
        maxLength="40"
        onChange={handelChangeName}
      />
      <span className="popup__span input-name-error"></span>
      <input
        id="input-job"
        className="popup__input popup__input_job"
        type="text"
        placeholder="О себе"
        value={description || ""}
        name="description"
        required
        minLength="2"
        maxLength="200"
        onChange={handelChangeDescription}
      />
      <span className="popup__span input-job-error"></span>
    </PopupWithForm>
  );
};

export default EditProfilePopup;
