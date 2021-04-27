---
layout: article
order: 7
title: This Month in Pictures
---

<div class="carousel">
    <a href="#" class="carousel__prev">Previous</a>
    <a href="#" class="carousel__next">Next</a>
    <ol class="carousel__list">
        <li id="slide1" class="carousel__slide">
            <img src="/assets/img/mip1.png">
        </li>
        <li id="slide2" class="carousel__slide">
            <img src="/assets/img/mip2.png">
        </li>
        <li id="slide3" class="carousel__slide">
            <img src="/assets/img/mip3.png">
        </li>
    </ol>
</div>

<script>
    const carouselList = document.querySelector(".carousel__list");
    document.querySelector(".carousel__prev").addEventListener("click", (e) => {
        e.preventDefault();
        carouselList.scrollBy(-carouselList.offsetWidth, 0);
    });
    document.querySelector(".carousel__next").addEventListener("click", (e) => {
        e.preventDefault();
        carouselList.scrollBy(carouselList.offsetWidth, 0);
    });
</script>