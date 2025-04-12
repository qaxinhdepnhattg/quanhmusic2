// app.js

// Navigation functions
function chuyen_trangHome() {
  window.location.assign("index.html");
}
function chuyen_trangInfor() {
  window.location.assign("infor.html");
}
function chuyen_trangDash() {
  window.location.assign("dashboard.html"); 
}
function chuyen_trangEvent() {
  window.location.assign("event.html"); 
}
function chuyen_trangNhac() {
  window.location.assign("song.html");
}
function chuyen_trangDangki(){
	window.location.assign("signup.html")
}
function chuyen_trangDangnhap(){
	window.location.assign("login.html")}
// Get elements
const hotsongContainer = document.getElementById('hotsong');
const hotartistContainer = document.getElementById('hotartist');
const leftArrow = document.querySelector('.left-arrow');
const rightArrow = document.querySelector('.right-arrow');
const pageIndicator = document.querySelector('.nav-arrows span');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

// Toggle hamburger menu
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// API URL for artists (replace with your actual API endpoint or local file)
const ARTISTS_API_URL = 'https://67f7b1152466325443ea4d4b.mockapi.io/singers';

// Fetch songs
function fetchSongs() {
  return fetch('https://67f7b1152466325443ea4d4b.mockapi.io/songs') // Replace with your API endpoint
      .then(response => {
          if (!response.ok) {
              throw new Error('Could not fetch songs');
          }
          return response.json();
      })
      .catch(error => {
          console.log('Error fetching songs:', error);
          return [];
      });
}

// Fetch artists from API
function fetchArtists() {
  return fetch(ARTISTS_API_URL)
      .then(response => {
          if (!response.ok) {
              throw new Error('Could not fetch artists');
          }
          return response.json();
      })
      .catch(error => {
          console.log('Error fetching artists:', error);
          return [];
      });
}

// Display songs
function displaySongs(songs) {
  hotsongContainer.innerHTML = '';
  songs.forEach(song => {
      const card = document.createElement('div');
      card.className = 'card';

      const img = document.createElement('img');
      img.src = song.image;
      img.alt = song.title;
      card.appendChild(img);

      const title = document.createElement('div');
      title.className = 'card-title';
      title.textContent = song.title;
      card.appendChild(title);

      const artist = document.createElement('div');
      artist.className = 'card-description';
      artist.textContent = song.artist;
      card.appendChild(artist);

      card.addEventListener('click', () => {
          window.location.assign(
              `song.html?id=${song.id}&audio=${encodeURIComponent(song.audio)}&title=${encodeURIComponent(song.title)}&artist=${encodeURIComponent(song.artist)}&image=${encodeURIComponent(song.image)}`
          );
      });

      hotsongContainer.appendChild(card);
  });
}

// Display artists with hover effect
function displayArtists(artists) {
  hotartistContainer.innerHTML = '';
  artists.forEach(artist => {
      const card = document.createElement('div');
      card.className = 'artist-card';
      card.style.backgroundImage = `url(${artist.pic})`;

      const info = document.createElement('div');
      info.className = 'artist-info';
      info.innerHTML = `
          <h3>${artist.artistName}</h3>
          <p>${artist.artistInfo}</p>
      `;
      card.appendChild(info);

      hotartistContainer.appendChild(card);
  });
}

// Pagination for artists
let currentPage = 1;
let artistsPerPage = window.innerWidth <= 768 ? 4 : 8; // Adjust based on screen size

function updateArtistPage(artists) {
  const start = (currentPage - 1) * artistsPerPage;
  const end = start + artistsPerPage;
  const paginatedArtists = artists.slice(start, end);
  displayArtists(paginatedArtists);

  const totalPages = Math.ceil(artists.length / artistsPerPage);
  pageIndicator.textContent = `${currentPage} / ${totalPages}`;

  leftArrow.disabled = currentPage === 1;
  rightArrow.disabled = currentPage === totalPages;
}

// Load data when the page loads
function loadData() {
  fetchSongs().then(songs => {
      if (songs.length > 0) {
          displaySongs(songs);
      } else {
          hotsongContainer.innerHTML = '<p>No songs found.</p>';
      }
  });

  fetchArtists().then(artists => {
      if (artists.length > 0) {
          updateArtistPage(artists);
      } else {
          hotartistContainer.innerHTML = '<p>No artists found.</p>';
      }
  });
}

// Navigation arrow event listeners
leftArrow.addEventListener('click', () => {
  if (currentPage > 1) {
      currentPage--;
      fetchArtists().then(artists => updateArtistPage(artists));
  }
});

rightArrow.addEventListener('click', () => {
  fetchArtists().then(artists => {
      const totalPages = Math.ceil(artists.length / artistsPerPage);
      if (currentPage < totalPages) {
          currentPage++;
          updateArtistPage(artists);
      }
  });
});

// Update artists per page on window resize
window.addEventListener('resize', () => {
  const newArtistsPerPage = window.innerWidth <= 768 ? 4 : 8;
  if (newArtistsPerPage !== artistsPerPage) {
      artistsPerPage = newArtistsPerPage;
      currentPage = 1; // Reset to first page
      fetchArtists().then(artists => updateArtistPage(artists));
  }
});

// Load data when the page is ready
document.addEventListener('DOMContentLoaded', loadData);