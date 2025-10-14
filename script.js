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
  const coin = document.createElement('img');
  coin.src = 'assets/euro.svg'; // Path to your coin image
  coin.className = 'coin';

  // Start well above the jar (off-screen)
  coin.style.top = '-160px';

  document.getElementById('coins').appendChild(coin);

  // Animate: adjust 'top' to land behind the jar
  setTimeout(() => {
    coin.style.top = '130px'; // Adjust this value for where you want it to "land" (roughly jar's vertical center or bottom)
  }, 30);

  // Optionally hide/remove after falling
  setTimeout(() => {
    coin.style.opacity = '0';
  }, 800);

  setTimeout(() => {
    coin.remove();
  }, 1200);
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

function animateCoin() {
  const coin = document.createElement('img');
  coin.src = 'assets/euro.svg';
  coin.className = 'coin';
  coin.style.top = '-160px';
  document.getElementById('coins').appendChild(coin);

  setTimeout(() => {
    coin.style.top = '130px';
  }, 30);

  setTimeout(() => {
    coin.style.opacity = '0';

    // JIGGLE JAR HERE!
    const jar = document.querySelector('#jar-img img');
    jar.classList.add('jiggle');
    setTimeout(() => {
      jar.classList.remove('jiggle');
    }, 350); // match animation duration
  }, 350);

  setTimeout(() => {
    coin.remove();
  }, 1200);
}
