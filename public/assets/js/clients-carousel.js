$(".owl-carousel").owlCarousel({
  loop: true,
  margin: 80,
  nav: false,
  dots: false,
  responsive: {
    0: {
      items: 1,
    },
    300: {
      items: 2,
    },
    600: {
      items: 3,
    },
    1000: {
      items: 4,
    },
  },
});
