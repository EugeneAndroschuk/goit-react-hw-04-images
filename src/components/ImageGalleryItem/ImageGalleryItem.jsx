import React from 'react';
import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

const ImageGalleryItem=(props)=> {
  const { webformatURL } = props;
  
    return (
      <>
        <img
          className={css['ImageGalleryItem-image']}
          src={webformatURL}
          alt=""
        />
      </>
    );
  
}

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
};

export default ImageGalleryItem;