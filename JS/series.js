const prev = document.querySelector(".prev");
const next = document.querySelector(".next");
const moviesTopSliderDisplay = document.querySelector(".moviesTopSliderDisplay");
const searchitembox = document.querySelector(".searchitembox");
const closebtn = document.querySelector(".closebtn");
const searchitems = document.querySelector(".searchitems");
const searchboxInput = document.querySelector(".searchbox input");
const searchBtn = document.querySelector(".btn");


let count = 0;
let sliders = [];

// ------------------moviesTopSliderDisplay-----------------------------------
const navactionlist = document.querySelectorAll(".navactionlist li");
if (document.title == "TV SERIES - Your go-to destination for a vast collection of movies and series.") {
    navactionlist[2].style.opacity = "1";
}


// ------------------moviesTopSliderDisplay-----------------------------------
updatethemoviesDisplay()

async function updatethemoviesDisplay() {

    try {

        let RandompageNo = Math.floor(Math.random() * 200 + 1);

        const responce = await fetch(`https://api.themoviedb.org/3/tv/popular?api_key=20f9ed2296f2b4b0100817e7a4262e8f&page=${RandompageNo}`);
        const data = await responce.json();

        for (let index = 0; index < data.results.length; index++) {

            const slider = document.createElement("div")
            slider.classList.add("slider");
            slider.innerHTML =
                `<img src="${data.results[index].backdrop_path == null ? 'https://image.tmdb.org/t/p/original/muTL1oSkmYIzREjBh3LukKpbmo2.jpg' : "https://image.tmdb.org/t/p/original" + data.results[index].backdrop_path}" alt="image">

        <div class="SliderDisplaydetailsbox">
            <h1>${data.results[index].title == undefined ? "Not Avilable" : data.results[index].title.slice(0, 15)}</h1>
            <p>${data.results[index].overview.slice(0, 150)}.</p>
        </div>`;

            moviesTopSliderDisplay.insertBefore(slider, moviesTopSliderDisplay.children[0]);
            sliders.push(slider);
        }

        slidDisplywithimage(sliders);

    } catch (error) {

        console.log(error);

    }

}

// ---------------------SliderDisplayFunction----------------------------------

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

// ----------------------searchitembox--------------------------------
searchBtn.addEventListener("click", (e) => {
    e.preventDefault();
    let value = searchboxInput.value;
    showTheSearchItems(value);
});

closebtn.addEventListener("click", () => {
    if (!null) {
        searchitembox.remove();
    }
});

async function showTheSearchItems(movieName) {

    try {

        const responce = await fetch(`https://api.themoviedb.org/3/search/tv?api_key=20f9ed2296f2b4b0100817e7a4262e8f&query=${movieName}`)
        const searchMovie = await responce.json();

        if (searchMovie.total_results < 1) {
            searchitems.textContent = "Sorry, but we couldn't find any results for your search. Please try a different search!";
            searchitems.style.fontSize = "3rem";
        } else {

            searchitems.textContent = "";

            for (let index = 0; index < searchMovie.results.length; index++) {

                const imagepath = searchMovie.results[index].poster_path;
                const titleis = searchMovie.results[index].name;
                const overview = searchMovie.results[index].overview;

                const searchcards = document.createElement("div")
                searchcards.classList.add("card");
                searchcards.innerHTML =
                    `<div class="image">
                    <img src="${imagepath == null ? 'https://image.tmdb.org/t/p/original/muTL1oSkmYIzREjBh3LukKpbmo2.jpg' : "https://image.tmdb.org/t/p/original" + imagepath}" alt="poster-image">
    
                        </div>
                        <div class="details">
                        <h2 class="title">${titleis == undefined ? "" : titleis.slice(0, 15)}</h2>
                        <div class="info">
                            <p class="overview">${overview.slice(0, 131)}...</p>
                        </div>
                        <button class="WatchNow">WatchNow</button>
                        </div>`;

                searchitems.append(searchcards);
            }


        }

        searchitembox.style.display = "block";
        searchboxInput.value = "";


    } catch (error) {
        console.log(error)
    }


}


