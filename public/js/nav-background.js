window.addEventListener("load", function () {
  function updateNavbarClass() {
    var header = document.getElementById("header");
    var classList = header.classList;
    var transparent = "transparent-header";
    var scrolled = "header-scrolled";
    if (window.scrollY === 0) {
      if (!classList.contains(transparent)) classList.add(transparent);
      classList.remove(scrolled);
    } else {
      classList.remove(transparent);
      classList.add(scrolled);
    }
  }
  updateNavbarClass();
  window.addEventListener("scroll", updateNavbarClass);
});
