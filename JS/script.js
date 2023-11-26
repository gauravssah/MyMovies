const homedisplayimages = document.querySelector(".displaysection");
const tital = document.title;
const personPopularSection = document.querySelector(".personPopularSection");
const catogeryname = document.querySelector(".catogeryname");
const searchitems = document.querySelector(".searchitems");
const closebtn = document.querySelector(".closebtn");
const submitbtn = document.querySelector(".submitbtn");
const searchitembox = document.querySelector(".searchitembox");
const searchboxinput = document.querySelector(".searchbox input");


let watchNowBtnsId;

closebtn.addEventListener("click", () => {
    // if (!null) {
    //     searchitembox.remove();
    // }
    searchitembox.remove();
})

const navactionlist = document.querySelectorAll(".navactionlist li");
if (tital == "My Movies - Your go-to destination for a vast collection of movies and series.") {
    // console.log("Home");
    navactionlist[0].style.opacity = "1";
}


catogerysection();
homeDisplayImage();

// ----------------homeDisplayImage-------------------------

async function homeDisplayImage() {

    try {
        let index = 0;
        let pageNumber = Math.floor(Math.random() * 400);
        const responce = await fetch(`https://api.themoviedb.org/3/person/popular?api_key=20f9ed2296f2b4b0100817e7a4262e8f&page=${pageNumber}`);
        const data = await responce.json();

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



        // console.log(data.results)

        // ----------------personPopularSection---------------------

        for (let index = 0; index < data.results.length; index++) {

            const imagepath = data.results[index].known_for[1].poster_path;
            const imagepath0 = data.results[index].known_for[0].poster_path;
            const rating = data.results[index].known_for[1].vote_average;
            const votes = data.results[index].known_for[1].vote_count;
            const titleis = data.results[index].known_for[1].original_title;
            const titleisName = data.results[index].known_for[1].name;
            const movieId = data.results[index].known_for[1].id;
            const movietital = data.results[index].known_for[1].title;

            // console.log(`Movie Tital: ${movietital} , MovieId : ${movieId}`);

            const popularcards = document.createElement("div")
            popularcards.classList.add("card");
            popularcards.innerHTML =
                `<div class="image">
                <img src="https://image.tmdb.org/t/p/original${imagepath == null ? imagepath0 : imagepath}" alt="poster-image">
                </div>
        
                <div class="details">
                <h2 class="title">${titleis == undefined ? titleisName : titleis}</h2>
                <div class="info">
                    <p>Rating: <span class="rating">${rating}</span></p>
                    <p>Votes: <span class="votecount">${votes}</span></p>
                </div>

                <div class="button">
                <button class="WatchNow" id="${movieId}"> WatchNow</button>
                <button class="WatchList" id="${movieId}">WatchList+</button>
                </div>
                </div>`;
            personPopularSection.append(popularcards);


        }

        const watchNowBtnsgetting = personPopularSection.querySelectorAll(".WatchNow");

        watchNowBtnsgetting.forEach((btns) => {
            btns.addEventListener("click", (e) => {
                watchNowBtnsId = e.target.id;
                localStorage.setItem("MymovieId", watchNowBtnsId);
                window.location.href = "../details.html";
            })

        });



    } catch (error) {
        console.log(error)
    }

}


// ----------------catogerysection-------------------------


async function catogerysection() {

    try {
        let h3Array = [];

        const responce = await fetch("https://api.themoviedb.org/3/genre/movie/list?api_key=20f9ed2296f2b4b0100817e7a4262e8f");

        const catgegoryname = await responce.json()

        for (let index = 0; index < catgegoryname.genres.length; index++) {
            const h3 = document.createElement("h3");
            h3.innerText = catgegoryname.genres[index].name;
            catogeryname.append(h3);

            h3.addEventListener("click", (e) => {
                removeAllh3Bg();
                h3.style.backgroundColor = "red"
                const catogeryName = e.target.innerText;
                e.target.style.backgroundColor = "#b4b4b4";
                updateThePopularByCatogery(catogeryName)

            });

            h3Array.push(h3);
        }

        function removeAllh3Bg() {
            h3Array.forEach((h3item) => {
                h3item.style.backgroundColor = "#585858";
            });
        }



    } catch (error) {
        console.log(error)
    }

}

// ------------------updateThePopularByCatogery---------------------------

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
                    <h2 class="title">${titleis.slice(0, 15)}</h2>
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


// ---------------Search----submitbtn----------------------------------


submitbtn.addEventListener("click", (e) => {
    e.preventDefault();
    searchitemsfunction(searchboxinput.value);
});


async function searchitemsfunction(searchvalue) {

    try {

        let pageNumber = 1;

        const responce = await fetch(`https://api.themoviedb.org/3/search/collection?api_key=20f9ed2296f2b4b0100817e7a4262e8f&query=${searchvalue}&page=${pageNumber}`);
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
                        <h2 class="title">${titleis.slice(0, 15)}</h2>
                        <div class="info">
                            <p class="overview">${overview.slice(0, 131)}...</p>
                        </div>
                        </div>`;

                searchitems.append(searchcards);
            }


        }

        searchitembox.style.display = "block";
        searchboxinput.value = "";

    } catch (error) {
        console.log(error)
    }


}



