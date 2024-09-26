const apiKey = 'f5b0dcf8'; 
const apiUrl = 'https://www.omdbapi.com/?apikey=' + apiKey + '&t=';

function searchMovie() {
    let query = document.getElementById('movieName').value.trim();
    if (!query) {
        alert('Please enter a movie name. ✨');
        return;
    }

    let search = apiUrl + query;

    fetch(search)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok 🤔');
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
            alert(error.message);
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

    document.getElementById('movieContainer').style.display = 'flex';
    loadReviews(data.Title);
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}

function shareOnTwitter() {
    const title = document.getElementById('title').innerText;
    const ratings = document.getElementById('ratings').innerText;
    const summary = document.getElementById('desc').innerText;
    const url = `https://twitter.com/intent/tweet?text=🎬 Check out this movie: *${title}* 🚀, Rating: *${ratings}/10* ⭐️. Summary: *${summary}* 💬`;
    window.open(url, '_blank');
}

function shareOnFacebook() {
    const title = document.getElementById('title').innerText;
    const ratings = document.getElementById('ratings').innerText;
    const summary = document.getElementById('desc').innerText;
    const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`🎬 Movie: *${title}* 🚀, Rating: *${ratings}/10* ⭐️, Summary: *${summary}* 💬`)}`;
    window.open(fbUrl, '_blank');
}

function shareOnWhatsApp() {
    const title = document.getElementById('title').innerText;
    const ratings = document.getElementById('ratings').innerText;
    const summary = document.getElementById('desc').innerText;
    const waUrl = `https://api.whatsapp.com/send?text=🎬 *Vibe check of this movie *: ${title} 🚀,⭐️.*Summary*:${summary} 💬, ❤ Review : ${ratings} `;
    window.open(waUrl, '_blank');
}

// Watchlist Feature
let watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];

function addToWatchlist() {
    const title = document.getElementById('title').innerText;
    if (!watchlist.includes(title)) {
        watchlist.push(title);
        localStorage.setItem('watchlist', JSON.stringify(watchlist));
        alert(`🎉 ${title} has been added to your watchlist!`);
    } else {
        alert(`😔 ${title} is already in your watchlist.`);
    }
}

// Reviews Feature
function submitReview() {
    const title = document.getElementById('title').innerText;
    const reviewText = document.getElementById('reviewInput').value.trim();
    if (!reviewText) {
        alert('Please write a review before submitting. 📝');
        return;
    }

    const review = {
        movie: title,
        text: reviewText,
        date: new Date().toLocaleString()
    };

    const reviews = JSON.parse(localStorage.getItem('reviews')) || {};
    if (!reviews[title]) {
        reviews[title] = [];
    }
    reviews[title].push(review);
    localStorage.setItem('reviews', JSON.stringify(reviews));
    document.getElementById('reviewInput').value = '';
    loadReviews(title);
}

function loadReviews(title) {
    const reviews = JSON.parse(localStorage.getItem('reviews')) || {};
    const reviewsContainer = document.getElementById('reviews');
    reviewsContainer.innerHTML = '';

    if (reviews[title]) {
        reviews[title].forEach(review => {
            const reviewDiv = document.createElement('div');
            reviewDiv.classList.add('review');
            reviewDiv.innerHTML = `<strong>${review.date}:</strong> ${review.text}`;
            reviewsContainer.appendChild(reviewDiv);
        });
    }
}
