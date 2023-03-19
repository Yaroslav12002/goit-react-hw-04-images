import PropTypes from 'prop-types';
import ImageGalleryItem from 'components/ImageGalleryItem';
import { useState, useEffect } from 'react';
import { Gallery } from './ImageGallery.styled';
import Loader from 'components/Loader';
import { Notify } from 'notiflix';
import imagesAPI from 'services/imageAPI';
import Button from 'components/Button';

const STATUS = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

function ImageGallery({ searchString }) {
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(STATUS.IDLE);
  const [page, setPage] = useState(1);
  const [isThisLastPage, setIsThisLastPage] = useState(false);
  const [prevSearchString, setPrevSearchString] = useState('');

  //---------------------------------------//
  // take only usefull fields from object  //
  //---------------------------------------//
  const trimImages = fullImagesInformation => {
    return fullImagesInformation.map(
      ({ id, webformatURL, largeImageURL, tags }) => {
        return { id, webformatURL, largeImageURL, tags };
      }
    );
  };

  const setNextPage = () => {
    setPage(page + 1);
  };

  useEffect(() => {
    const loadImages = async (query, page) => {
      if (!query) {
        return;
      }

      try {
        setStatus(STATUS.PENDING);
        const response = await imagesAPI.imagesFetch(query, page);
        const newImages = trimImages(response.hits);
        setImages(images => [...images, ...newImages]);
        setStatus(STATUS.RESOLVED);
        setIsThisLastPage(Math.ceil(response.total / 12) <= page);

        if (newImages.length === 0) {
          Notify.failure(`No images for ${query}`);
        }
      } catch (error) {
        setError(error);
        setStatus(STATUS.REJECTED);
      }
    };

    console.log('page', page);
    console.log('searchString', searchString);

    if (prevSearchString !== searchString) {
      setPage(1);
      setImages([]);
      setPrevSearchString(searchString);
      return;
    }

    loadImages(searchString, page);
  }, [page, searchString, prevSearchString]);

  if (status === STATUS.IDLE) {
    return <div></div>;
  }

  if (status === STATUS.REJECTED) {
    return <div>{error.message}</div>;
  }

  if (status === STATUS.RESOLVED || status === STATUS.PENDING) {
    return (
      <>
        <Gallery>
          {images.map(image => (
            <ImageGalleryItem key={image.id} image={image} tags={image.tags} />
          ))}
        </Gallery>
        {status === 'pending' && <Loader />}
        {status !== 'pending' && !isThisLastPage && (
          <Button setNextPage={setNextPage} status={status} />
        )}
      </>
    );
  }
}

ImageGallery.propTypes = {
  searchString: PropTypes.string,
};
export default ImageGallery;
