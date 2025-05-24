const audio = document.getElementById('audio');
const playPauseBtn = document.getElementById('play-pause');
const nextBtn = document.getElementById('next');
const prevBtn = document.getElementById('prev');
const shuffleBtn = document.getElementById('shuffle');
const repeatBtn = document.getElementById('repeat');
const progressBar = document.getElementById('progress-bar');
const currentTimeEl = document.getElementById('current-time');
const totalTimeEl = document.getElementById('total-time');
const coverImg = document.getElementById('cover-img');
const songTitle = document.getElementById('song-title');
const songArtist = document.getElementById('song-artist');

let isPlaying = false;
let isShuffle = false;
let isRepeat = false;

const songs = [
  {
    title: "Aaoge Jab Tum",
    artist: "Rashid Khan",
    src: "SONGS/aaoge.mp3",
    cover: "COVERS/1.jpg",
    duration: "6:14"
  },
  {
    title: "Abhi Na Jao Chhod Kar",
    artist: "Asha Bhosale, Mohammad Rafi",
    src: "SONGS/abhi.mp3",
    cover: "COVERS/2.jpg",
    duration: "4:07"
  },
  {
    title: "Jag Ghumeya",
    artist: "Rahat Fateh Ali Khan",
    src: "SONGS/jag.mp3",
    cover: "COVERS/3.jpg",
    duration: "4:36"
  },
   {
    title: "Khamoshiyan",
    artist: "Arijit Singh",
    src: "SONGS/Khamoshiyan .mp3",
    cover: "COVERS/4.jpg",
    duration: "5:35"
  },
   {
    title: "Jhol",
    artist: "Mannu,Anural Khalid",
    src: "SONGS/jhol.mp3",
    cover: "COVERS/5.jpg",
    duration: "2:58"
  }
];

let currentIndex = 0;

// Load song data into UI and audio
function loadSong(index) {
  const song = songs[index];
  audio.src = song.src;
  songTitle.textContent = song.title;
  songArtist.textContent = song.artist;
  coverImg.src = song.cover;
  totalTimeEl.textContent = song.duration;
  progressBar.value = 0;
  currentTimeEl.textContent = "0:00";
}

// Play audio
function playSong() {
  audio.play();
  isPlaying = true;
  playPauseBtn.classList.add('playing');
}

// Pause audio
function pauseSong() {
  audio.pause();
  isPlaying = false;
  playPauseBtn.classList.remove('playing');
}

// Toggle play/pause
playPauseBtn.addEventListener('click', () => {
  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

// Next song
nextBtn.addEventListener('click', () => {
  if (isShuffle) {
    shuffleSong();
  } else {
    currentIndex = (currentIndex + 1) % songs.length;
  }
  loadSong(currentIndex);
  playSong();
});

// Previous song
prevBtn.addEventListener('click', () => {
  if (isShuffle) {
    shuffleSong();
  } else {
    currentIndex = (currentIndex - 1 + songs.length) % songs.length;
  }
  loadSong(currentIndex);
  playSong();
});

// Shuffle toggle
shuffleBtn.addEventListener('click', () => {
  isShuffle = !isShuffle;
  shuffleBtn.classList.toggle('active', isShuffle);
});

// Repeat toggle
repeatBtn.addEventListener('click', () => {
  isRepeat = !isRepeat;
  repeatBtn.classList.toggle('active', isRepeat);
  audio.loop = isRepeat;
});

// Shuffle function
function shuffleSong() {
  let randomIndex = Math.floor(Math.random() * songs.length);
  while (randomIndex === currentIndex && songs.length > 1) {
    randomIndex = Math.floor(Math.random() * songs.length);
  }
  currentIndex = randomIndex;
}

// Update progress bar & time
audio.addEventListener('timeupdate', () => {
  if (audio.duration) {
    const progressPercent = (audio.currentTime / audio.duration) * 100;
    progressBar.value = progressPercent;

    // Format current time mm:ss
    let minutes = Math.floor(audio.currentTime / 60);
    let seconds = Math.floor(audio.currentTime % 60);
    if (seconds < 10) seconds = "0" + seconds;
    currentTimeEl.textContent = `${minutes}:${seconds}`;
  }
});

// Seek when user moves progress bar
progressBar.addEventListener('input', () => {
  if (audio.duration) {
    const seekTime = (progressBar.value / 100) * audio.duration;
    audio.currentTime = seekTime;
  }
});

// When song ends
audio.addEventListener('ended', () => {
  if (!isRepeat) {
    if (isShuffle) {
      shuffleSong();
    } else {
      currentIndex = (currentIndex + 1) % songs.length;
    }
    loadSong(currentIndex);
    playSong();
  }
});

// Initial load
loadSong(currentIndex);
