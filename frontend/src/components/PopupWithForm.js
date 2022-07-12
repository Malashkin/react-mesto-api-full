import React, { useEffect } from "react";

const PopupWithForm = ({
  isOpen,
  onClose,
  name,
  title,
  children,
  onSubmit,
  buttonText,
}) => {
  useEffect(() => {
    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscClose);
    }
    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [isOpen, onClose]);

  return (
    <div
      id={`popup_${name}`}
      className={`popup ${isOpen && "popup_type_opened"}`}
    >
      <div className="popup__content">
        <button
          onClick={onClose}
          className="popup__close"
          type="button"
        ></button>
        <form
          onSubmit={onSubmit}
          className={`popup__form popup__form_type_${name}`}
          name="formEdit"
        >
          <h2 className="popup__title">{title}</h2>
          {children}
          <button type="submit" className="popup__button">
            {buttonText}
          </button>
        </form>
      </div>
      <div onClick={onClose} className="popup__overlay" />
    </div>
  );
};

export default PopupWithForm;
