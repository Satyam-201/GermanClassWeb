/* ============================================================
   SLIDER.JS — initializes all Swiper.js instances used across
   the site (testimonials, gallery highlights, country carousel)
   ============================================================ */
document.addEventListener('DOMContentLoaded', function(){
  if(typeof Swiper === 'undefined') return;

  if(document.querySelector('.testimonial-swiper')){
    new Swiper('.testimonial-swiper', {
      slidesPerView: 1,
      spaceBetween: 26,
      loop: true,
      autoplay: { delay: 4500, disableOnInteraction: false },
      pagination: { el: '.testi-pagination', clickable: true },
      breakpoints: {
        768: { slidesPerView: 2 },
        1100: { slidesPerView: 3 }
      }
    });
  }

  if(document.querySelector('.country-swiper')){
    new Swiper('.country-swiper', {
      slidesPerView: 1.15,
      spaceBetween: 20,
      autoplay: { delay: 3800, disableOnInteraction: false },
      breakpoints: {
        640: { slidesPerView: 2.2 },
        1000: { slidesPerView: 3.3 }
      }
    });
  }

  if(document.querySelector('.hero-slider')){
    new Swiper('.hero-slider', {
      effect: 'fade',
      loop: true,
      autoplay: { delay: 5000 },
      pagination: { el: '.hero-pagination', clickable: true }
    });
  }
});
