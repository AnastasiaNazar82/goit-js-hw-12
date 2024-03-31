import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { refs, hideLoader } from '../main.js';

export function renderImages(imagesArr) {
  //   if (imagesArr.length === 0) {
  //     hideLoader();
  //     iziToast.error({
  //       message: `❌ Sorry, there are no images matching your search query. Please, try again!`,
  //       theme: 'dark',
  //       progressBarColor: '#FFFFFF',
  //       color: '#EF4040',
  //       position: 'topRight',
  //     });
  //   }

  const imgGallery = imagesArr
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `<li class="gallery-item">
    <a class="gallery-link" href="${largeImageURL}">
    <img class="gallery-image" src="${webformatURL}" alt="${tags}" />
    </a>
    <div class="content-image">
    <p class="content-item">Likes<span class="info-item">${likes}</span></p>
    <p class="content-item">Views<span class="info-item">${views}</span></p>
    <p class="content-item">Comments<span class="info-item">${comments}</span></p>
    <p class="content-item">Downloads<span class="info-item">${downloads}</span></p>
    </div
    </li>`
    )
    .join('');

  return imgGallery;
}
