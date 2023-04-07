import React, { useState } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Modal from './Modal/Modal';
import Loader from './Loader/Loader';

const App=()=> {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState(null);
  const [isLoaderVisible, setIsLoaderVisible] = useState(false);
  const [isButtonVisible, setIsButtonVisible] = useState(false);

  // state = {
  //   search: '',
  //   page: 1,
  //   isOpenModal: false,
  //   largeImageURL: null,
  //   isLoaderVisible: false,
  //   isButtonVisible: false,
  // };

  const handleSearch = searchQ => {
    setSearch(searchQ);
    setPage(1);
    // this.setState({ search, page: 1 });
  };

  const onClickLoadMore = pageValue => {
    setPage(pageValue);
    // this.setState({ page: pageValue });
  };

  const setOnLargeImageURL = url => {
    setLargeImageURL(url);
    setIsOpenModal(true);
    // this.setState({ largeImageURL: url });
    // this.setState({ isOpenModal: true });
  };

  const onCloseModalEsc = () => {
    setIsOpenModal(false);
    // this.setState({ isOpenModal: false });
  };

  const onShowLoader = bool => {
    setIsLoaderVisible(bool);
    // this.setState({ isLoaderVisible: bool });
  };

  const onShowButton = (bool) => {
    setIsButtonVisible(bool);
    // this.setState({ isButtonVisible: bool});
  }

    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gridGap: '16px',
          paddingBottom: '24px',
        }}
      >
        <Searchbar querySearchInSearchbar={handleSearch} />
        <ImageGallery
          querySearch={search}
          pageSearch={page}
          setLargeImageURL={setOnLargeImageURL}
          onShowLoader={onShowLoader}
          onShowButton={onShowButton}
        />
        {isLoaderVisible && <Loader />}
        {isButtonVisible && (
          <Button
            onClickLoadMore={onClickLoadMore}
            page={page}
          />
        )}
        {isOpenModal && (
          <Modal
            largeImageURL={largeImageURL}
            onCloseModalEsc={onCloseModalEsc}
          />
        )}
      </div>
    );
}

export default App;