// import { AiOutlineSearch } from 'react-icons/ai';
import PropTypes from 'prop-types';
import { useState } from 'react';

import {
  SearchbarHeader,
  SearchForm,
  SearchFormButton,
  StyledAiOutlineSearch,
  SearchFormInput,
} from './SearchBar.styled';

function SearchBar({ onSubmit }) {
  const [textForSearchImage, setTextForSearchImage] = useState('');

  const handleTextForSearchChange = event => {
    setTextForSearchImage(event.currentTarget.value.toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (textForSearchImage.trim() === '') {
      alert('Please enter some text');
      return;
    }
    onSubmit(textForSearchImage);
    setTextForSearchImage('');
  };

  return (
    <SearchbarHeader>
      <SearchForm onSubmit={handleSubmit}>
        <SearchFormButton type="submit">
          <StyledAiOutlineSearch />
        </SearchFormButton>

        <SearchFormInput
          type="text"
          autocomplete="off"
          autoFocus
          value={textForSearchImage}
          onChange={handleTextForSearchChange}
          placeholder="Search images and photos"
        />
      </SearchForm>
    </SearchbarHeader>
  );
}

SearchBar.propTypes = {
  onSubmit: PropTypes.func,
};

export default SearchBar;
