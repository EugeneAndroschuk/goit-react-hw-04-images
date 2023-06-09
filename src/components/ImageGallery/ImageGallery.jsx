import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import fetchImages from '../../functions/fetchImages.js';
import css from './ImageGallery.module.css';
import {
  NotificationContainer,
  NotificationManager,
} from 'react-notifications';
import 'react-notifications/lib/notifications.css';

const ImageGallery = props => {
  const {
    setLargeImageURL,
    pageSearch,
    querySearch,
    onShowLoader,
    onShowButton,
  } = props;
  const [images, setImages] = useState([]);
  const [maxPage, setMaxPage] = useState(null);
  const [isLoaderVisible, setIsLoaderVisible] = useState(false);
  const [isButtonVisible, setIsButtonVisible] = useState(false);
  const [isFetchFulfilled, setIsFetchFulfilled] = useState(false);
  const [isLastPage, setIsLastPage] = useState(false);

  useEffect(() => {
    if (!querySearch) return;

    setIsLoaderVisible(true);
    setIsButtonVisible(false);
    setIsFetchFulfilled(false);
    setIsLastPage(false);

    const response = fetchImages({
      searchQuery: querySearch,
      page: pageSearch,
    });
    response
      .then(obj => {
        if (pageSearch === 1) {
          setImages([...obj.data.hits]);
          setMaxPage(Math.ceil(obj.data.totalHits / 12));
        } else setImages(prev => [...prev, ...obj.data.hits]);

        setIsFetchFulfilled(true);
        setIsLoaderVisible(false);
        setIsButtonVisible(true);
      })
      .catch(err => {
        console.log(err);
        setIsLoaderVisible(false);
      });
  }, [pageSearch, querySearch]);

  useEffect(() => {
    if (isLoaderVisible) onShowLoader(true);
    else onShowLoader(false);
  }, [isLoaderVisible, onShowLoader]);

  useEffect(() => {
    if (isButtonVisible) {
      onShowButton(true);
      window.scrollBy(0, window.innerHeight);
    } else onShowButton(false);
  }, [isButtonVisible, onShowButton]);

  useEffect(() => {if (pageSearch === maxPage) setIsLastPage(true)}, [maxPage, pageSearch]);

  useEffect(() => {
    if (isLastPage && isFetchFulfilled) {
      setIsButtonVisible(false);
      NotificationManager.info("You've reached the last page");
    }
  }, [isFetchFulfilled, isLastPage]);

  const setActiveIndexImage = index => {
    setLargeImageURL(images[index].largeImageURL);
  };

  return (
    <ul className={css.ImageGallery}>
      {images.length > 0 &&
        images.map((image, index) => (
          <li
            className={css.ImageGalleryItem}
            key={image.id}
            onClick={() => setActiveIndexImage(index)}
          >
            <ImageGalleryItem webformatURL={image.webformatURL} />
          </li>
        ))}
      <NotificationContainer />
    </ul>
  );
};

ImageGallery.propTypes = {
  querySearch: PropTypes.string.isRequired,
  pageSearch: PropTypes.number.isRequired,
  setLargeImageURL: PropTypes.func.isRequired,
  onShowLoader: PropTypes.func.isRequired,
  onShowButton: PropTypes.func.isRequired,
};

export default ImageGallery;
