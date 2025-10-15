const scrollToTopBtn = document.querySelector(".scroll-to-top");

document.addEventListener("scroll", () => {
  if (document.documentElement.scrollTop > 1000) {
    scrollToTopBtn.classList.add("visible");
  } else {
    scrollToTopBtn.classList.remove("visible");
  }
});

scrollToTopBtn.addEventListener("click", () => {
  document.documentElement.scrollTo({ top: 0, behavior: "smooth" });
});

const alphabet = "abcdefghijklmnopqrstuvwxyz";
let buffer = [];
let lastKeyTime = Date.now();
window.addEventListener("keydown", (e) => {
  if (alphabet.indexOf(e.key.toLowerCase()) === -1) return;
  const currentTime = Date.now();
  if (currentTime - lastKeyTime > 2000) {
    buffer = [];
  }
  buffer.push(e.key.toLowerCase());
  lastKeyTime = currentTime;
  if (checkCode()) buffer = [];
});

function checkCode() {
  if (buffer.join("") == "josh") {
    document.documentElement.style.filter = "invert(1)";
    return true;
  }
  if (buffer.join("") == "tilt") {
    document.documentElement.style.transform = "rotate(1deg)";
    return true;
  } else {
    return false;
  }
}
