const header = document.querySelector('.header');
const scrollTopButton = document.querySelector('.scrollUpButton');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

//Nav
function toggleNav() {
    const isOpen = document.getElementById("navWrapper").classList.toggle("active");
    const trigger = document.getElementById("navTrigger");
    trigger.classList.toggle("active", isOpen);
    trigger.setAttribute("aria-expanded", isOpen ? "true" : "false");
    trigger.setAttribute("aria-label", isOpen ? "Close menu" : "Menu");
}

// Close the mobile menu with Escape and return focus to the menu button
document.addEventListener('keydown', function(event) {
    const navWrapper = document.getElementById("navWrapper");
    if (event.key === 'Escape' && navWrapper && navWrapper.classList.contains("active")) {
        toggleNav();
        document.getElementById("navTrigger").focus();
    }
});

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: reduceMotion ? 'auto' : 'smooth'
    });
    // Move keyboard focus back to the top of the page too
    const skipLink = document.querySelector('.skip-link');
    if (skipLink) {
        skipLink.focus({ preventScroll: true });
    }
}

// Show or hide the .header depending on scroll position
window.addEventListener('scroll', function() {
    if (!header || !scrollTopButton) return;

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

// Adds a pause/play button next to an element that moves on its own (WCAG 2.2.2)
function addMotionToggle(container, label, pause, play) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'video-toggle';

    function render(paused) {
        button.setAttribute('aria-label', (paused ? 'Play ' : 'Pause ') + label);
        button.setAttribute('aria-pressed', paused ? 'true' : 'false');
        button.textContent = paused ? '▶' : '❚❚';
    }

    let paused = false;
    button.addEventListener('click', function(event) {
        event.preventDefault();
        event.stopPropagation();
        paused = !paused;
        paused ? pause() : play();
        render(paused);
    });

    if (reduceMotion) {
        paused = true;
        pause();
    }
    render(paused);

    container.classList.add('has-video-toggle');
    container.appendChild(button);
}

// Make sure .header is hidden on page load (until scrolled)
window.addEventListener('DOMContentLoaded', function() {
    if (scrollTopButton) {
        scrollTopButton.style.display = 'none';
    }

    if (header) {
        header.style.display = 'none';
    }

    // Autoplaying videos without native controls get a pause button
    document.querySelectorAll('video[autoplay]:not([controls])').forEach(function(video) {
        // Buttons can't live inside links, so attach to the link's parent instead
        const link = video.closest('a');
        const container = link ? link.parentElement : video.parentElement;
        if (link) {
            video.setAttribute('aria-hidden', 'true');
        }
        addMotionToggle(container, 'video', function() { video.pause(); }, function() { video.play(); });
    });

    // Autoplaying videos with native controls just respect reduced motion
    if (reduceMotion) {
        document.querySelectorAll('video[autoplay][controls]').forEach(function(video) {
            video.removeAttribute('autoplay');
            video.pause();
        });
    }

    // Initialize Lenis (skip if not loaded, e.g. bio.html, or if the visitor prefers reduced motion)
    if (typeof Lenis !== 'undefined' && !reduceMotion) {
        const lenis = new Lenis({
            autoRaf: true,
            lerp: 0.05,
            duration: 2,
        });
    }
});

// Animated Paper.js background (some landing pages)
window.addEventListener('load', function() {
    const canvas = document.getElementById('home');
    if (typeof paper === 'undefined' || !canvas || !paper.view || !paper.view.onFrame) return;

    const onFrame = paper.view.onFrame;
    addMotionToggle(canvas.parentElement, 'background animation',
        function() { paper.view.onFrame = null; },
        function() { paper.view.onFrame = onFrame; });
});
