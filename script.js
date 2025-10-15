let euroCount = 0;
const maxEuros = 999; // You can adjust if needed

const addBtn = document.getElementById('add-coin');
const emptyBtn = document.getElementById('empty-jar');
const counter = document.getElementById('counter');
const coinsDiv = document.getElementById('coins');

// Modal elements for empty/reset jar
const emptyModal = document.getElementById('empty-modal');
const emptyConfirm = document.getElementById('empty-confirm');    // "Empty" button
const resetConfirm = document.getElementById('reset-confirm');    // "Reset" button
const emptyCancel = document.getElementById('empty-cancel');      // "Cancel" button

// Modal elements for welcome flow
const jarTitle = document.getElementById('jar-title');
const gillModal = document.getElementById('gill-modal');
const gillYes = document.getElementById('gill-yes');
const gillNo = document.getElementById('gill-no');

const nameModal = document.getElementById('name-modal');
const nameInput = document.getElementById('user-name-input');
const nameSubmit = document.getElementById('name-submit');
const countModal = document.getElementById('count-modal');
const countInput = document.getElementById('user-count-input');
const countSubmit = document.getElementById('count-submit');

let customName = '';
let customCount = '';

// Initialize from localStorage (optional)
if (localStorage.getItem('euroCount')) {
  euroCount = parseInt(localStorage.getItem('euroCount'));
  updateJar();
}

// Personalized jar setup flow—only runs on first visit
if (!localStorage.getItem('isJarSetup')) {
  gillModal.style.display = 'flex';

  gillYes.onclick = function() {
    localStorage.setItem('isJarSetup', 'Gill');
    gillModal.style.display = 'none';
    jarTitle.textContent = "Gill's Disclaimer Jar";
    addBtn.textContent = "Disclaimer made";
    localStorage.setItem('addBtnText', addBtn.textContent);
  };

  gillNo.onclick = function() {
    gillModal.style.display = 'none';
    nameModal.style.display = 'flex';
  };

  nameSubmit.onclick = function() {
    customName = nameInput.value.trim().substring(0,8) || 'User';
    nameModal.style.display = 'none';
    countModal.style.display = 'flex';
  };

  countSubmit.onclick = function() {
    customCount = countInput.value.trim().substring(0,14) || 'Coin';
    countModal.style.display = 'none';
    const personalized = `${customName}'s ${customCount} Jar`;
    jarTitle.textContent = personalized;
    localStorage.setItem('isJarSetup', personalized);

    // Set button label, e.g. "kiss made", "apology made"
    addBtn.textContent = `${customCount} made`;
    localStorage.setItem('addBtnText', addBtn.textContent);
  };
} else {
  // Already set up, always show the stored jar title and button
  jarTitle.textContent = localStorage.getItem('isJarSetup');
  if (localStorage.getItem('addBtnText')) {
    addBtn.textContent = localStorage.getItem('addBtnText');
  } else {
    addBtn.textContent = "Disclaimer made";
  }
}

function animateCoin() {
  const coin = document.createElement('img');
  coin.src = 'assets/euro.svg';
  coin.className = 'coin';

  // Calculate distance from the top of the viewport to the jar container
  const jarRect = document.getElementById('jar-img').getBoundingClientRect();
  const jarTop = jarRect.top;

  // Start at the top of the visible screen
  coin.style.top = '-' + jarTop + 'px';

  coinsDiv.appendChild(coin);

  // Animate drop
  setTimeout(() => {
    coin.style.top = '100px';
  }, 30);

  // Fade out and jar jiggle after the drop
  setTimeout(() => {
    coin.style.opacity = '0';

    const jar = document.querySelector('#jar-img img');
    jar.classList.add('jiggle');
    setTimeout(() => {
      jar.classList.remove('jiggle');
    }, 350);
  }, 450);

  setTimeout(() => {
    coin.remove();
  }, 1200);
}

function updateJar() {
  counter.textContent = `${euroCount} €`;
  localStorage.setItem('euroCount', euroCount);
}

addBtn.onclick = () => {
  euroCount++;
  updateJar();
  animateCoin();
};

// Empty/Reset jar modal logic
emptyBtn.onclick = () => {
  emptyModal.style.display = 'flex';
};

emptyConfirm.onclick = () => {
  euroCount = 0;
  updateJar();
  emptyModal.style.display = 'none';
};

resetConfirm.onclick = () => {
  euroCount = 0;
  updateJar();
  // Clear setup and show the customization workflow
  localStorage.removeItem('isJarSetup');
  localStorage.removeItem('addBtnText');
  emptyModal.style.display = 'none';
  gillModal.style.display = 'flex';
};

emptyCancel.onclick = () => {
  emptyModal.style.display = 'none';
};

updateJar();
