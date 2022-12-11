import { useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const nameRef = useRef();
  const linkRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace({
      name: nameRef.current.value,
      link: linkRef.current.value,
    });
  }

  return (
    <PopupWithForm
      name="popup_add-image"
      title="Новое место"
      isOpen={isOpen}
      onSubmit={handleSubmit}
      onClose={onClose}
      buttonText="Создать"
    >
      <input
        className="popup__input"
        ref={nameRef}
        type="text"
        name="name"
        id="image-name"
        placeholder="Название"
        minLength="2"
        maxLength="30"
      />
      <span className="popup__input-error username-error" />
      <input
        className="popup__input"
        ref={linkRef}
        type="url"
        name="link"
        id="link"
        placeholder="Ссылка на картинку"
      />
      <span className="popup__input-error description-error" />
    </PopupWithForm>
  );
}

export default AddPlacePopup;
