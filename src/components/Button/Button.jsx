import PropTypes from 'prop-types';
import { LoadMoreButton, LoadMoreContainer } from './Button.styled';

const Button = ({ setNextPage }) => {
  return (
    <LoadMoreContainer>
      <LoadMoreButton onClick={setNextPage}>Load more</LoadMoreButton>
    </LoadMoreContainer>
  );
};

Button.propTypes = {
  setNextPage: PropTypes.func.isRequired,
};

export default Button;
