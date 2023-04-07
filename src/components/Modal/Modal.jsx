import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import css from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

const Modal = (props) => {

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
   
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    }
  });

  const handleKeyDown = e => {
    if (e.code === 'Escape') props.onCloseModalEsc();
  };

  const handleOverlayClick = e => {
    if (e.target === e.currentTarget) props.onCloseModalEsc();
  };

    return createPortal(
      <div className={css.Overlay} onClick={handleOverlayClick}>
        <div className={css.Modal}>
          <img src={props.largeImageURL} alt="" />
        </div>
      </div>,
      modalRoot
    );
}

Modal.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  onCloseModalEsc: PropTypes.func.isRequired,
};

export default Modal;
