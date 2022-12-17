import PopupWithForm from "./PopupWithForm";
import { useState, useContext, useEffect } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name="popup_edit-profile"
      title="Редактировать профиль"
      buttonText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input"
        type="text"
        name="username"
        id="username"
        placeholder="Имя пользователя"
        required
        minLength="2"
        maxLength="40"
        onChange={handleChangeName}
        value={name || ""}
      />
      <span className="popup__input-error username-error" />
      <input
        className="popup__input"
        type="text"
        name="description"
        id="description"
        placeholder="Описание профиля"
        required
        minLength="2"
        maxLength="200"
        onChange={handleChangeDescription}
        value={description || ""}
      />
      <span className="popup__input-error description-error" />
    </PopupWithForm>
  );
}

export default EditProfilePopup;
