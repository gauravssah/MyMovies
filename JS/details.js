// // ----------------------RecomendedMovie--------------------------------
const recomendedItems = document.querySelector(".recomendedItems");
RecomendedMovie();

let movieId = localStorage.getItem("MymovieId");
console.log("movieId : ", movieId)

async function RecomendedMovie() {

    try {

        let RandompageNo = Math.floor(Math.random() * 10 + 1);
        const responce = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=20f9ed2296f2b4b0100817e7a4262e8f&page=${RandompageNo}`);


        const data = await responce.json();

        for (let index = 0; index < 6; index++) {

            const imagepath = data.results[index].poster_path;
            const movietital = data.results[index].title;
            const description = data.results[index].overview;
            const rating = data.results[index].vote_average;
            const totalvotes = data.results[index].vote_count;
            const cards = document.createElement("div");
            cards.classList.add("card");

            cards.innerHTML =
                ` <img src="https://image.tmdb.org/t/p/original${imagepath}" alt="image">

                <div class="moviedetails">
                    <h1 class="movietital">${movietital}</h1>
                    <p class="overvies">${description.slice(0, 130)}...</p>

                    <p class="rating">Rating: <span>${rating} %</span></p>
                    <p class="totalvotes">Votes: <span>${totalvotes}</span></p>
                    <button class="WatchNow">Watch Now</a></button>
                </div>`;
            recomendedItems.appendChild(cards);
        }


    } catch (error) {
        console.log(error)
    }

}


// ------------CurrenMovieForPlay-----------------------

const aboutMovies = document.querySelector(".aboutMovies");


playCurrentMovie()
async function playCurrentMovie() {
    const responce = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=20f9ed2296f2b4b0100817e7a4262e8f`);
    const data = await responce.json();
    // console.log(data);

    const movieTital = data.original_title;
    const moveOverview = data.overview;
    const movierating = data.vote_average;
    const movieRelaseDate = data.release_date;

    aboutMovies.innerHTML =
        `    <h2 class="title">Title : <span class="original_title">${movieTital}</span></h2>
    <p class="overview">${moveOverview}</p>
    <p class="rating">Rating : <span class="popularity">${movierating.toFixed(1)} %</span></p>
    <p class="rating">Release Date : <span class="release_date">${movieRelaseDate}</span></p>`;

}




