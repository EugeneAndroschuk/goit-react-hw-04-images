import { useEffect, useLayoutEffect, useState, useRef } from 'react';
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
  const [maxPage, setMaxPage] = useState(1);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (!querySearch) return;
    // if (isFirstRender.current) {
    //   console.log('первый рендер')
    //   isFirstRender.current = false;
    //   return;
    // }

    onShowLoader(true);
    onShowButton(false);

    const response = fetchImages({
      searchQuery: querySearch,
      page: pageSearch,
    });
    response
      .then(obj => {
        onShowLoader(false);
        onShowButton(true);
        if (pageSearch === 1) {
          setImages([...obj.data.hits]);
          setMaxPage(Math.ceil(obj.data.totalHits / 12));
        } else if (pageSearch === maxPage) {
          onShowButton(false);
          NotificationManager.info("You've reached the last page");
        } else setImages(prev => [...prev, ...obj.data.hits]);
      })
      .catch(err => console.log(err));

    if (pageSearch !== 1) window.scrollBy(0, window.innerHeight);
  }, [pageSearch, querySearch]);

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
