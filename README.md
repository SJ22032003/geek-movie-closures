# Movie Search Application

This project is a simple movie search application that fetches data from the OMDB API. It allows users to search for movies and displays the results in a paginated format.

## Features

- Search movies by title
- Display movie details including title, year, and poster
- Pagination support

## Implementation Details

The project is implemented using vanilla JavaScript. It uses the `fetch` API to make requests to the OMDB API. The search functionality is debounced to limit the number of requests made to the API. This is achieved using closures in JavaScript.

### Closures

In this project, closures are used in the implementation of the debounce function. The debounce function limits the rate at which a function can fire. This is particularly useful in this case to limit the number of API requests made as the user types in the search input.

A closure is a function that has access to its own scope, the scope of the outer function, and the global scope. In the debounce function, a timer is initialized in the outer scope and the returned function has access to this timer due to closures. This allows the function to clear the timer and set a new one every time it is called.

## How to Use

To use the application, simply type in the movie title in the search input. The application will display the results as you type.

## Learning Outcomes

This project is a great way to understand the concept of closures in JavaScript and how to use them in real-world applications. It also provides a practical example of how to interact with APIs using the `fetch` API.