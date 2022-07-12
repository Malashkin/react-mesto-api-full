import React, { useContext } from "react";
import CurrentUserContext from "./../contexts/CurrentUserContext";

const Card = ({ card, onCardClick, onCardLike, onDeleteClick }) => {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner === currentUser._id;
  const cardDeleteButtonClassName = `${
    isOwn ? "cards__trashicon" : "cards__trashicon_deactive"
  }`;
  const isLiked = card.likes.some((i) => i === currentUser._id);
  const cardLikeButtonClassName = `cards__emotion ${
    isLiked ? "cards__emotion_active" : ""
  }`;

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }
  function handelDeleteClick() {
    onDeleteClick(card);
  }

  return (
    <div className="cards__conteiner">
      <img
        onClick={handleClick}
        className="cards__image"
        src={card.link}
        alt={card.name}
      />
      <button
        type="button"
        onClick={handelDeleteClick}
        className={cardDeleteButtonClassName}
      ></button>
      <div className="cards__description">
        <h2 className="cards__title">{card.name}</h2>
        <div className="cards__reaction">
          <button
            type="button"
            onClick={handleLikeClick}
            className={cardLikeButtonClassName}
          ></button>
          <p className="cards__counter">{card.likes.length}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