// ----------------------AIRING TODAY--------------------------------
const playingItems = document.querySelector(".playingItems");

nowplaying()

async function nowplaying() {

    try {
        let RandompageNo = Math.floor(Math.random() * 7 + 1);

        const responce = await fetch(`https://api.themoviedb.org/3/tv/airing_today?api_key=20f9ed2296f2b4b0100817e7a4262e8f&page=${RandompageNo}`);
        const data = await responce.json();

        console.log(data)
        for (let index = 0; index < data.results.length; index++) {

            const imagepath = data.results[index].backdrop_path;
            const titlepath = data.results[index].original_title;
            const titalName = data.results[index].name;
            const movieId = data.results[index].id;

            const item = document.createElement("div");
            item.classList.add("items");
            item.innerHTML =
                ` <img src="${imagepath == null ? "https://image.tmdb.org/t/p/original/muTL1oSkmYIzREjBh3LukKpbmo2.jpg" : 'https://image.tmdb.org/t/p/original' + imagepath}" alt="image">

                <div class="tital">
                <h2 class="titaltext">${titlepath == undefined ? titalName.slice(0, 10) : titlepath.slice(0, 10)}</h2>
                <button class="WatchNow" id="${movieId}">WatchNow</button>
                </div>`;


            playingItems.append(item);
        }

        const watchNowBtnsgetting = playingItems.querySelectorAll(".items");

        watchNowBtnsgetting.forEach((btns) => {
            btns.addEventListener("click", (e) => {
                watchNowBtnsId = e.target.id;
                localStorage.setItem("MymovieId", watchNowBtnsId);
                window.location.href = "../details.html";
            });

        });



    } catch (error) {
        console.log(error)
    }

}


// ----------------------TOP-RATED--------------------------------
const popularItems = document.querySelector(".popularItems");

topratesmovies();

async function topratesmovies() {

    try {

        let RandompageNo = Math.floor(Math.random() * 50 + 1);
        const responce = await fetch(`https://api.themoviedb.org/3/tv/top_rated?api_key=20f9ed2296f2b4b0100817e7a4262e8f&page=${RandompageNo}`);

        const data = await responce.json();


        for (let index = 0; index < data.results.length; index++) {
            const imagepath = data.results[index].poster_path;
            const movietital = data.results[index].title;
            const nametital = data.results[index].name;
            const description = data.results[index].overview;
            const rating = data.results[index].vote_average;
            const totalvotes = data.results[index].vote_count;
            const movieId = data.results[index].id;

            const items = document.createElement("div");
            items.classList.add("items");

            items.innerHTML =
                ` <img src="${imagepath == null ? "https://image.tmdb.org/t/p/original/muTL1oSkmYIzREjBh3LukKpbmo2.jpg" : 'https://image.tmdb.org/t/p/original' + imagepath}" alt="">
    
            <div class="moviedetails">
                <h1 class="movietital">${movietital == undefined ? nametital.slice(0, 15) : movietital.slice(0, 15)}</h1>
                <p class="overvies">${description.slice(0, 100)}..</p>
    
                <p class="rating">Rating: <span>${rating} %</span></p>
                <p class="totalvotes">Votes: <span>${totalvotes}</span></p>
                <button class="WatchNow" id="${movieId}" >WatchNow</button>
            </div>`;

            popularItems.append(items);
        }


        const watchNowBtnsgetting = popularItems.querySelectorAll(".items");

        watchNowBtnsgetting.forEach((btns) => {
            btns.addEventListener("click", (e) => {
                watchNowBtnsId = e.target.id;
                localStorage.setItem("MymovieId", watchNowBtnsId);
                window.location.href = "../details.html";
            });
        });

    } catch (error) {
        console.log(error)
    }

}


