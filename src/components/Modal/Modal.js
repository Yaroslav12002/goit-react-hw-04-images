import PropTypes from 'prop-types';
import { Component } from 'react';
import { Overlay, ModalWindow } from './Modal.styled';

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = evt => {
    if (evt.code !== 'Escape') {
      return;
    }
    this.props.onClose();
  };

  onClick = evt => {
    if (evt.target !== evt.currentTarget) {
      return;
    }
    this.props.onClose();
  };

  render() {
    const { largeImageURL, tags } = this.props;
    return (
      <Overlay onClick={this.onClick}>
        <ModalWindow>
          <img src={largeImageURL} alt={tags} />
        </ModalWindow>
      </Overlay>
    );
  }
}

Modal.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};

export default Modal;
