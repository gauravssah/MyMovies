const prev = document.querySelector(".prev");
const next = document.querySelector(".next");
const moviesTopSliderDisplay = document.querySelector(".moviesTopSliderDisplay");


let count = 0;
let sliders = [];

const navactionlist = document.querySelectorAll(".navactionlist li");
if (document.title == "Movies - Your go-to destination for a vast collection of movies and series.") {
    navactionlist[1].style.opacity = "1";
}


updatethemoviesDisplay()

async function updatethemoviesDisplay() {
    const responce = await fetch("https://api.themoviedb.org/3/movie/popular?api_key=20f9ed2296f2b4b0100817e7a4262e8f");
    const data = await responce.json();

    // console.log(data.results.length)

    for (let index = 0; index < data.results.length; index++) {

        const slider = document.createElement("div")
        slider.classList.add("slider");
        slider.innerHTML =
            `<img src="https://image.tmdb.org/t/p/original${data.results[index].backdrop_path}" alt="image">

        <div class="SliderDisplaydetailsbox">
            <h1>${data.results[index].title}</h1>
            <p>${data.results[index].overview.slice(0, 230)}</p>
        </div>`;

        moviesTopSliderDisplay.insertBefore(slider, moviesTopSliderDisplay.children[0]);
        sliders.push(slider);
    }

    slidDisplywithimage(sliders);

}



// -------------------------------------------------------

function slidDisplywithimage(sliders) {
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
}



// ------------------------------------------------------


