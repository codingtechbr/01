// Mobile Menu Toggle
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');

menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuBtn.classList.toggle('active');
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 70,
                behavior: 'smooth'
            });
            // Close mobile menu if open
            navLinks.classList.remove('active');
            menuBtn.classList.remove('active');
        }
    });
});

// ScrollReveal Animations
ScrollReveal().reveal('.service-card', {
    delay: 200,
    distance: '50px',
    duration: 1000,
    interval: 200
});

ScrollReveal().reveal('.stat-item', {
    delay: 200,
    distance: '30px',
    duration: 1000,
    interval: 100
});

// Form Submission
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const formObject = {};
    formData.forEach((value, key) => {
        formObject[key] = value;
    });

    // Here you would typically send the form data to your server
    console.log('Form submitted:', formObject);
    
    // Show success message
    alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
    
    // Reset form
    this.reset();
});

// Intersection Observer for Navbar Background
const header = document.querySelector('.header');
const heroSection = document.querySelector('.hero');

const headerObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    },
    { threshold: 0.1 }
);

headerObserver.observe(heroSection);

// Automatic counter animation for stats
const stats = document.querySelectorAll('.stat-number');
const statsSection = document.querySelector('.stats');

function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        obj.innerHTML = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

const statsObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                stats.forEach(stat => {
                    const endValue = parseInt(stat.textContent);
                    animateValue(stat, 0, endValue, 2000);
                });
                statsObserver.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.5 }
);

statsObserver.observe(statsSection);

// Parallax effect for hero section
document.addEventListener('mousemove', (e) => {
    const moveX = (e.clientX * -0.005);
    const moveY = (e.clientY * -0.005);
    document.querySelector('.hero-content').style.transform = `translate(${moveX}px, ${moveY}px)`;
});