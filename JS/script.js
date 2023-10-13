const homedisplayimages = document.querySelector(".displaysection");
const tital = document.title;
const personPopularSection = document.querySelector(".personPopularSection");
const catogeryname = document.querySelector(".catogeryname");
const searchitems = document.querySelector(".searchitems");
const closebtn = document.querySelector(".closebtn");
const submitbtn = document.querySelector(".submitbtn");
const searchitembox = document.querySelector(".searchitembox");
const searchboxinput = document.querySelector(".searchbox input");


closebtn.addEventListener("click", (event) => {
    event.preventDefault()
    if (!null) {
        searchitembox.remove();
    }

})

console.log("scri")



const navactionlist = document.querySelectorAll(".navactionlist li");
if (tital == "My Movies - Your go-to destination for a vast collection of movies and series.") {
    // console.log("Home");
    navactionlist[0].style.opacity = "1";
}


catogerysection();
homeDisplayImage();


async function homeDisplayImage() {


    try {
        let index = 0;
        let pageNumber = 1;

        const responce = await fetch(`https://api.themoviedb.org/3/person/popular?api_key=20f9ed2296f2b4b0100817e7a4262e8f&page=${pageNumber}`);
        const data = await responce.json()
        // console.log(data.results);
        // console.log(data.results[0].known_for[0].backdrop_path);

        const div = document.createElement("div");
        div.classList.add("images");
        div.innerHTML =
            `<img src="" alt="Images">
        <img src="" alt="Images">
        <img src="" alt="Images">
        <img src="" alt="Images">
        <img src="" alt="Images">
        <img src="" alt="Images">
        <img src="" alt="Images">
        <img src="" alt="Images">
        <img src="" alt="Images">
        <img src="" alt="Images">
        <img src="" alt="Images">
        <img src="" alt="Images">
        <img src="" alt="Images">
        <img src="" alt="Images">
        <img src="" alt="Images">
        <img src="" alt="Images">
        <img src="" alt="Images">
        <img src="" alt="Images">
        <img src="" alt="Images">
        <img src="" alt="Images">`;

        homedisplayimages.append(div);

        const homedisplayimg = homedisplayimages.querySelectorAll(".images img")

        if (index <= homedisplayimg.length) {
            for (let index = 0; index < homedisplayimg.length; index++) {
                homedisplayimg[index].src = `https://image.tmdb.org/t/p/original${data.results[index].known_for[0].backdrop_path}`;
            }
        } else {
            console.log("outtttt", index)
        }


        // ----------------personPopularSection---------------------

        for (let index = 0; index < data.results.length; index++) {

            const imagepath = data.results[index].known_for[0].poster_path;
            const rating = data.results[index].known_for[0].vote_average;
            const votes = data.results[index].known_for[0].vote_count;
            const titleis = data.results[index].known_for[0].title

            const popularcards = document.createElement("div")
            popularcards.classList.add("card");
            popularcards.innerHTML =
                `<div class="image">
                <img src="https://image.tmdb.org/t/p/original${imagepath}" alt="poster-image">
                </div>
        
                <div class="details">
                <h2 class="title">${titleis}</h2>
                <div class="info">
                    <p>Rating: <span class="rating">${rating}</span></p>
                    <p>Votes: <span class="votecount">${votes}</span></p>
                </div>
                </div>`;
            personPopularSection.append(popularcards);

        }


    } catch (error) {
        console.log(error)
    }



}

// -----------------------------------------


async function catogerysection() {

    try {
        const responce = await fetch("https://api.themoviedb.org/3/genre/movie/list?api_key=20f9ed2296f2b4b0100817e7a4262e8f");

        const catgegoryname = await responce.json()

        for (let index = 0; index < catgegoryname.genres.length; index++) {
            const h3 = document.createElement("h3");
            h3.innerText = catgegoryname.genres[index].name;
            catogeryname.append(h3);

            h3.addEventListener("click", (e) => {
                const catogeryName = e.target.innerText;

                updateThePopularByCatogery(catogeryName)

            })
        }
    } catch (error) {
        console.log(error)
    }



}

// ---------------------------------------------

async function updateThePopularByCatogery(catogeryName) {

    try {

        const responce = await fetch(`https://api.themoviedb.org/3/search/collection?api_key=20f9ed2296f2b4b0100817e7a4262e8f&query=${catogeryName}`);
        const catogName = await responce.json();


        // ----------------personPopularSection---------------------

        for (let index = 0; index < catogName.total_results; index++) {


            const imagepath = catogName.results[index].poster_path;
            const titleis = catogName.results[index].original_name;
            const overview = catogName.results[index].overview;



            const popularcards = document.createElement("div")
            popularcards.classList.add("card");
            popularcards.innerHTML =
                `<div class="image">
                <img src="${imagepath == null ? 'https://image.tmdb.org/t/p/original/muTL1oSkmYIzREjBh3LukKpbmo2.jpg' : "https://image.tmdb.org/t/p/original" + imagepath}" alt="poster-image">

                    </div>

                    <div class="details">
                    <h2 class="title">${titleis}</h2>
                    <div class="info">
                        <p class="overview">${overview.slice(0, 131)}...</p>
                    </div>
                    </div>`;

            personPopularSection.append(popularcards)

            personPopularSection.insertBefore(popularcards, personPopularSection.children[0]);

        }

    } catch (error) {
        console.log(error);
    }


}


// -----------------------------------------------------


submitbtn.addEventListener("click", (e) => {
    e.preventDefault();
    // console.log(searchboxinput.value);
    searchitemsfunction(searchboxinput.value);
});


async function searchitemsfunction(searchvalue) {

    let pageNumber = 1;

    const responce = await fetch(`https://api.themoviedb.org/3/search/collection?api_key=20f9ed2296f2b4b0100817e7a4262e8f&query=${searchvalue}&page=${pageNumber}`);
    const searchMovie = await responce.json();

    // console.log(searchMovie);
    // console.log(searchMovie.page)
    // console.log(searchMovie.total_results)
    // console.log(searchMovie.results.length)
    // console.log(searchMovie.total_results + "total_results")

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
                        <h2 class="title">${titleis}</h2>
                        <div class="info">
                            <p class="overview">${overview.slice(0, 131)}...</p>
                        </div>
                        </div>`;

            searchitems.append(searchcards);
        }


    }

    searchitembox.style.display = "block";
    searchboxinput.value = "";


}