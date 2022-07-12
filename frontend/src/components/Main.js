import React, { useContext } from "react";
import Card from "./Card";
import CurrentUserContext from "./../contexts/CurrentUserContext";

const Main = ({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  onCardLike,
  onDeleteClick,
  cards,
}) => {
  const currentUser = useContext(CurrentUserContext);
  return (
    <React.Fragment>
      <section className="profile">
        <div className="profile__card">
          <button
            onClick={onEditAvatar}
            className="profile__avatar"
            type="button"
          >
            {currentUser.avatar && (
              <img
                className="profile__image"
                src={currentUser.avatar}
                alt="Аватар"
              />
            )}
          </button>
          <div className="profile__info">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button
              onClick={onEditProfile}
              className="profile__button"
              type="button"
            ></button>
            <p className="profile__spec">{currentUser.about}</p>
          </div>
        </div>
        <button
          onClick={onAddPlace}
          className="profile__add"
          type="button"
        ></button>
      </section>
      <section className="cards">
        <CurrentUserContext.Provider value={currentUser}>
          {cards.map((card) => (
            <Card
              card={card}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onDeleteClick={onDeleteClick}
              key={card._id}
            />
          ))}
        </CurrentUserContext.Provider>
      </section>
    </React.Fragment>
  );
};

export default Main;
