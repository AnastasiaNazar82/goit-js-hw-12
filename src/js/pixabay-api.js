import axios from 'axios';

export async function getImg(inputValue, currentPage) {
  const BASE_URL = 'https://pixabay.com';
  const END_POINT = '/api/';
  const url = BASE_URL + END_POINT;

  const params = {
    key: '43044638-81b288208bd41d7f3c4a2027f',
    q: inputValue,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    page: currentPage,
    per_page: 15,
  };

  const res = await axios.get(url, { params });
  return res.data;
}
