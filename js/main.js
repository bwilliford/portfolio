

//Nav
function toggleNav() {
    document.getElementById("navWrapper").classList.toggle("active");
    document.getElementById("navTrigger").classList.toggle("active");
}

// Show or hide the .header depending on scroll position
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (!header) return;

    if (window.scrollY > 40) {
        header.style.display = 'block';
    } else {
        header.style.display = 'none';
    }
});

// Make sure .header is hidden on page load (until scrolled)
window.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('.header');
    if (header) {
        header.style.display = 'none';
    }

    // Initialize Lenis
    const lenis = new Lenis({
        autoRaf: true,
        lerp: 0.05,
        duration: 2,
    });
});
