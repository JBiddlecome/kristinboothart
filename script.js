const artPieces = [
  {
    title: 'Chromatic Drift',
    medium: 'Acrylic on canvas',
    mood: 'Oceanic blues with ember undertones',
    src: 'Images/30398b_36fc3f56a5104e3684c70be1c71934a3~mv2.jpg',
    tags: ['large format', 'textural', 'statement wall'],
  },
  {
    title: 'Pulse Lines',
    medium: 'Mixed media',
    mood: 'Electric marks moving across neutral space',
    src: 'Images/30398b_07eaf3991ba041b08c4b8500de994783~mv2.jpeg',
    tags: ['ink + acrylic', 'gestural', 'rhythmic'],
  },
  {
    title: 'Citrine Bloom',
    medium: 'Oil on panel',
    mood: 'Sunlit golds balanced with grounding charcoal',
    src: 'Images/30398b_1259e335dc0e4cb9bc2debc8ce9267fb~mv2.jpg',
    tags: ['warm palette', 'layered', 'modern classic'],
  },
  {
    title: 'Nocturne Glow',
    medium: 'Acrylic on canvas',
    mood: 'Midnight depths with lifted orchid light',
    src: 'Images/30398b_a25e3d1cffc04ac6883105da334cb227~mv2.jpg',
    tags: ['mood piece', 'high contrast', 'gallery-ready'],
  },
  {
    title: 'Cinder Rain',
    medium: 'Mixed media',
    mood: 'Sparks of vermillion across textured slate',
    src: 'Images/30398b_f0748590f83a44ba95fad61d263d0203~mv2.jpg',
    tags: ['bold strokes', 'dynamic', 'limited series'],
  },
  {
    title: 'Soft Static',
    medium: 'Oil on canvas',
    mood: 'Snowy whites and blurred lilac harmonies',
    src: 'Images/30398b_c76f6f76cfcd4bf2ad1d9c8de32c21dc~mv2.jpg',
    tags: ['quiet energy', 'minimal', 'soft focus'],
  },
];

const selection = document.getElementById('art-selection');
const workGrid = document.getElementById('work-grid');
const previewImages = document.querySelectorAll('[data-preview-image]');
const selectionTitle = document.getElementById('selection-title');
const selectionDetails = document.getElementById('selection-details');
const selectionTags = document.getElementById('selection-tags');
const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.site-nav');
const year = document.getElementById('year');

const createCard = (piece, index) => {
  const card = document.createElement('article');
  card.className = 'card';
  card.tabIndex = 0;
  card.setAttribute('data-index', index);
  card.innerHTML = `
    <img src="${piece.src}" alt="${piece.title} artwork by Kristin Booth">
    <h3>${piece.title}</h3>
    <p>${piece.medium}</p>
    <p>${piece.mood}</p>
  `;
  card.addEventListener('click', () => setSelection(index));
  card.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setSelection(index);
    }
  });
  return card;
};

function populateGallery() {
  const fragment = document.createDocumentFragment();
  artPieces.forEach((piece, index) => fragment.appendChild(createCard(piece, index)));
  workGrid.appendChild(fragment);
}

function populateSelector() {
  artPieces.forEach((piece, index) => {
    const option = document.createElement('option');
    option.value = index;
    option.textContent = `${piece.title} — ${piece.medium}`;
    selection.appendChild(option);
  });
}

function setSelection(index) {
  const piece = artPieces[index];
  selection.value = index;
  selectionTitle.textContent = piece.title;
  selectionDetails.textContent = `${piece.medium}. ${piece.mood}.`;

  selectionTags.innerHTML = '';
  piece.tags.forEach((tag) => {
    const chip = document.createElement('span');
    chip.className = 'chip';
    chip.textContent = tag;
    selectionTags.appendChild(chip);
  });

  previewImages.forEach((img) => {
    img.src = piece.src;
    img.alt = `${piece.title} preview`;
  });
}

function initNavToggle() {
  navToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  nav.querySelectorAll('a').forEach((link) =>
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    }),
  );
}

function init() {
  populateGallery();
  populateSelector();
  setSelection(0);
  selection.addEventListener('change', (e) => setSelection(Number(e.target.value)));
  initNavToggle();
  if (year) year.textContent = new Date().getFullYear();
}

init();
