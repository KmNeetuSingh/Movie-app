const apiKey = 'f5b0dcf8';
const apiUrl = 'https://www.omdbapi.com/?apikey=' + apiKey + '&t=';

function searchMovie() {
    let query = document.getElementById('movieName').value.trim();
    if (!query) {
        alert('Please enter a movie name.');
        return;
    }

    let search = apiUrl + query;

    fetch(search)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (data.Error) {
                throw new Error(data.Error);
            }

            updateMovieDetails(data);
        })
        .catch(error => {
            console.error('Error:', error.message);
            // Handle the error (e.g., display an error message on the webpage)
        });
}

function updateMovieDetails(data) {
    document.getElementById('title').innerText = data.Title;
    document.getElementById('desc').innerText = data.Plot;
    document.getElementById('genre').innerText = data.Genre;
    document.getElementById('actors').innerText = data.Actors;
    document.getElementById('directors').innerText = data.Director;
    document.getElementById('awards').innerText = data.Awards;
    document.getElementById('collection').innerText = data.BoxOffice;
    document.getElementById('ratings').innerText = data.imdbRating;
    document.getElementById('writers').innerText = data.Writer;
    document.getElementById('poster').src = data.Poster;
}