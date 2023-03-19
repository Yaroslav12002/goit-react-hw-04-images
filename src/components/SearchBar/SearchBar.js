// import { AiOutlineSearch } from 'react-icons/ai';
import PropTypes from 'prop-types';
import { Component } from 'react';

import {
  SearchbarHeader,
  SearchForm,
  SearchFormButton,
  StyledAiOutlineSearch,
  SearchFormInput,
} from './SearchBar.styled';

class SearchBar extends Component {
  state = {
    textForSearchImage: '',
  };

  handleTextForSearchChange = event => {
    this.setState({
      textForSearchImage: event.currentTarget.value.toLowerCase(),
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.state.textForSearchImage.trim() === '') {
      alert('Please enter some text');
      return;
    }
    this.props.onSubmit(this.state.textForSearchImage);
    this.setState({ textForSearchImage: '' });
  };

  render() {
    return (
      <SearchbarHeader>
        <SearchForm onSubmit={this.handleSubmit}>
          <SearchFormButton type="submit">
            <StyledAiOutlineSearch />
          </SearchFormButton>

          <SearchFormInput
            type="text"
            autocomplete="off"
            autoFocus
            value={this.state.textForSearchImage}
            onChange={this.handleTextForSearchChange}
            placeholder="Search images and photos"
          />
        </SearchForm>
      </SearchbarHeader>
    );
  }
}

SearchBar.propTypes = {
  onsubmit: PropTypes.func,
};

export default SearchBar;
