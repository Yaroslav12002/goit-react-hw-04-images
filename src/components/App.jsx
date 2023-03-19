import { useState } from 'react';
import { GlobalStyle } from './GlobalStyle';
import SearchBar from './SearchBar';
import ImageGallery from './ImageGallery';
import { RootApp } from './App.styled';

export function App() {
  const [searchString, setSearchString] = useState('');

  const handleFormSubmit = textForSearch => {
    setSearchString(textForSearch);
  };

  return (
    <RootApp>
      <SearchBar onSubmit={handleFormSubmit} />
      <ImageGallery searchString={searchString} />
      <GlobalStyle />
    </RootApp>
  );
}
