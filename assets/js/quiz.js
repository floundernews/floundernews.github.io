// Only run on quiz pages
if (document.querySelector(".question")) {
  document
    .querySelectorAll(".answers > .answer > button")
    .forEach((answerBtn) => {
      answerBtn.addEventListener("click", () => {
        answerBtn.classList.add("selected");

        // Disable buttons
        answerBtn.parentNode.parentNode.childNodes.forEach((child) => {
          child.querySelector("button").disabled = true;
        });

        if (
          document.querySelectorAll(".answer > button.selected").length ==
          document.querySelectorAll(".question").length
        ) {
          document.getElementById("result").innerText = getResult();
          document.querySelector(".result").style.display = "block";
          document.querySelector(".result").scrollIntoView();
        }
      });
    });
}