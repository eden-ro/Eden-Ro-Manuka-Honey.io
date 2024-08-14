// Smooth Scrolling for Navigation Links
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href.startsWith('#')) {
            e.preventDefault();
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        } else {
            window.location.href = href;
        }
    });
});

// Reveal Sections on Scroll
const faders = document.querySelectorAll('.fade-in');

const appearOptions = {
    threshold: 0.5
};

const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        } else {
            entry.target.classList.add('appear');
            appearOnScroll.unobserve(entry.target);
        }
    });
}, appearOptions);

faders.forEach(fader => {
    appearOnScroll.observe(fader);
});

// Lightbox Effect for Images
const galleryImages = document.querySelectorAll('.image-column img');
const lightbox = document.createElement('div');
lightbox.id = 'lightbox';
document.body.appendChild(lightbox);

galleryImages.forEach(image => {
    image.addEventListener('click', () => {
        lightbox.classList.add('active');
        const img = document.createElement('img');
        img.src = image.src;
        while (lightbox.firstChild) {
            lightbox.removeChild(lightbox.firstChild);
        }
        lightbox.appendChild(img);
    });
});

lightbox.addEventListener('click', () => {
    lightbox.classList.remove('active');
});

// Play/Pause Video on Click
const video = document.querySelector('.video-element');
if (video) {
    video.addEventListener('click', () => {
        if (video.paused) {
            video.play();
        } else {
            video.pause();
        }
    });
};

// Simple Form Validation for Email Input
const form = document.querySelector('form');
if (form) {
    form.addEventListener('submit', function(e) {
        const emailInput = document.querySelector('input[type="email"]');
        const errorMessage = document.getElementById('error-message');

        if (emailInput && !emailInput.value.includes('@')) {
            e.preventDefault();
            errorMessage.textContent = 'Please enter a valid email address.';
            emailInput.style.borderColor = 'red';
        } else {
            if (errorMessage) errorMessage.textContent = '';
            if (emailInput) emailInput.style.borderColor = '';
        }
    });
}

// Dynamic Content Loading
const loadMoreBtn = document.getElementById('loadMoreBtn');
if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', () => {
        fetch('more-content.html')
            .then(response => response.text())
            .then(data => {
                document.getElementById('contentArea').innerHTML += data;
            })
            .catch(error => console.error('Error fetching content:', error));
    });
}
