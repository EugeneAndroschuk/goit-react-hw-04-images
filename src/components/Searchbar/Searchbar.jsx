import {useState} from 'react';
import PropTypes from 'prop-types';
import css from './Searchbar.module.css';
import { IoSearch } from 'react-icons/io5';
import {
  NotificationContainer,
  NotificationManager,
} from 'react-notifications';
import 'react-notifications/lib/notifications.css';

const Searchbar = (props) => {
  const [querySearch, setQuerySearch] = useState('');

  const onFormSubmit = e => {
    e.preventDefault();
    const normalizedQuerySearch = querySearch.trim();

    if (normalizedQuerySearch)
      props.querySearchInSearchbar(normalizedQuerySearch);
    else NotificationManager.warning('Please, enter correct query search');
  };

  const handleInputChange = e => {
    setQuerySearch(e.currentTarget.value);
  };

    return (
      <header className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={onFormSubmit}>
          <button type="submit" className={css['SearchForm-button']}>
            <IoSearch size={20} />
            <span className={css['SearchForm-button-label']}>Search</span>
          </button>

          <input
            className={css['SearchForm-input']}
            value={querySearch}
            onChange={handleInputChange}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
        <NotificationContainer />
      </header>
    );
}

Searchbar.propTypes = {
  querySearchInSearchbar: PropTypes.func.isRequired,
};

export default Searchbar;
