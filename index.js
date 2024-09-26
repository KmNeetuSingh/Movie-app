const apiKey = 'f5b0dcf8';
const apiUrl = 'https://www.omdbapi.com/?apikey=' + apiKey + '&t=';

function searchMovie() {
    let query = document.getElementById('movieName').value.trim();
    if (!query) {
        alert('Please enter a movie name.');
        return;
    }

    // Show loading message
    document.getElementById('movieContainer').style.display = 'none';
    document.getElementById('title').innerText = 'Loading...'; // Show loading state

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
            document.getElementById('title').innerText = 'Error: ' + error.message; // Display error message
        });
}

function updateMovieDetails(data) {
    document.getElementById('title').innerText = data.Title;
    document.getElementById('desc').innerText = data.Plot;
    document.getElementById('genre').innerText = data.Genre;
    document.getElementById('actors').innerText = data.Actors;
    document.getElementById('directors').innerText = data.Director;
    document.getElementById('awards').innerText = data.Awards;
    document.getElementById('collection').innerText = data.BoxOffice || "N/A"; // Handle missing data
    document.getElementById('ratings').innerText = data.imdbRating || "N/A"; // Handle missing data
    document.getElementById('writers').innerText = data.Writer || "N/A"; // Handle missing data
    document.getElementById('poster').src = data.Poster || ''; // Handle missing poster

    // Show the movie container after updating details
    document.getElementById('movieContainer').style.display = 'flex';
}
