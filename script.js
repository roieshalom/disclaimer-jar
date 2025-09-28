let euroCount = 0;
const maxEuros = 20; // You can adjust how 'full' the jar gets

const jarFill = document.getElementById('jar-fill');
const coin = document.getElementById('coin');
const addBtn = document.getElementById('add-coin');
const emptyBtn = document.getElementById('empty-jar');
const counter = document.getElementById('counter');
const coinSound = document.getElementById('coin-sound');

// Initialize from localStorage (optional)
if(localStorage.getItem('euroCount')) {
  euroCount = parseInt(localStorage.getItem('euroCount'));
  updateJar();
}

// Coin animation function
function animateCoin() {
  coin.style.display = 'block';
  coin.style.top = '10px';
  let pos = 10;
  let interval = setInterval(() => {
    if (pos < 180) {
      pos += 10;
      coin.style.top = pos + 'px';
    } else {
      clearInterval(interval);
      coin.style.display = 'none';
    }
  }, 18);
}

function updateJar() {
  counter.textContent = `${euroCount} €`;
  // Fill effect: height increases with coin count
  jarFill.style.height = `${Math.min(euroCount, maxEuros) * (160/maxEuros)}px`;
  if(euroCount > maxEuros){
    jarFill.style.height = '160px'; // Max fill
  }
  localStorage.setItem('euroCount', euroCount); // Optional
}

addBtn.onclick = () => {
  euroCount++;
  animateCoin();
  coinSound.currentTime = 0;
  coinSound.play();
  updateJar();
};

emptyBtn.onclick = () => {
  euroCount = 0;
  updateJar();
};

updateJar();
