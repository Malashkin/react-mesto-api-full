import React, { useEffect, useState } from "react";
import { Route, Switch, useHistory } from "react-router";
import ProtectedRoute from "./ProtectedRoute";
import Footer from "./Footer";
import Header from "./Header";
import Main from "./Main";
import ImagePopup from "./ImagePopup";
import api from "../utils/api";
import * as Auth from "./../utils/Auth";
import CurrentUserContext from "./../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import DeletePopup from "./DeletePopup";
import Register from "./Register";
import Login from "./Login";
import InfoTooltip from "./InfoTooltip";
import ErrorLogo from "../images/decl-icon.svg";
import SuccessLogo from "../images/ok-icon.svg";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [isNoticeSuccessPopupOpen, setIsNoticeSuccessPopupOpen] =
    useState(false);
  const [isNoticeErrorPopupOpen, setIsNoticeErrorPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [userLogin, setUserLogin] = useState("");
  const [cards, setCards] = useState([]);
  const [deletingCard, setDeletingCard] = useState(null);
  const [deletePopupButtonText, setDeletePopupButtonText] = useState("Да");
  const [editProfilePopupButtonText, setEditProfilePopupButtonText] =
    useState("Сохранить");
  const [addPlacePopupButton, setAddPlacePopupButton] = useState("Сохранить");
  const [editAvatarPopupButton, setEditAvatarPopupButton] =
    useState("Сохранить");
  const history = useHistory();
  const [token, setToken] = useState("");

  useEffect(() => {
    function tokenCheck() {
      if (localStorage.getItem("token")) {
        const token = localStorage.getItem("token");
        if (token) {
          Promise.all([
            Auth.checkToken(token),
            api.getUserInfo(token),
            api.getCardList(token),
          ]).then(([userData, user, cards]) => {
            setUserLogin(userData.email);
            setLoggedIn(true);
            setToken(localStorage.getItem("token"));
            history.push("/");
            setCurrentUser(user);
            setCards(cards.data.reverse());
          });
        }
      }
    }
    tokenCheck();
  }, [history, token]);

  function makeLogin(email, password) {
    Auth.authorize(email, password)
      .then((res) => {
        if (res.token) {
          localStorage.setItem("token", res.token);
          setLoggedIn(true);
          setUserLogin(email);
          setToken(localStorage.getItem("token"));
          history.push("/");
        } else {
          setIsNoticeErrorPopupOpen(true);
        }
      })
      .catch((err) => console.log(err));
  }

  function makeSignUp(email, password) {
    Auth.register(email, password)
      .then(() => {
        history.push("/sign-in");
        setIsNoticeSuccessPopupOpen(true);
      })
      .catch((error) => {
        setIsNoticeErrorPopupOpen(true);
        console.log(error);
      });
  }

  function makeSignOut() {
    localStorage.removeItem("token");
    setToken(null);
    history.push("/sign-up");
    setUserLogin("");
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handelAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handelDeleteClick(card) {
    setIsDeletePopupOpen(true);
    setDeletingCard(card);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsDeletePopupOpen(false);
    setIsNoticeSuccessPopupOpen(false);
    setIsNoticeErrorPopupOpen(false);
    setSelectedCard(null);
    setDeletingCard(null);
  }

  function handleClick(card) {
    setSelectedCard(card);
  }

  function handleLikeClick(card) {
    const isLiked = card.likes.some((i) => i === currentUser._id);
    api
      .changeLikeCardStatus(card._id, isLiked, token)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(`Ошибка ${err}`);
      });
  }

  const handleUpdateUser = (name, about) => {
    setEditProfilePopupButtonText("Сохранение...");
    api
      .setUserInfo(name, about, token)
      .then((res) => {
        setCurrentUser(res.data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка ${err}`);
      })
      .finally(() => {
        setEditProfilePopupButtonText("Сохранить");
      });
  };

  const handleUpdateAvatar = ({ avatar }) => {
    setEditAvatarPopupButton("Сохранение...");
    api
      .editAvatar(avatar, token)
      .then((res) => {
        setCurrentUser(res.data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка ${err}`);
      })
      .finally(() => {
        setEditAvatarPopupButton("Сохранить");
      });
  };

  function handleCardDelete(e) {
    e.preventDefault();
    setDeletePopupButtonText("Удаление...");
    api
      .deleteCard(deletingCard._id, token)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== deletingCard._id));
        setDeletingCard(null);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка ${err}`);
      })
      .finally(() => {
        setDeletePopupButtonText("Да");
      });
  }

  function handleAddPlaceSubmit({ name, link }) {
    setAddPlacePopupButton("Сохранение...");
    api
      .createCard(name, link, token)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка ${err}`);
      })
      .finally(() => {
        setAddPlacePopupButton("Сохранить");
      });
  }

  return (
    <div className="body">
      <CurrentUserContext.Provider value={currentUser}>
        <Header signOut={makeSignOut} user={userLogin} />
        <Switch>
          <Route path="/sign-in" title="Вход" buttonText="Войти">
            <Login onSubmit={makeLogin} />
          </Route>
          <Route
            path="/sign-up"
            title="Регистрация"
            buttonText="Зарегистрироваться"
          >
            <Register onSubmit={makeSignUp} />
          </Route>
          <ProtectedRoute
            path="/"
            loggedIn={loggedIn}
            component={Main}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handelAvatarClick}
            onCardClick={handleClick}
            onCardLike={handleLikeClick}
            onDeleteClick={handelDeleteClick}
            cards={cards}
          ></ProtectedRoute>
        </Switch>
        <Footer />
        <EditProfilePopup
          onUpdateUser={handleUpdateUser}
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          buttonText={editProfilePopupButtonText}
        />
        <ImagePopup onClose={closeAllPopups} card={selectedCard} />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          buttonText={editAvatarPopupButton}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          buttonText={addPlacePopupButton}
        />
        <DeletePopup
          isOpen={isDeletePopupOpen}
          onClose={closeAllPopups}
          onSubmit={handleCardDelete}
          buttonText={deletePopupButtonText}
        />
        <InfoTooltip
          popupIconImg={SuccessLogo}
          popupText="Вы успешно зарегистрировались"
          onClose={closeAllPopups}
          isOpen={isNoticeSuccessPopupOpen}
        />
        <InfoTooltip
          popupIconImg={ErrorLogo}
          popupText="Что-то пошло не так! Попробуйте ещё раз."
          onClose={closeAllPopups}
          isOpen={isNoticeErrorPopupOpen}
        />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
