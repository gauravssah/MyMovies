const homedisplayimages = document.querySelector(".displaysection");
const navactionlist = document.querySelectorAll(".navactionlist li");
const tital = document.title;
const personPopularSection = document.querySelector(".personPopularSection");
const catogeryname = document.querySelector(".catogeryname");






if (tital == "My Movies - Your go-to destination for a vast collection of movies and series.") {
    // console.log("Home");
    navactionlist[0].style.opacity = "1";
} else if (tital == "Movies - Your go-to destination for a vast collection of movies and series.") {
    // console.log("movies");
    navactionlist[1].style.opacity = "1";
}
else {
    navactionlist[2].style.opacity = "1";
    // console.log("tv");
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

        // console.log(data.page);
        // console.log(data.total_pages);
        // console.log(pageNumber)


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

        // console.log(catogName.total_results)
        // console.log(catogName.results[0])
        // console.log(catogName.results[0].original_name);
        // console.log(catogName.results[0].poster_path);
        // console.log(catogName.results[0].overview);

    } catch (error) {
        console.log(error)
    }


}