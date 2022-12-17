import React from 'react';
import failIcon from '../images/failIcon.svg';
import successIcon from '../images/successIcon.svg';


function InfoTooltip(props) {

  return (
	  <div className={`popup  popup_info ${props.isOpen ? 'popup_open' : ''}`}>
		<div className='popup__container'>
		  <button type='button' className='popup__button-close' onClick={props.onClose} />
		  <img className='popup__notice-image' src={props.state ? successIcon : failIcon} />
		  <p className='popup__message'>
			{props.state ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}
		  </p>
		</div>
	  </div>
  )
}

export default InfoTooltip;