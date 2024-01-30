function carouselInit() {
  const generalConfig = {
    loop: false,
    margin: 60,
    nav: false,
    dots: false,
    stagePadding: 20,
    responsive: {
      0: {
        items: 2,
      },
      600: {
        items: 3,
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

  // Remove the event listener
  window.removeEventListener("load", carouselInit);
}

window.addEventListener("load", carouselInit);
