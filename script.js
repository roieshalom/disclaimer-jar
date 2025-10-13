let euroCount = 0;
const maxEuros = 20; // You can adjust if needed

const addBtn = document.getElementById('add-coin');
const emptyBtn = document.getElementById('empty-jar');
const counter = document.getElementById('counter');
const coinsDiv = document.getElementById('coins');

// Initialize from localStorage (optional)
if (localStorage.getItem('euroCount')) {
  euroCount = parseInt(localStorage.getItem('euroCount'));
  updateJar();
}

function animateCoin() {
  // Create coin element
  const coin = document.createElement('img');
  coin.src = 'assets/euro.svg'; // Use your coin SVG here
  coin.className = 'coin';

  coinsDiv.appendChild(coin);

  // Animate to jar area: adjust '200px' as the bottom of the jar image
  setTimeout(() => {
    coin.style.top = '200px';
  }, 30);

  // Fade out and remove after animation
  setTimeout(() => {
    coin.style.opacity = '0';
  }, 750);

  setTimeout(() => {
    coin.remove();
  }, 1000);
}

function updateJar() {
  counter.textContent = `${euroCount} €`;
  localStorage.setItem('euroCount', euroCount); // Optional
}

addBtn.onclick = () => {
  euroCount++;
  updateJar();
  animateCoin();
};

emptyBtn.onclick = () => {
  euroCount = 0;
  updateJar();
};

updateJar();
