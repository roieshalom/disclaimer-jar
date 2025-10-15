let euroCount = 0;
const maxEuros = 20; // You can adjust if needed

const addBtn = document.getElementById('add-coin');
const emptyBtn = document.getElementById('empty-jar');
const counter = document.getElementById('counter');
const coinsDiv = document.getElementById('coins');

// Confirmation modal elements (require correct modal HTML markup present)
const emptyModal = document.getElementById('empty-modal');
const emptyYes = document.getElementById('empty-yes');
const emptyNo = document.getElementById('empty-no');

// Initialize from localStorage (optional)
if (localStorage.getItem('euroCount')) {
  euroCount = parseInt(localStorage.getItem('euroCount'));
  updateJar();
}

function animateCoin() {
  const coin = document.createElement('img');
  coin.src = 'assets/euro.svg'; // Path to your coin image
  coin.className = 'coin';

  // Calculate distance from the top of the viewport to the jar container
  const jarRect = document.getElementById('jar-img').getBoundingClientRect();
  const jarTop = jarRect.top;

  // Start exactly at the top of the visible screen, no matter where the jar is
  coin.style.top = '-' + jarTop + 'px';

  coinsDiv.appendChild(coin);

  // Animate drop: land just behind the jar (adjust 100px as needed for your layout)
  setTimeout(() => {
    coin.style.top = '100px';
  }, 30);

  // Fade out and jar jiggle after the drop
  setTimeout(() => {
    coin.style.opacity = '0';

    // JIGGLE JAR HERE!
    const jar = document.querySelector('#jar-img img');
    jar.classList.add('jiggle');
    setTimeout(() => {
      jar.classList.remove('jiggle');
    }, 350); // match animation duration
  }, 450); // adjust this to match the drop speed visually

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

// Empty button with confirmation modal logic
emptyBtn.onclick = () => {
  emptyModal.style.display = 'flex';
};

emptyYes.onclick = () => {
  euroCount = 0;
  updateJar();
  emptyModal.style.display = 'none';
};

emptyNo.onclick = () => {
  emptyModal.style.display = 'none';
};

updateJar();

// Show modal only if user hasn't approved being Gill
if (!localStorage.getItem('isGillApproved')) {
  document.getElementById('gill-modal').style.display = 'flex';

  document.getElementById('gill-yes').onclick = function() {
    localStorage.setItem('isGillApproved', 'yes');
    document.getElementById('gill-modal').style.display = 'none';
  };

  document.getElementById('gill-no').onclick = function() {
    alert('Only Gill may use this jar!');
    // Optionally hide the modal:
    // document.getElementById('gill-modal').style.display = 'none';
  };
}
