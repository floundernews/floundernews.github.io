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
        )
          getResult();
      });
    });
}

function getResult() {
  document.getElementById("result").innerText =
    answers[Math.floor(Math.random() * answers.length)];
  document.querySelector(".result").style.display = "block";
}
