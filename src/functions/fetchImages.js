import axios from 'axios';

const API_KEY = '33674761-de1d44d4741b05ad048b05bf0';

function fetchImages({searchQuery, page,}) {
  return axios.get(
    `https://pixabay.com/api/?q=${searchQuery}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );
}

export default fetchImages;