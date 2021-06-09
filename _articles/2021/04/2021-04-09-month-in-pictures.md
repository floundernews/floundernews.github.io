---
layout: article
order: 7
title: This Month in Pictures
image: "/assets/img/2021-04-09-month-in-pictures-preview.png"
---

<div class="carousel">
    <a href="#" class="carousel__prev">Previous</a>
    <a href="#" class="carousel__next">Next</a>
    <ol class="carousel__list">
        <li id="slide1" class="carousel__slide">
            <img src="/assets/img/2021-04-09-month-in-pictures1.png">
            <p>Mackenzie Holds Rally to Promote Social Distancing</p>
        </li>
        <li id="slide2" class="carousel__slide">
            <img src="/assets/img/2021-04-09-month-in-pictures2.png">
            <p>Mackenzie's Portables Announce Planned Referendum on Independence from Central Building</p>
        </li>
        <li id="slide3" class="carousel__slide">
            <img src="/assets/img/2021-04-09-month-in-pictures3.png">
            <p>Mackenzie Rugby Team Raises Trophy from Hospital</p>
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