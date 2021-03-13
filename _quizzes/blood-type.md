---
title: This Quiz Will Tell You Your Blood Type
questions:
  - What day is it?:
    - Monday
    - Wednesday
    - Thursday
    - Saturday
  - What is your opinion on trees?:
    - Like 'em
    - Love 'em
    - Meh
    - Still Deciding
  - How do you spell "Lybrary?":
    - Library
    - Libruary
    - Libary
    - I don't know either
  - What is your blood type?:
    - A
    - B
    - C
    - D
message: Thank you for teaching me how to spell "libary."
---

<script>
  let answers = ["A", "B", "AB", "O"];

  /*
   * Must define this function for each quiz. Returns the result of the quiz.
   * 
   * @return String The result of the quiz.
   */
  function getResult() {
    return "You got: " + answers[Math.floor(Math.random() * answers.length)] + "!";
  }
</script>