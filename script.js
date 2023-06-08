


let pageNumber = 1;



function page(){

const url = 'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page='+pageNumber+'&api_key=94faeb78155c6669b53e08b319d39802';

fetch(url).then((res) => res.json()).then(data => {
    data.results.forEach((movie) => {
        generateCards(movie)
    })
})
}

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
    rating.classList.add('rating')
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
    image.src = "https://image.tmdb.org/t/p/w342" + movieObject.poster_path;
    document.body.insertBefore(image, avereageContainer);

    //create title
    let title = document.createElement('div');
    title.classList.add('name');
    let nameConent = document.createTextNode(movieObject.original_title)
    title.appendChild(nameConent);
    //or you can do name.innerText = movieObject.original_title
    document.body.insertBefore(title, avereageContainer.nextSibling)


    //create section
    let movie = document.createElement('section');
    movie.classList.add('movie')
    movie.appendChild(image)
    movie.appendChild(avereageContainer)
    movie.appendChild(title);
    document.body.appendChild(movie)
}



window.onload = function (){
    page()
}

document.getElementById('loadButton').addEventListener('click', () => {
    pageNumber++
    page();
})