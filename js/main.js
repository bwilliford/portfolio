const header = document.querySelector('.header');
const scrollTopButton = document.querySelector('.scrollUpButton');

//Nav
function toggleNav() {
    document.getElementById("navWrapper").classList.toggle("active");
    document.getElementById("navTrigger").classList.toggle("active");
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth',
        complete: function() {
            scrollTopButton.style.display = 'none';
        }
    });
}

// Show or hide the .header depending on scroll position
window.addEventListener('scroll', function() {
    if (window.scrollY > 40) {
        header.style.display = 'block';
        scrollTopButton.style.display = 'block';
    } else {
        header.style.display = 'none';  
    }

    if (window.scrollY == 0) {
        scrollTopButton.style.display = 'none';
    }
});

// Make sure .header is hidden on page load (until scrolled)
window.addEventListener('DOMContentLoaded', function() {
    scrollTopButton.style.display = 'none';

    const header = document.querySelector('.header');
    if (header) {
        header.style.display = 'none';
    }

    // Initialize Lenis (skip if not loaded, e.g. bio.html)
    if (typeof Lenis !== 'undefined') {
        const lenis = new Lenis({
            autoRaf: true,
            lerp: 0.05,
            duration: 2,
        });
    }
});
