let euroCount = 0;
const maxEuros = 20; // You can adjust how 'full' the jar gets

// Remove jarFill and coin
const addBtn = document.getElementById('add-coin');
const emptyBtn = document.getElementById('empty-jar');
const counter = document.getElementById('counter');
const coinSound = document.getElementById('coin-sound');

// Initialize from localStorage (optional)
if (localStorage.getItem('euroCount')) {
  euroCount = parseInt(localStorage.getItem('euroCount'));
  updateJar();
}

// Coin animation function (works if you have a coin image for visual feedback, or remove if unused)
function animateCoin() {
  // This function can be removed if you don’t want a coin animation
  // Remove or comment out if not used visually
}

function updateJar() {
  counter.textContent = `${euroCount} €`;
  localStorage.setItem('euroCount', euroCount); // Optional
}

addBtn.onclick = () => {
  euroCount++;
  // animateCoin(); // Uncomment if you add your coin animation logic back
  if (coinSound) {
    coinSound.currentTime = 0;
    coinSound.play();
  }
  updateJar();
};

emptyBtn.onclick = () => {
  euroCount = 0;
  updateJar();
};

updateJar();
