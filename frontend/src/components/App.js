import React from "react";
import { api } from "../utils/Api";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import { useState, useEffect } from "react";
import Header from "./Header.js";
import Footer from "./Footer.js";
import Main from "./Main.js";
import PopupWithForm from "./PopupWithForm.js";
import ImagePopup from "./ImagePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import EditProfilePopup from "./EditProfilePopup.js";
import { register, authorize, validate } from '../utils/Auth.js';
import { Link, Route, Switch, useHistory } from 'react-router-dom';
import Login from './Login.js';
import Register from './Register.js';
import InfoToolTip from './InfoTooltip.js';
import ProtectedRoute from './ProtectedRoute.js';


function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setImagePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState("");
  const [cards, setCards] = useState([]);
  const [isInfoToolTipOpen, setInfoToolTipOpen] = useState(false);
  const [message, setMessage] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState(localStorage.getItem('jwt') ? true : false);
  const [userEmail, setUserEmail] = useState('');
  const history = useHistory();
  const token = localStorage.getItem('jwt');

  // Переписать код нижу

  useEffect(() => {
    if (isLoggedIn) {
      Promise.all([api.getUserInfo(), api.getInitialCards()])
        .then(([data, items]) => {
            console.log(data);
          setCurrentUser(data.data);
          setCards([...items]);
        })
        .catch((err) => {
          console.log(`Ошибка ${err}`);
        })
    }
  }, [isLoggedIn])


  /* useEffect(() => {
    api
      .getUserInfo()
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => {
        console.log(`Ошибка ${err}`);
      });
  }, []); */

  /*useEffect(() => {
    api
      .getInitialCards()
      .then((initialCards) => {
        setCards(initialCards);
      })
      .catch((err) => {
        console.log(`Ошибка ${err}`);
      });
  }, []); */

  useEffect(() => {
    if (token) {
      validate(token)
        .then((res) => {
          setLoggedIn(true);
          history.push('/');
          setUserEmail(res.data.email);
        })
        .catch((err) => {
          setLoggedIn(false);
          console.log(`Ошибка ${err}`);
        })
    }
  }, [token])


  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function closeAllPopups() {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setImagePopupOpen(false);
    setInfoToolTipOpen(false);
  }

  function handleUpdateAvatar(data) {
    api
      .setUserAvatar(data)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка ${err}`);
      });
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setImagePopupOpen(true);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(`Ошибка ${err}`);
      });
  }
  function handleCardDelete(cardId) {
    const isOwn = typeof cardId.owner === 'string' ? cardId.owner === currentUser._id : cardId.owner._id === currentUser._id;
    if (isOwn) {
      api
        .deleteCard(cardId._id)
        .then(() => {
          setCards((state) => state.filter((c) => c._id !== cardId._id));
        })
        .catch((err) => {
          console.log(`Ошибка ${err}`);
        });
    }
  }

  function handleAddPlaceSubmit(data) {
    api
      .createCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка ${err}`);
      });
  }
  function handleUpdateUser(data) {
    api
      .setUserInfo(data)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка ${err}`);
      });
  }

  function onRegister(password, email) {
    register(password, email)
      .then((res) => {
        setInfoToolTipOpen(true);
        if (res) {
          setMessage(true);
          history.push('/signin');
        }
      })
      .catch(() => {
        setMessage(false);
        setInfoToolTipOpen(true);
      })
  }

  function onLogin(password, email) {
    authorize(password, email)
      .then((data) => {
          localStorage.setItem("isLoggedIn", "true");
          setLoggedIn(true);
        history.push('/');
        setUserEmail(data.email);
      })
      .catch(() => {
        setLoggedIn(false);
        setMessage(false);
        setInfoToolTipOpen(true);
      })
  }

  function onSignOut() {
    setLoggedIn(false);
    history.push('/signin');
    localStorage.removeItem('token');
  }



  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header onSignOut={onSignOut} email={userEmail} />
        <Switch>
		  <Route path='/signup'>
			<Register onRegister={onRegister} />
		  </Route>
		  <Route path='/signin'>
			<Login onLogin={onLogin} />
		  </Route>
        <ProtectedRoute
            exact path='/'
            loggedIn={isLoggedIn}
            component={Main}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            cards={cards}
          />
          </Switch>
		  <Route exact path='/'>
			<Footer />
		  </Route>

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            name="edit-profile"
            title="Редактировать профиль"
            onUpdateUser={handleUpdateUser}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
          />

		  <InfoToolTip
			isOpen={isInfoToolTipOpen}
			onClose={closeAllPopups}
			state={message}
		  />

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />

	  </CurrentUserContext.Provider>

          <ImagePopup
            card={selectedCard}
            isOpen={isImagePopupOpen}
            onClose={closeAllPopups}
          />

		  <PopupWithForm
			name="delete-image"
			title="Вы уверены?"
			buttonText="Да"
		  />
    </div>
  );
}

export default App;
