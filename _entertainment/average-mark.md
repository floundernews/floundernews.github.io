---
layout: quiz
title: This Quiz Will Tell You Your Average Mark
image: "/assets/img/average-mark.png"
questions:
  - How much of the homework do you do in each class?:
    - 0%
    - 1-50%
    - 51-99%
    - 100%
  - On average, how many hours do you spend studying per day?:
    - Less than one hour
    - One to three hours
    - Three to five hours
    - Five hours or more
  - How often do you participate in class?:
    - Never
    - Rarely
    - Sometimes
    - Often
  - How much sleep do you get per night?:
    - Sleep is for the weak
    - One to five hours
    - Five to seven hours
    - Eight hours or more
message: Failure is inevitable.
---

<script>
  /*
   * Must define this function for each quiz. Returns the result of the quiz.
   * 
   * @return String The result of the quiz.
   */
  function getResult() {
    return "You got: " + Math.floor(Math.random() * 50) + "%!";
  }
</script>