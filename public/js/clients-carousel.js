window.onload = function () {
  const generalConfig = {
    loop: false,
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
  };

  const certificatesConfig = {
    ...generalConfig,
    responsive: {
      0: {
        items: 2,
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
  };
  $(".owl-carousel").owlCarousel(generalConfig);
  $(".owl-carousel-certificates").owlCarousel(certificatesConfig);
};
