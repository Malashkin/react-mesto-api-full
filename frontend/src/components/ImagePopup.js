import React from "react";

const ImagePopup = ({ card, onClose }) => {
  if (!card) {
    return null;
  }

  return (
    <div
      id="popup_zoom"
      className={`popup popup_type_zoom ${card && "popup_type_opened"}`}
    >
      <div className="popup__content popup__content_zoom">
        <button onClick={onClose} className="popup__close" type="button" />
        <img className="popup__image" alt={card.name} src={card.link} />
        <h2 className="popup__subtitle">{card.name}</h2>
      </div>
      <div onClick={onClose} className="popup__overlay"></div>
    </div>
  );
};

export default ImagePopup;