// ----------------------ON-THE-AIR--------------------------------
const Upcoming = document.querySelector(".Upcoming");

Upcomingfunction()

async function Upcomingfunction() {

    try {
        let RandompageNo = Math.floor(Math.random() * 30 + 1);
        const responce = await fetch(`https://api.themoviedb.org/3/tv/on_the_air?api_key=20f9ed2296f2b4b0100817e7a4262e8f&page=${RandompageNo}`);
        const data = await responce.json();

        for (let index = 0; index < data.results.length; index++) {

            const imagepath = data.results[index].backdrop_path;
            const titlepath = data.results[index].title;
            const nametital = data.results[index].name;
            const movieId = data.results[index].id;

            const item = document.createElement("div");
            item.classList.add("items");
            item.innerHTML =
                ` <img src="${imagepath == null ? "https://image.tmdb.org/t/p/original/muTL1oSkmYIzREjBh3LukKpbmo2.jpg" : 'https://image.tmdb.org/t/p/original' + imagepath}" alt="">
                <div class="tital">
                <h2 class="titaltext">${titlepath == undefined ? nametital.slice(0, 10) : titlepath.slice(0, 10)}</h2>
                <button class="WatchNow" id="${movieId}">WatchNow</button>
                </div>`;
            Upcoming.append(item);
        }

        const watchNowBtnsgetting = Upcoming.querySelectorAll(".items");

        watchNowBtnsgetting.forEach((btns) => {
            btns.addEventListener("click", (e) => {
                watchNowBtnsId = e.target.id;
                localStorage.setItem("MymovieId", watchNowBtnsId);
                window.location.href = "../details.html";
            });
        });


    } catch (error) {
        console.log(error)
    }

}



// ----------------------Discover--------------------------------
const DiscoverItems = document.querySelector(".DiscoverItems");
let pageNo = 1
Discovermovies(pageNo);

async function Discovermovies(pageNo) {

    try {
        const responce = await fetch(`https://api.themoviedb.org/3/discover/tv?api_key=20f9ed2296f2b4b0100817e7a4262e8f&page=${pageNo}`);
        const data = await responce.json();

        if (pageNo < data.results.length) {
            for (let index = 0; index < data.results.length; index++) {

                const imagepath = data.results[index].poster_path;
                const movietital = data.results[index].title;
                const nametital = data.results[index].name;
                const description = data.results[index].overview;
                const rating = data.results[index].vote_average;
                const totalvotes = data.results[index].vote_count;
                const movieId = data.results[index].id;

                const items = document.createElement("div");
                items.classList.add("items");

                items.innerHTML =
                    ` <img src="https://image.tmdb.org/t/p/original${imagepath}" alt="">
    
                <div class="moviedetails">
                <h1 class="movietital">${movietital == undefined ? nametital.slice(0, 15) : movietital.slice(0, 15)}</h1>
                <p class="overvies">${description.slice(0, 100)}...</p>
    
                <p class="rating">Rating: <span>${rating} %</span></p>
                <p class="totalvotes">Votes: <span>${totalvotes}</span></p>
                <button class="WatchNow" id="${movieId}">WatchNow</a></button>
                </div>`;

                DiscoverItems.append(items);
            }

            const watchNowBtnsgetting = DiscoverItems.querySelectorAll(".items");

            watchNowBtnsgetting.forEach((btns) => {
                btns.addEventListener("click", (e) => {
                    watchNowBtnsId = e.target.id;
                    localStorage.setItem("MymovieId", watchNowBtnsId);
                    window.location.href = "../details.html";
                });
            });

        } else {
            alert("You Reach The Max, Please Reload The Page:")
        }

    } catch (error) {
        console.log(error)
    }


}

const morebtn = document.querySelector(".clickformore");

morebtn.addEventListener("click", () => {
    pageNo++;
    Discovermovies(pageNo);
});
