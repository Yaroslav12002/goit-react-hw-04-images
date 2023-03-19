import axios from 'axios';

const API_KEY = '32896608-edee66498739c605f99988f2c';
axios.defaults.baseURL = 'https://pixabay.com/api/';

async function imagesFetch(searchKey, page) {
  try {
    const response = await axios.get(
      `?key=${API_KEY}&q=${searchKey}&page=${page}&image_type=photo&orientation=horizontal&per_page=12`
    );
    return response.data;
  } catch (error) {}
}

const api = { imagesFetch };

export default api;
