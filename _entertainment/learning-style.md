---
layout: quiz
title: What Type of Learner Are You?
image: "/assets/img/learning-style.jpg"
questions:
  - What is your ideal study environment?:
    - Silence
    - With a friend
    - Background music
  - What classes interest you the most?:
    - Math
    - Arts
    - Languages
  - What do you do first when solving a problem?:
    - Get input from others
    - Brainstorm alone
    - Give up
  - Are your grades good?:
    - "Yes"
    - "No"
---

<script>
  /*
   * Must define this function for each quiz. Returns the result of the quiz.
   *
   * @return String The result of the quiz.
   */
  function getResult() {
    return `Your learning style is: ${Array.from(document.querySelectorAll(".answer > button.selected")).some(b=>b.innerText=="Yes")?"good":"bad"}`;
  }
</script>
