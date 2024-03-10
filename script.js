// Add your API key here
const apiKey = "YOUR_MOVIEDB_API_KEY";

const url =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&page=3";

const imgPath = "https://image.tmdb.org/t/p/w1280";

const endpoint = url + "&api_key=" + apiKey;
const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${ apiKey }&query=`;

const moviesContainer = document.getElementById("movies-container");
const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search");

getMovie(endpoint);

async function getMovie(endpoint) {
  const res = await fetch(endpoint);
  const data = await res.json();

  showMovies(data.results);
}

function showMovies(movies) {
  moviesContainer.innerHTML = "";

  movies.forEach((movie) => {
    const { title, poster_path, vote_average, overview } = movie;

    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");

    movieEl.innerHTML = `
            <img src="${imgPath + poster_path}" alt="${title}">

            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${addClassByRate(
                  vote_average
                )}">${vote_average}</span>
            </div>

            <div class="overview">
                <h3>Overview</h3>
                ${overview}
            </div>
        `;

    moviesContainer.appendChild(movieEl);
  });
}

function addClassByRate(vote) {
  if (vote >= 8) {
    return "green";
  } else if (vote >= 5) {
    return "orange";
  } else {
    return "red";
  }
}

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchTerm = searchInput.value;

  if (searchTerm && searchTerm !== "") {
    console.log(searchUrl + searchTerm);
    getMovie(searchUrl + searchTerm);

    search.value = "";
  } else {
    window.location.reload();
  }
});

const messageForm = document.getElementById("message-form");
messageForm.addEventListener("submit", function (e) {
  e.preventDefault();

  // Telegram chatbot API key
  const chatId = "BOT_CHAT_ID";
  
  // Telegram chatbot API key
  const apiKey = "TELEGRAM_BOT_API_KEY";
  const message = document.getElementById("msg-input").value;
  const messageSender = document.getElementById("msg-sender").value;

  fetch(`https://api.telegram.org/bot${apiKey}/sendMessage`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      chat_id: chatId,
      text: `${messageSender} : ${message}`,
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error sending message");
      }
      return response.json();
    })
    .then((data) => {
      messageForm.reset();
      console.log(data);
      alert("Message sent successfully!");
    })
    .catch((error) => {
      console.error(error);
      alert("Error sending message: " + error.message);
    });
});
