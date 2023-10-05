document.addEventListener("DOMContentLoaded", function () {
  var header = document.querySelector("#header");
  const headerRect = header.getBoundingClientRect();
  handleScrollClosure(headerRect)();
  window.addEventListener("scroll", handleScrollClosure(headerRect));
});

function handleScrollClosure({ height }) {
  let isOver = false;
  return function () {
    // Change the background color when reaching the bottom
    var content = document.querySelector("#content");
    const { top } = content.getBoundingClientRect();

    const shouldBeSticky = top - height <= 0;
    if (shouldBeSticky !== isOver) {
      header.classList.toggle("dark", !shouldBeSticky);
      header.classList.toggle("sticky-header", shouldBeSticky);
      isOver = shouldBeSticky;
    }
  };
}

function isRectIntersecting(rect1, rect2) {
  // Check for intersection
  const diference = rect2.top - rect1.height;
  console.log(diference);
  return diference <= 0;
}
