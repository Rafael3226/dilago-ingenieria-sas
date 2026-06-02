window.addEventListener("load", function () {
  function updateNavbarClass() {
    var classList = document.getElementById("header").classList;
    var transparent = "transparent-header";
    if (window.scrollY === 0) {
      if (!classList.contains(transparent)) classList.add(transparent);
    } else {
      classList.remove(transparent);
    }
  }
  updateNavbarClass();
  window.addEventListener("scroll", updateNavbarClass);
});
