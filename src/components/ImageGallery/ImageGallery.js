import PropTypes from 'prop-types';
import ImageGalleryItem from 'components/ImageGalleryItem';
import { Component } from 'react';
import { Gallery } from './ImageGallery.styled';
import Loader from 'components/Loader';
import { Notify } from 'notiflix';
import imagesAPI from 'services/imageAPI';
import Button from 'components/Button';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

class ImageGallery extends Component {
  state = {
    images: [],
    error: null,
    status: Status.IDLE,
    page: 1,
    isThisLastPage: false,
  };

  //---------------------------------------//
  // take only usefull fields from object  //
  //---------------------------------------//
  trimImages = fullImagesInformation => {
    return fullImagesInformation.map(
      ({ id, webformatURL, largeImageURL, tags }) => {
        return { id, webformatURL, largeImageURL, tags };
      }
    );
  };

  setNextPage = () => {
    // console.log('page will be changed. current page:', this.state.page);
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  componentDidUpdate(prevProps, prevState) {
    const prevSearch = prevProps.searchString;
    const nextSearch = this.props.searchString;
    const prevPage = prevState.page;
    const nextPage = this.state.page;

    if (prevSearch === nextSearch && prevPage === nextPage) {
      return;
    }
    if (prevSearch !== nextSearch) {
      this.setState({ page: 1, images: [] });

      // terminate func, because state was changed,
      // component will update, and this func will run second time
      if (nextPage !== 1) {
        return;
      }
    }

    this.loadImages(nextSearch, nextPage);
  }

  loadImages = async (query, page) => {
    try {
      this.setState({ status: Status.PENDING });
      const response = await imagesAPI.imagesFetch(query, page);
      const newImages = this.trimImages(response.hits);
      const isThisLastPage = Math.ceil(response.total / 12) <= page;
      this.setState(prevState => ({
        images: [...prevState.images, ...newImages],
        status: Status.RESOLVED,
        isThisLastPage,
      }));
      if (newImages.length === 0) {
        Notify.failure(`No images for ${query}`);
      }
    } catch (error) {
      this.setState({ error, status: Status.REJECTED });
    }
  };

  render() {
    const { images, error, status, isThisLastPage } = this.state;
    // const { searchString } = this.props;

    if (status === 'idle') {
      return <div></div>;
    }

    if (status === 'rejected') {
      return <div>{error.message}</div>;
    }

    if (status === 'resolved' || status === 'pending') {
      return (
        <>
          <Gallery>
            {images.map(image => (
              <ImageGalleryItem
                key={image.id}
                image={image}
                tags={image.tags}
              />
            ))}
          </Gallery>
          {status === 'pending' && <Loader />}
          {status !== 'pending' && !isThisLastPage && (
            <Button setNextPage={this.setNextPage} status={status} />
          )}
        </>
      );
    }
  }
}

ImageGallery.propTypes = {
  searchString: PropTypes.string,
};
export default ImageGallery;
