// Populate movie options in review form by reading from the HTML
function populateReviewFormOptions() {
  const select = document.getElementById('movie-title');
  const movieCards = document.querySelectorAll('.movie-card');
  
  // Create a Set to avoid duplicate titles (just in case)
  const movieTitles = new Set();
  movieCards.forEach(card => {
      const title = card.getAttribute('data-title');
      if (title) {
          movieTitles.add(title);
      }
  });

  // Sort titles alphabetically for the dropdown
  const sortedTitles = Array.from(movieTitles).sort();
  sortedTitles.forEach(title => {
      const option = document.createElement('option');
      option.value = title;
      option.textContent = title;
      select.appendChild(option);
  });
}

// Submit a review (no saving, just clears the form)
function submitReview(event) {
  event.preventDefault();

  // Optionally log the review to the console
  const title = document.getElementById('movie-title').value;
  const rating = document.getElementById('rating').value;
  const text = document.getElementById('review-text').value;
  console.log(`Review Submitted: ${title}, Rating: ${rating}, Text: ${text}`);

  // Clear the form
  document.getElementById('review-form-element').reset();
}

// Search movies by showing/hiding static HTML elements
function searchMovies() {
  const query = document.getElementById('search-input').value.toLowerCase();
  const movieCards = document.querySelectorAll('.movie-card');

  movieCards.forEach(card => {
      const title = card.getAttribute('data-title');
      if (title && title.toLowerCase().includes(query)) {
          card.style.display = 'flex'; // Show matching cards
      } else {
          card.style.display = 'none'; // Hide non-matching cards
      }
  });
}

// Populate recommended movies (no ratings, so just take the first 3)
function populateRecommendations() {
  const recommendedGrid = document.getElementById('recommended-movies');
  const movieCards = Array.from(document.querySelectorAll('.movie-card'));

  // Since ratings are removed, just take the first 3 movies
  recommendedGrid.innerHTML = '';
  movieCards.slice(0, 3).forEach(movie => {
      const clone = movie.cloneNode(true);
      recommendedGrid.appendChild(clone);
  });
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
  populateReviewFormOptions();
  populateRecommendations();
});