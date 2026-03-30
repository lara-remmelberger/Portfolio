/* ============================================================
   IMAGE CONFIGURATION
   ============================================================ */
const comicPages = [
    "comic/01_cover.jpg", 
    "comic/02_spread.jpg", 
    "comic/03_spread.jpg", 
    "comic/04_spread.jpg", 
    "comic/05_spread.jpg", 
    "comic/06_spread.jpg", 
    "comic/07_spread.jpg", 
    "comic/08_spread.jpg"
];

const exhibitImages = [
    "exhibit/exhibit_01.png", 
    "exhibit/exhibit_02.png", 
    "exhibit/exhibit_03.png", 
    "exhibit/exhibit_04.png"
];

const messeImages = [
    "exhibit/01_messe.jpeg", 
    "exhibit/02_messe.png", 
    "exhibit/03_messe.jpeg", 
    "exhibit/04_messe.jpeg"
];

/* ============================================================
   STATE VARIABLES
   ============================================================ */
let currentImages = [];
let currentIndex = 0;
let exhibitGalleryIndex = 0;

const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');

/* ============================================================
   MINI-GALLERY LOGIC (Exhibit Panel Preview)
   ============================================================ */
function nextExhibit() {
    exhibitGalleryIndex = (exhibitGalleryIndex + 1) % exhibitImages.length;
    updateMiniGallery();
}

function prevExhibit() {
    exhibitGalleryIndex = (exhibitGalleryIndex - 1 + exhibitImages.length) % exhibitImages.length;
    updateMiniGallery();
}

function updateMiniGallery() {
    const imgElement = document.getElementById('exhibit-display');
    const counterElement = document.getElementById('exhibit-counter');
    
    if (imgElement) {
        imgElement.src = exhibitImages[exhibitGalleryIndex];
    }
    if (counterElement) {
        counterElement.innerText = `${exhibitGalleryIndex + 1} / ${exhibitImages.length}`;
    }
}

/* ============================================================
   LIGHTBOX LOGIC
   ============================================================ */

/**
 * Opens the lightbox with a specific set of images.
 * @param {string} type - 'comic', 'exhibit', or 'messe'
 * @param {number} index - Starting image index
 */
function openLightbox(type, index) {
    if (type === 'comic') {
        currentImages = comicPages;
    } else if (type === 'exhibit') {
        currentImages = exhibitImages;
        // If opening from mini-gallery, use its current index
        index = exhibitGalleryIndex; 
    } else if (type === 'messe') {
        currentImages = messeImages;
    }
    
    currentIndex = index;
    if (lightbox) {
        lightbox.style.display = 'flex';
        updateLightboxImage();
    }
}

function closeLightbox() {
    if (lightbox) lightbox.style.display = 'none';
}

/**
 * Navigates through the lightbox images.
 * @param {number} step - Direction (1 for next, -1 for previous)
 */
function changeImage(step) {
    if (currentImages.length === 0) return;
    
    currentIndex += step;
    if (currentIndex < 0) {
        currentIndex = currentImages.length - 1;
    } else if (currentIndex >= currentImages.length) {
        currentIndex = 0;
    }
    updateLightboxImage();
}

function updateLightboxImage() {
    if (lightboxImg && currentImages[currentIndex]) {
        lightboxImg.src = currentImages[currentIndex];
    }
}

/* ============================================================
   EVENT LISTENERS & CONTROLS
   ============================================================ */

// Keyboard Controls
document.addEventListener('keydown', function(e) {
    if (lightbox && lightbox.style.display === 'flex') {
        if (e.key === 'ArrowLeft') {
            changeImage(-1);
        } else if (e.key === 'ArrowRight') {
            changeImage(1);
        } else if (e.key === 'Escape') {
            closeLightbox();
        }
    }
});

// Close lightbox when clicking outside the image
if (lightbox) {
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
}