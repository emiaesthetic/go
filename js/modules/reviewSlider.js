import Swiper from 'swiper';
import {Navigation} from 'swiper/modules';

new Swiper('.swiper', {
  modules: [Navigation],
  slidesPerView: 1,
  loop: true,

  navigation: {
    nextEl: '.reviews__button--next',
    prevEl: '.reviews__button--prev',
  },

  mousewheel: true,
  keyboard: true,
});
