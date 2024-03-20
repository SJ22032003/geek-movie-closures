const searchInput = document.getElementById("search-movies");
const moviesContainer = document.getElementById("movies-container");
const paginationContainer = document.getElementById("pagination-container");

const API_KEY = "e48a43b1";
const BASE_URL = `https://www.omdbapi.com/?i=tt3896198&apikey=${API_KEY}`;

// debounce the search function
const debounce = (fn, delay) => {
  // if we don't use timer, the function will be called every time the user types a letter
  // because the event listener is listening for the input event
  let timer; // undefined , initially. It also a good example of closures

  return () => {
    timer && clearTimeout(timer); // if timer is defined, clear it
    // if timer is not defined, set it to run the function after the delay
    timer = setTimeout(() => {
      fn();
    }, delay);
  };
};

// Create function to fetch movies
async function fetchMovies(page = 1) { // give example by not passing page || without pagination
  // if search input is empty, return. It helps to limit the number of requests
  if (searchInput.value === "") return;
  const response = await fetch(`${BASE_URL}&s=${searchInput.value}&page=${page}`, {
    method: "GET",
  });
  const resp = await response.json(); // convert response to json

  resp.Response === "False"
    ? responseIsFalse()
    : displayMoviesContainer(page, resp);
}

// Add event listener to search input with debounce
searchInput.addEventListener("input", debounce(fetchMovies, 1000));

// HELPERS FUNCTIONS

// IF THE RESPONSE IS FALSE SHOW NO MOVIES FOUND
const responseIsFalse = (isEmpty) => {
  isEmpty
    ? (moviesContainer.innerHTML = `<h2>Search for a movie</h2>`)
    : (moviesContainer.innerHTML = `<h2>No movies found for ${searchInput.value}, please search for something else</h2>`);

  paginationContainer.innerHTML = "";
};

// DISPLAY MOVIES CONTAINER
const displayMoviesContainer = (page, { Search, totalResults }) => {
  moviesContainer.innerHTML = "";
  Search.forEach((movie) => {
    moviesContainer.append(createMovieCard(movie));
  });
  displayPagination(page, totalResults);
};

// CREATE MOVIE CARD
const createMovieCard = (movie) => {
  const card = document.createElement("div");
  card.className = "movie-card";
  card.innerHTML = `
    <img src="${movie.Poster}" alt="${movie.Title}" />
    <p>${movie.Title}</p>
    <p>${movie.Year}</p>
  `;
  return card;
};

// DISPLAY PAGINATION
const displayPagination = (currentPage, totalResults) => {
  // there are 10 movies per page, so we divide the total results by 10
  // ceil is used to round up the number, how? 
  //ceil will round up the number to the nearest integer so 919/10 = 91.9, ceil will round it up to 92
  const totalPages = Math.ceil(totalResults / 10); 
  paginationContainer.innerHTML = `
    <button onclick="fetchMovies(${currentPage - 1})" ${
    currentPage === 1 ? "disabled" : ""
  }>Previous</button>
    <span>${currentPage} of ${totalPages}</span>
    <button onclick="fetchMovies(${currentPage + 1})" ${
    currentPage === totalPages ? "disabled" : ""
  }>Next</button>
  `;
};
