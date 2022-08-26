import { useState, useEffect } from 'react';
import api from '../utils/Api';
import CurrentUserContext from '../contexts/CurrentUserContext';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import AddPlacePopup from './AddPlacePopup';
import EditAvatarPopup from './EditAvatarPopup';
import PopupWithConfirm from './PopupWithConfirm';
import Login from './Login';

export default function App() {
  // cтейты модалок
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({ name: '', link: '' });
  // юзер, карты
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  // стейт карточки для удаления
  const [idCardToDelete, setIdCardToDelete] = useState('');
  // стейт текста кнопки сабмита
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getCards()])
      .then(([apiUser, apiCards]) => {
        setCurrentUser(apiUser);
        setCards(apiCards);
      })
      .catch((err) => console.log(err));
  }, []);

  // управление модалками
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleCardClick(card) {
    setSelectedCard(card);
  }
  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsConfirmPopupOpen(false);
    setSelectedCard({});
  }

  // лайки логика
  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    if (!isLiked) {
      api
        .like(card._id, !isLiked)
        .then((newCard) => {
          setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
        })
        .catch((err) => console.log(err));
    } else {
      api
        .dislike(card._id, !isLiked)
        .then((newCard) => {
          setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
        })
        .catch((err) => console.log(err));
    }
  }

  // удаление
  function handleCardDelete() {
    setIsLoading(true);
    api
      .deleteCard(idCardToDelete)
      .then(() => {
        setCards((state) => state.filter((item) => item._id !== idCardToDelete));
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  }

  // ред-ие юзера
  function handleUpdateUser(data) {
    setIsLoading(true);
    api
      .setUserInfo(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  }

  // ред-ие аватарки
  function handleUpdateAvatar(data) {
    setIsLoading(true);
    api
      .setAvatar(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  }

  // добавление карт
  function handleAddPlaceSubmit(data) {
    setIsLoading(true);
    api
      .setCard(data)
      .then((res) => {
        setCards([res, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        {/* <Main
          cards={cards}
          onCardLike={handleCardLike}
          onConfirmOpen={setIsConfirmPopupOpen}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          onConfirm={setIdCardToDelete}
        /> */}
        <Login/>
        <Footer />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          children={EditProfilePopup}
          onUpdateUser={handleUpdateUser}
          buttonName="Сохранить"
          title="Редактировать профиль"
          isLoading={isLoading}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          children={AddPlacePopup}
          onAddPlace={handleAddPlaceSubmit}
          buttonName="Создать"
          title="Новое место"
          isLoading={isLoading}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          children={EditAvatarPopup}
          onUpdateAvatar={handleUpdateAvatar}
          buttonName="Сохранить"
          title="Обновить аватар"
          isLoading={isLoading}
        />
        <PopupWithConfirm
          isOpen={isConfirmPopupOpen}
          onClose={closeAllPopups}
          buttonName="Да"
          title="Вы уверены?"
          onCardDelete={handleCardDelete}
          isLoading={isLoading}
        />

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </div>
    </CurrentUserContext.Provider>
  );
}
