


let pageNumber = 1;
let searchBar = document.getElementById('search-input')
let movieContainer = document.getElementById('movie-grid')
let exitButton = document.getElementById('close-search-btn')


function page(){

const url = 'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page='+pageNumber+'&api_key=94faeb78155c6669b53e08b319d39802';

fetch(url).then((res) => res.json()).then(data => {
    data.results.forEach((movie) => {
        generateCards(movie)
    })
})
}


function searchMovies(){
searchBar.addEventListener('keydown', (event) => {
    // console.log(movieContainer);
    console.log(event.key)
    pageNumber = 1;
    if (event.key === "Enter") {
        movieContainer.innerHTML = ""
    if (searchBar.value) {
        const searchURL = `https://api.themoviedb.org/3/search/movie?query=${searchBar.value}&include_adult=false&language=en-US&page=${pageNumber}&api_key=94faeb78155c6669b53e08b319d39802`

        fetch(searchURL).then(response => response.json()).then(data => {
            data.results.forEach((movie) =>{
                    generateCards(movie)
                })
            })
        
            }
            else {
            
                page();
            }
    }
    

        })
    }


    exitButton.addEventListener("click", (event) => {
        pageNumber =1;
        event.preventDefault()
        movieContainer.innerHTML = ""
        searchBar.value = ''
        page();
    })



        
  






function generateCards(movieObject)
{
    //create star
    let star = document.createElement('span');
    star.classList.add('star')
    let starContent = document.createTextNode('⭐️');
    star.appendChild(starContent);
    // document.body.appendChild(star);

    //create rating
    let rating = document.createElement('span');
    rating.classList.add('movie-votes')
    let ratingConent = document.createTextNode(movieObject.vote_average);
    rating.appendChild(ratingConent);
    // document.body.appendChild(rating);

    //create average container
    let avereageContainer = document.createElement('div')
    avereageContainer.classList.add('average')
    avereageContainer.appendChild(star);
    avereageContainer.appendChild(rating);
    document.body.appendChild(avereageContainer);

    //create image
    let image = document.createElement('img');
    image.classList.add('movie-poster')
    image.src = "https://image.tmdb.org/t/p/w342" + movieObject.poster_path;
    document.body.insertBefore(image, avereageContainer);

    //create title
    let title = document.createElement('div');
    title.classList.add('movie-title');
    let nameConent = document.createTextNode(movieObject.original_title)
    title.appendChild(nameConent);
    //or you can do name.innerText = movieObject.original_title
    document.body.insertBefore(title, avereageContainer.nextSibling)


    //create section
    let movie = document.createElement('section');
    movie.classList.add('movie-card')
    movie.appendChild(image)
    movie.appendChild(avereageContainer)
    movie.appendChild(title);
    movieContainer.appendChild(movie)
}





window.onload = function (){
    page();
    searchMovies();
}

document.getElementById('load-more-movies-btn').addEventListener('click', (event) => {

    event.preventDefault();
    pageNumber++
    
    if (searchBar.value) {
        const searchURL = `https://api.themoviedb.org/3/search/movie?query=${searchBar.value}&include_adult=false&language=en-US&page=${pageNumber}&api_key=94faeb78155c6669b53e08b319d39802`

        fetch(searchURL).then(response => response.json()).then(data => {
            data.results.forEach((movie) =>{
                    generateCards(movie)
                })
            })
    }
    else
    {
        page()
    }

})