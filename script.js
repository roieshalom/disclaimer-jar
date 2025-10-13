let euroCount = 0;
const maxEuros = 20; // You can adjust how 'full' the jar gets

const addBtn = document.getElementById('add-coin');
const emptyBtn = document.getElementById('empty-jar');
const counter = document.getElementById('counter');

// Initialize from localStorage (optional)
if (localStorage.getItem('euroCount')) {
  euroCount = parseInt(localStorage.getItem('euroCount'));
  updateJar();
}

// Coin animation function (leave empty or remove if not used)
function animateCoin() {
  // Animation logic can be added here if needed
}

function updateJar() {
  counter.textContent = `${euroCount} €`;
  localStorage.setItem('euroCount', euroCount); // Optional
}

addBtn.onclick = () => {
  euroCount++;
  updateJar();
};

emptyBtn.onclick = () => {
  euroCount = 0;
  updateJar();
};

updateJar();
