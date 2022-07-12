import React from "react";

const InfoTooltip = ({ popupText, popupIconImg, onClose, isOpen }) => {
  return (
    <div className={`popup ${isOpen && "popup_type_opened"}`}>
      <div className="popup__content">
        <button
          onClick={onClose}
          className="popup__close"
          type="button"
        ></button>
        <div className="popup__form">
          <img
            className="popup__icon"
            src={popupIconImg}
            alt="Статус запроса:"
          />
          <p className="popup__text">{popupText}</p>
        </div>
      </div>
      <div onClick={onClose} className="popup__overlay" />
    </div>
  );
};

export default InfoTooltip;
