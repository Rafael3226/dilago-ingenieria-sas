$(".owl-carousel").owlCarousel({
  loop: true,
  margin: 80,
  nav: false,
  dots: false,
  stagePadding: 50,
  responsive: {
    0: {
      items: 2,
    },
    300: {
      items: 3,
    },
    600: {
      items: 4,
    },
    1000: {
      items: 6,
    },
  },
});
