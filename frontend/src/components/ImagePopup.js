function ImagePopup(props) {
  return (
    <div
      className={`popup popup_show-image ${props.isOpen ? "popup_open" : ""}`}
    >
      <div className="popup__container-image">
        <button
          type="button"
          className="popup__button-close popup__button-close-image"
          onClick={props.onClose}
        />
        <img
          src={props.card?.link}
          className="popup__image"
          alt={props.card?.name}
        />
        <h3 className="popup__image-title">{props.card?.name}</h3>
      </div>
    </div>
  );
}

export default ImagePopup;
