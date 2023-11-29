window.addEventListener("load", function () {
  function updateNavbarClass() {
    let headerClassList = document.getElementById("header");
    const transparent = "transparent-header";
    if (window.scrollY === 0 && !headerClassList.contains(transparent)) {
      headerClassList.add(transparent);
    } else if (headerClassList.contains(transparent) && window.scrollY !== 0) {
      headerClassList.remove(transparent);
    }
  }
  updateNavbarClass();
  window.addEventListener("scroll", updateNavbarClass);
});
