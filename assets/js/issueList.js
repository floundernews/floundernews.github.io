const list = document.querySelector(".issue-list");

document.querySelector(".left").addEventListener("click", (e) => {
  e.preventDefault();
  list.scrollBy(-700, 0);
});
document.querySelector(".right").addEventListener("click", (e) => {
  e.preventDefault();
  list.scrollBy(700, 0);
}); 