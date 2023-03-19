import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { Overlay, ModalWindow } from './Modal.styled';

function Modal({ largeImageURL, tags, onClose }) {
  useEffect(() => {
    const handleKeyDown = evt => {
      if (evt.code !== 'Escape') {
        return;
      }
      onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const onClick = evt => {
    if (evt.target !== evt.currentTarget) {
      return;
    }
    onClose();
  };

  return (
    <Overlay onClick={onClick}>
      <ModalWindow>
        <img src={largeImageURL} alt={tags} />
      </ModalWindow>
    </Overlay>
  );
}

Modal.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
