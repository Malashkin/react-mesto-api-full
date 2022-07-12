import React, { useRef, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

const EditAvatarPopup = ({ isOpen, onClose, onUpdateAvatar, buttonText }) => {
  const avatarRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  useEffect(() => {
    avatarRef.current.value = "";
  }, [isOpen]);

  return (
    <PopupWithForm
      isOpen={isOpen}
      name="avatar"
      title="Обновить аватар"
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText={buttonText}
    >
      <input
        id="input-avatar"
        className="popup__input popup__input_avatar"
        type="url"
        placeholder="Ссылка на аватар"
        name="avatar"
        ref={avatarRef}
        required
      />
      <span className="popup__span input-avatar-error"> </span>
    </PopupWithForm>
  );
};

export default EditAvatarPopup;
