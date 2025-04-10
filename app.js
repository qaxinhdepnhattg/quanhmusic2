// script.js

// Navigation functions to switch pages
function chuyen_trangHome() {
  window.location.assign("in.html");
}

function chuyen_trangInfor() {
  window.location.assign("infor.html");
}

function chuyen_trangNhac() {
  window.location.assign("song.html");
}

function chuyen_trangDangki() {
  window.location.assign("signup.html");
}

function chuyen_trangDangnhap() {
  window.location.assign("login.html");
}
function chuyen_trangDash() {
  window.location.assign("dashboard.html");
}

// Get the containers where we'll display songs and artists
const hotsongContainer = document.getElementById('hotsong');
const hotartistContainer = document.getElementById('hotartist');

// Function to fetch songs from an API
function fetchSongs() {
  return fetch('https://67f7b1152466325443ea4d4b.mockapi.io/songs')
      .then(response => {
          // Check if the response is okay
          if (!response.ok) {
              throw new Error('Could not fetch songs');
          }
          return response.json(); // Convert the response to JSON
      })
      .catch(error => {
          console.log('Error fetching songs:', error);
          return []; // Return an empty array if there's an error
      });
}

// Function to fetch artists from an API
function fetchArtists() {
  return fetch('https://api.example.com/artists')
      .then(response => {
          // Check if the response is okay
          if (!response.ok) {
              throw new Error('Could not fetch artists');
          }
          return response.json(); // Convert the response to JSON
      })
      .catch(error => {
          console.log('Error fetching artists:', error);
          return []; // Return an empty array if there's an error
      });
}

// Function to display songs in the hotsong container
function displaySongs(songs) {
  hotsongContainer.innerHTML = ''; // Clear the container first

  // Loop through each song and create a card for it
  songs.forEach(song => {
      // Create a div for the card
      const card = document.createElement('div');
      card.className = 'card';

      // Add the song image
      const img = document.createElement('img');
      img.src = song.image;
      img.alt = song.title;
      card.appendChild(img);

      // Add the song title
      const title = document.createElement('div');
      title.className = 'card-title';
      title.textContent = song.title;
      card.appendChild(title);

      // Add the artist name
      const artist = document.createElement('div');
      artist.className = 'card-description';
      artist.textContent = song.artist;
      card.appendChild(artist);

      // Make the card clickable to go to the song page
      card.addEventListener('click', () => {
          window.location.assign(
              `song.html?id=${song.id}&audio=${encodeURIComponent(song.audio)}&title=${encodeURIComponent(song.title)}&artist=${encodeURIComponent(song.artist)}&image=${encodeURIComponent(song.image)}`
          );
      });

      // Add the card to the container
      hotsongContainer.appendChild(card);
  });
}

// Function to display artists in the hotartist container
function displayArtists(artists) {
  hotartistContainer.innerHTML = ''; // Clear the container first

  // Loop through each artist and create a card for it
  artists.forEach(artist => {
      // Create a div for the card
      const card = document.createElement('div');
      card.className = 'card';

      // Add the artist image
      const img = document.createElement('img');
      img.src = artist.image;
      img.alt = artist.name;
      card.appendChild(img);

      // Add the artist name
      const name = document.createElement('div');
      name.className = 'card-title';
      name.textContent = artist.name;
      card.appendChild(name);

      // Add the card to the container
      hotartistContainer.appendChild(card);
  });
}

// Function to load all data and display it
function loadData() {
  // Fetch songs and display them
  fetchSongs().then(songs => {
      if (songs.length > 0) {
          displaySongs(songs);
      } else {
          hotsongContainer.innerHTML = '<p>No songs found.</p>';
      }
  });

  // Fetch artists and display them
  fetchArtists().then(artists => {
      if (artists.length > 0) {
          displayArtists(artists);
      } else {
          hotartistContainer.innerHTML = '<p>No artists found.</p>';
      }
  });
}

// Load the data when the page is ready
document.addEventListener('DOMContentLoaded', loadData);