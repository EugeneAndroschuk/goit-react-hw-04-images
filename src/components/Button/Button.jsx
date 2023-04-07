import { useState } from 'react';
import PropTypes from 'prop-types';
import css from './Button.module.css';

const Button = (props) => {
  const { onClickLoadMore, page } = props;
  const [pageSearch, setPageSearch] = useState(()=>page);

  const handleClick = () => {
    const nextPage = pageSearch + 1;
    onClickLoadMore(nextPage);

    setPageSearch(prev => prev + 1);
  };

    return (
      <button className={css.Button} type="button" onClick={handleClick}>
        Load more
      </button>
    );
}

Button.propTypes = {
  page: PropTypes.number.isRequired,
  onClickLoadMore: PropTypes.func.isRequired,
};

export default Button;