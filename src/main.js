import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { getImg } from './js/pixabay-api';
import { renderImages } from './js/render-functions';

export const refs = {
  galleryElement: document.querySelector('.gallery'),
  form: document.querySelector('.form'),
  loader: document.querySelector('.conteiner-loader'),
  btnLoadMore: document.querySelector('.loadMore'),
};

export let inputValue = document.querySelector('input');
let currentPage = 1;
let maxPage = 0;
const preSize = 15;

// ===========================================
function showLoader() {
  refs.loader.classList.remove('is-hidden');
}

export function hideLoader() {
  refs.loader.classList.add('is-hidden');
}
// ============

function showLoadMore() {
  refs.btnLoadMore.classList.remove('is-hidden');
}

function hideLoadMore() {
  refs.btnLoadMore.classList.add('is-hidden');
}

//===========================================

refs.form.addEventListener('submit', onFormSubmit);
refs.btnLoadMore.addEventListener('click', onLoadMoreClick);

async function onFormSubmit(e) {
  e.preventDefault();
  hideLoadMore();
  currentPage = 1;
  const searchImgs = inputValue.value.trim();
  refs.galleryElement.innerHTML = '';

  if (!searchImgs) {
    hideLoader();
    iziToast.info({
      message: ` Please fill in the field for search`,
      position: 'topRight',
    });
    refs.galleryElement.innerHTML = '';
    return;
  }

  try {
    showLoader();
    const data = await getImg(inputValue, currentPage);
    maxPage = Math.ceil(data.totalHits / preSize);
    refs.galleryElement.insertAdjacentHTML(
      'beforeend',
      renderImages(data.hits)
    );
    lightbox.refresh();
  } catch (error) {
    console.log(error);
  }
  hideLoader();
  checkBtnStatus();
  e.target.reset();
}

// ==========================================
async function onLoadMoreClick() {
  currentPage += 1;
  showLoader;
  try {
    const data = await getImg(inputValue, currentPage);

    refs.list.insertAdjacentHTML('beforeend', renderImages(data.hits));
    lightbox.refresh();
  } catch (error) {
    console.log(error);
  }
  scroll();
  checkBtnStatus();
  hideLoader();
}

// ==============================================

function checkBtnStatus() {
  if (currentPage >= maxPage) {
    hideLoadMore();
    iziToast.info({
      color: 'yellow',
      message: "We're sorry, but you've reached the end of search results.",
      position: 'topRight',
    });
  } else {
    showLoadMore();
  }
}
function scroll() {
  const height = refs.gallery.firstElementChild.getBoundingClientRect().height;
  scrollBy({
    top: height * 2,
    behavior: 'smooth',
  });
}

// ===============================================
const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

lightbox.refresh();
