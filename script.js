let nav = document.querySelector(".navig-area");
let previous = document.querySelector(".foot .prev");
let nxt = document.querySelector(".foot .next");
let value = 1;
document.querySelectorAll(".navig-area div").forEach((element) => {
  element.addEventListener("click", () => {
    previous.classList.remove("none");
    nxt.classList.remove("none");
    document.querySelector(`.sec${value}`).classList.remove("selected");
    document.querySelector(`.page${value}`).classList.add("none");
    value = parseInt(element.getAttribute("value"));
    element.classList.add("selected");
    document.querySelector(`.page${value}`).classList.remove("none");
    check();
  });
});
function update(x) {
  document.querySelector(`.sec${value}`).classList.remove("selected");
  document.querySelector(`.page${value}`).classList.add("none");
  value = value + x;
  document.querySelector(`.sec${value}`).classList.add("selected");
  document.querySelector(`.page${value}`).classList.remove("none");
}
function next() {
  update(1);
  check();
}
function prev() {
  update(-1);
  check();
}
function check() {
  if (value == 1) {
    previous.classList.add("none");
    nxt.classList.remove("none");
  } else if (value == 2) {
    previous.classList.remove("none");
    nxt.classList.remove("none");
  } else if (value == 3) {
    previous.classList.remove("none");
    nxt.classList.remove("none");
  } else if (value == 4) {
    previous.classList.remove("none");
    nxt.classList.add("none");
  }
}
check();
