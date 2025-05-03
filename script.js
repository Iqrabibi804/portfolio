// Initialize AOS
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    mirror: false
});

// Navigation Functionality
const menuBtn = document.getElementById('menuBtn');
const closeBtn = document.getElementById('closeBtn');
const navbar = document.querySelector('.navbar');
const navLinks = document.querySelectorAll('.nav-links a');

// Toggle Menu
menuBtn.addEventListener('click', () => {
    navbar.classList.add('show');
});

closeBtn.addEventListener('click', () => {
    navbar.classList.remove('show');
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.navbar') && !e.target.closest('.top-nav-icons')) {
        navbar.classList.remove('show');
    }
});

// Smooth scroll and active link
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);

        if (targetSection) {
            const headerOffset = 80;
            const elementPosition = targetSection.offsetTop;
            const offsetPosition = elementPosition - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }

        // Close menu
        navbar.classList.remove('show');
    });
});

// Highlight active nav link on scroll
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    document.querySelectorAll('section[id]').forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 100;
        const sectionId = current.getAttribute('id');

        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            document.querySelector('.nav-links a.active')?.classList.remove('active');
            document.querySelector(`.nav-links a[href="#${sectionId}"]`)?.classList.add('active');
        }
    });
});

// Animate skill bars when in view
const skillBars = document.querySelectorAll('.progress-line span');
const animateSkillBars = () => {
    skillBars.forEach(bar => {
        const percent = bar.getAttribute('data-percent');
        bar.style.width = percent;
    });
};

const skillsSection = document.querySelector('#skills');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateSkillBars();
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

if (skillsSection) {
    observer.observe(skillsSection);
}
