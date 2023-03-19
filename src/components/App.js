import { Component } from 'react';
import { GlobalStyle } from './GlobalStyle';
import SearchBar from './SearchBar';
import ImageGallery from './ImageGallery';
import { RootApp } from './App.styled';

export class App extends Component {
  state = {
    searchString: '',
  };

  handleFormSubmit = textForSearch => {
    this.setState({ searchString: textForSearch });
  };

  render() {
    return (
      <RootApp>
        <SearchBar onSubmit={this.handleFormSubmit} />
        <ImageGallery searchString={this.state.searchString} />
        <GlobalStyle />
      </RootApp>
    );
  }
}
