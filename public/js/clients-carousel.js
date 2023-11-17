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
      items: 4,
    },
    600: {
      items: 6,
    },
    1000: {
      items: 8,
    },
  },
});
