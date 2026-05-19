document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Custom Cursor Logic
    
    // 2. Scroll Progress Bar
    const progressBar = document.querySelector('.scroll-progress');
    window.addEventListener('scroll', () => {
        const scrollTop = document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercentage = (scrollTop / scrollHeight) * 100;
        progressBar.style.width = scrollPercentage + '%';
    });

    // 3. Navbar Effects & Active State
    const navbar = document.getElementById('navbar');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        // Sticky Glass effect
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active link highlighting
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // 4. Mobile Hamburger Menu
    const hamburger = document.querySelector('.hamburger');
    const navUl = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navUl.classList.toggle('active');
        // Simple hamburger animation
        const spans = hamburger.querySelectorAll('span');
        if(navUl.classList.contains('active')){
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });

    // Close mobile menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navUl.classList.remove('active');
            const spans = hamburger.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });

    // 5. Dark/Light Mode Toggle
    const themeToggleBtn = document.getElementById('theme-toggle');
    const body = document.body;
    
    themeToggleBtn.addEventListener('click', () => {
        body.classList.toggle('light-theme');
        const icon = themeToggleBtn.querySelector('i');
        if (body.classList.contains('light-theme')) {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        } else {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        }
    });

    // 6. Typed.js Initialization
    if(document.querySelector('.typed-text')) {
        new Typed('.typed-text', {
            strings: ['Computer Science Student.', 'Full Stack Developer.', 'Laravel Specialist.', 'Problem Solver.'],
            typeSpeed: 50,
            backSpeed: 30,
            backDelay: 1500,
            loop: true
        });
    }

    // 7. AOS (Animate On Scroll) Initialization
    AOS.init({
        once: true,
        offset: 100,
        duration: 800,
        easing: 'ease-in-out'
    });

    // 8. Number Counter Animation (About Section)
    const counters = document.querySelectorAll('.counter');
    const speed = 200; // The lower the slower

    const animateCounters = () => {
        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;
                const inc = target / speed;

                if (count < target) {
                    counter.innerText = Math.ceil(count + inc);
                    setTimeout(updateCount, 15);
                } else {
                    counter.innerText = target + "+";
                }
            };
            updateCount();
        });
    };

    // Trigger counter animation on scroll
    let counted = false;
    window.addEventListener('scroll', () => {
        const statsSection = document.querySelector('.stats-grid');
        if(statsSection) {
            const sectionPos = statsSection.getBoundingClientRect().top;
            const screenPos = window.innerHeight;
            if(sectionPos < screenPos && !counted){
                animateCounters();
                counted = true;
            }
        }
    });

    // 9. Particles.js Initialization
    if(window.particlesJS) {
        particlesJS("particles-js", {
            "particles": {
                "number": { "value": 60, "density": { "enable": true, "value_area": 800 } },
                "color": { "value": "#00f3ff" },
                "shape": { "type": "circle" },
                "opacity": { "value": 0.2, "random": false },
                "size": { "value": 3, "random": true },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#00f3ff",
                    "opacity": 0.1,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 2,
                    "direction": "none",
                    "random": false,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": { "enable": true, "mode": "grab" },
                    "onclick": { "enable": true, "mode": "push" },
                    "resize": true
                },
                "modes": {
                    "grab": { "distance": 140, "line_linked": { "opacity": 0.5 } },
                    "push": { "particles_nb": 4 }
                }
            },
            "retina_detect": true
        });
    }

    // 10. Contact Form Validation and Submission Handle
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if(contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Basic frontend simulation
            const btn = contactForm.querySelector('button');
            const originalText = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            
            setTimeout(() => {
                btn.innerHTML = originalText;
                contactForm.reset();
                formStatus.innerHTML = '<p style="color: #00f3ff; margin-top: 15px; text-align: center;">Transmission successful. I will respond shortly.</p>';
                setTimeout(() => { formStatus.innerHTML = ''; }, 4000);
            }, 1500);
        });
    }
});