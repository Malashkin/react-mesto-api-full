import React from "react";
import PopupWithForm from "./PopupWithForm";

const DeletePopup = ({ isOpen, onClose, onSubmit, buttonText }) => {
  return (
    <PopupWithForm
      name="delete"
      title="Вы уверены?"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={onSubmit}
      buttonText={buttonText}
    ></PopupWithForm>
  );
};

export default DeletePopup;
