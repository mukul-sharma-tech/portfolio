// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const closeMenu = document.querySelector('.close-menu');
const nav = document.querySelector('nav');

menuToggle.addEventListener('click', () => {
    nav.classList.add('active');
    document.body.style.overflow = 'hidden';
});

closeMenu.addEventListener('click', () => {
    nav.classList.remove('active');
    document.body.style.overflow = 'auto';
});

// Close menu when clicking on a nav link
const navLinks = document.querySelectorAll('nav ul li a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
});

// Header scroll effect
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Back to top button
const backToTop = document.querySelector('.back-to-top');
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTop.classList.add('active');
    } else {
        backToTop.classList.remove('active');
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Active nav link on scroll
const sections = document.querySelectorAll('section');
window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (pageYOffset >= sectionTop - 300) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Animate elements on scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.timeline-item, .project-card, .certification-card, .education-card');
    
    elements.forEach(element => {
        if (isElementInViewport(element)) {
            element.classList.add('visible');
        }
    });
};

function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.bottom >= 0
    );
}

window.addEventListener('scroll', animateOnScroll);
animateOnScroll(); // Run once on page load

// Animate skill bars on scroll
const skillBars = document.querySelectorAll('.progress');

function animateSkillBars() {
    skillBars.forEach(bar => {
        if (isElementInViewport(bar)) {
            const width = bar.getAttribute('data-width');
            bar.style.width = `${width}%`;
        }
    });
}

window.addEventListener('scroll', animateSkillBars);
animateSkillBars(); // Run once on page load

// Animate stats counting
const stats = document.querySelectorAll('.stat-number');

function animateStats() {
    stats.forEach(stat => {
        if (isElementInViewport(stat) && !stat.hasAttribute('data-animated')) {
            const target = parseInt(stat.getAttribute('data-count'));
            const duration = 2000; // 2 seconds
            const step = target / (duration / 16); // 60fps
            
            let current = 0;
            const timer = setInterval(() => {
                current += step;
                if (current >= target) {
                    clearInterval(timer);
                    current = target;
                    stat.setAttribute('data-animated', 'true');
                }
                stat.textContent = Math.floor(current);
            }, 16);
        }
    });
}

window.addEventListener('scroll', animateStats);
animateStats(); // Run once on page load

// Form submission
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    // Here you would typically send the form data to a server
    // For this example, we'll just log it and show an alert
    console.log({ name, email, subject, message });
    alert('Thank you for your message! I will get back to you soon.');

    // Reset the form
    contactForm.reset();
});

// Initialize VanillaTilt for project cards
VanillaTilt.init(document.querySelectorAll(".project-card"), {
    max: 15,
    speed: 400,
    glare: true,
    "max-glare": 0.2,
});

// Three.js Background Animation
function initThreeJSBackground() {
    const container = document.getElementById('threejs-background');
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    // Create particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particleCount = 1000;

    const posArray = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 10;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.02,
        color: 0x6c63ff,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    camera.position.z = 3;

    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        
        particlesMesh.rotation.x += 0.0005;
        particlesMesh.rotation.y += 0.0005;
        
        renderer.render(scene, camera);
    }

    animate();

    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

// Initialize Three.js background
document.addEventListener('DOMContentLoaded', initThreeJSBackground);