const sliders = Array.from(document.querySelectorAll(".slider"));
const prev = document.querySelector(".prev")
const next = document.querySelector(".next")


let count = 0;

next.addEventListener("click", () => {
    if (count < sliders.length - 1) {
        count++;
    } else {
        count = 0;
    }
    slidingTheSlides();
});

prev.addEventListener("click", () => {
    if (count <= 0) {
        count = sliders.length - 1;
    } else {
        count--;
    }
    slidingTheSlides();
});

setInterval(() => {

    if (count < sliders.length) {
        if (count < sliders.length - 1) {
            count++;
        } else {
            count = 0;
        }
        slidingTheSlides();
    } else {
        if (count <= 0) {
            count = sliders.length - 1;
        } else {
            count--;
        }
        slidingTheSlides();
    }

}, 2000);

sliders.forEach((slide, index) => {
    slide.style.left = ` ${index * 100}%`;
});


function slidingTheSlides() {
    sliders.forEach((slideimage) => {
        slideimage.style.transform = `translateX(-${count * 100}%)`;
    })

};


// ------------------------------------------------------



