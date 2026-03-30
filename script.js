// Bilder-Listen
const comicPages = [
    "comic/01_cover.jpg", "comic/02_spread.jpg", "comic/03_spread.jpg", 
    "comic/04_spread.jpg", "comic/05_spread.jpg", "comic/06_spread.jpg", 
    "comic/07_spread.jpg", "comic/08_spread.jpg"
];

const exhibitImages = [
    "exhibit/exhibit_01.png", "exhibit/exhibit_02.png", 
    "exhibit/exhibit_03.png", "exhibit/exhibit_04.png"
];

const messeImages = [
    "exhibit/01_messe.jpg", "exhibit/02_messe.jpg", 
    "exhibit/03_messe.jpg", "exhibit/04_messe.jpg"
];

// Status-Variablen
let currentImages = [];
let currentIndex = 0;
let exhibitGalleryIndex = 0; // Für die Mini-Vorschau

// LIGHTBOX LOGIK
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');

function openLightbox(type, index) {
    if (type === 'comic') currentImages = comicPages;
    else if (type === 'exhibit') currentImages = exhibitImages;
    else if (type === 'messe') currentImages = messeImages;
    
    currentIndex = index;
    lightbox.style.display = 'flex';
    updateLightboxImage();
}

function closeLightbox() {
    lightbox.style.display = 'none';
}

function changeImage(step) {
    currentIndex += step;
    if(currentIndex < 0) currentIndex = currentImages.length - 1;
    if(currentIndex >= currentImages.length) currentIndex = 0;
    updateLightboxImage();
}

function updateLightboxImage() {
    lightboxImg.src = currentImages[currentIndex];
}

// MINI-GALLERY LOGIK (Für den Exhibit Bereich)
function nextExhibit() {
    exhibitGalleryIndex = (exhibitGalleryIndex + 1) % exhibitImages.length;
    updateMiniGallery();
}

function prevExhibit() {
    exhibitGalleryIndex = (exhibitGalleryIndex - 1 + exhibitImages.length) % exhibitImages.length;
    updateMiniGallery();
}

function updateMiniGallery() {
    const img = document.getElementById('exhibit-display');
    const counter = document.getElementById('exhibit-counter');
    if(img) img.src = exhibitImages[exhibitGalleryIndex];
    if(counter) counter.innerText = (exhibitGalleryIndex + 1) + " / " + exhibitImages.length;
}

// Event Listener für Keyboard
document.addEventListener('keydown', function(e) {
    if(lightbox.style.display === 'flex') {
        if(e.key === 'ArrowLeft') changeImage(-1);
        if(e.key === 'ArrowRight') changeImage(1);
        if(e.key === 'Escape') closeLightbox();
    }
});