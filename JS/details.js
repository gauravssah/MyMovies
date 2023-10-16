// // ----------------------Toprated--------------------------------
const recomendedItems = document.querySelector(".recomendedItems");
console.log(recomendedItems);
topratesmovies();

console.log("hello")

async function topratesmovies() {

    try {

        let total = 0;
        let RandompageNo = Math.floor(Math.random() * 50 + 1);
        const responce = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=20f9ed2296f2b4b0100817e7a4262e8f&page=${RandompageNo}`);


        const data = await responce.json();
        console.log(data)



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




// -----------------------------------




