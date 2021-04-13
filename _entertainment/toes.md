---
layout: quiz
title: This Quiz Will Tell You How Many Toes You Have
image: "/assets/img/toes.png"
questions:
  - What is your favourite colour?:
    - Sky blue
    - Navy blue
    - Royal blue
    - Beige
  - What season were you born in?:
    - Spring
    - Summer
    - Fall
    - Autumn
  - What country do you live in?:
    - USA
    - Not USA
    - Papua New Guinea
    - All of the above
  - Who is the 23rd president of the United States?:
    - Obama (last name unknown)
    - Benjamin Harrison
    - Grover Cleveland
    - Funny Valentine
  - How many toes do you have?:
    - 0
    - 1+
    - 10+
    - 7
message: Welp, that was easy!
---

<script>
  /*
   * Must define this function for each quiz. Returns the result of the quiz.
   * 
   * @return String The result of the quiz.
   */
  function getResult() {
    return "You have " + document.querySelector('.question:nth-of-type(5) .answer > button.selected').innerText + " toes!";
  }
</script>