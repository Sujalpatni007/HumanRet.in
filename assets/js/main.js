document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initHeader();
    initMobileMenu();
    initScrollReveal();
    initTestimonialSlider();
    initContactForm();
});

/**
 * Header scroll behavior
 */
function initHeader() {
    const header = document.querySelector('.header');
    const scrollThreshold = 80;

    // Check initial scroll position
    checkHeaderScroll();

    // Add scroll event listener
    window.addEventListener('scroll', checkHeaderScroll);

    function checkHeaderScroll() {
        if (window.scrollY > scrollThreshold) {
            header.classList.add('header--scrolled');
        } else {
            header.classList.remove('header--scrolled');
        }
    }
}

/**
 * Mobile menu functionality
 */
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const hasSubmenuItems = document.querySelectorAll('.has-submenu');

    // Toggle mobile menu
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });

    // Handle submenu toggles
    hasSubmenuItems.forEach(item => {
        item.addEventListener('click', function(e) {
            if (e.target === item.querySelector('.mobile-menu__link')) {
                e.preventDefault();
                item.classList.toggle('active');
            }
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (mobileMenu.classList.contains('active') && 
            !mobileMenu.contains(e.target) && 
            !hamburger.contains(e.target)) {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    });
}

/**
 * Scroll reveal animations
 */
function initScrollReveal() {
    // Elements to reveal on scroll
    const serviceCards = document.querySelectorAll('.service-card');
    const caseStudies = document.querySelectorAll('.case-study');
    const blogCards = document.querySelectorAll('.blog-card');
    const revealElements = document.querySelectorAll('.reveal');

    // Add initial classes
    serviceCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 120}ms`;
    });

    caseStudies.forEach((study, index) => {
        study.style.transitionDelay = `${index * 140}ms`;
    });

    // Check if elements are in viewport
    function checkReveal() {
        const triggerBottom = window.innerHeight * 0.85;

        // Service cards reveal
        serviceCards.forEach(card => {
            const cardTop = card.getBoundingClientRect().top;
            if (cardTop < triggerBottom) {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }
        });

        // Case studies reveal
        caseStudies.forEach(study => {
            const studyTop = study.getBoundingClientRect().top;
            if (studyTop < triggerBottom) {
                study.style.opacity = '1';
                study.style.transform = 'translateY(0)';
            }
        });

        // Blog cards reveal
        blogCards.forEach(card => {
            const cardTop = card.getBoundingClientRect().top;
            if (cardTop < triggerBottom) {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }
        });

        // Generic reveal elements
        revealElements.forEach(el => {
            const elTop = el.getBoundingClientRect().top;
            if (elTop < triggerBottom) {
                el.classList.add('active');
            }
        });
    }

    // Check on load
    checkReveal();

    // Check on scroll
    window.addEventListener('scroll', checkReveal);
}

/**
 * Testimonial slider
 */
function initTestimonialSlider() {
    const slider = document.querySelector('.testimonials__slider');
    const testimonials = document.querySelectorAll('.testimonial');
    let currentIndex = 0;
    const interval = 6000; // 6 seconds per slide

    // Hide all testimonials except the first one
    testimonials.forEach((testimonial, index) => {
        if (index !== 0) {
            testimonial.style.display = 'none';
        }
    });

    // Function to show next testimonial
    function showNextTestimonial() {
        // Hide current testimonial
        testimonials[currentIndex].style.display = 'none';
        testimonials[currentIndex].style.opacity = '0';
        testimonials[currentIndex].style.transform = 'scale(0.98)';

        // Update index
        currentIndex = (currentIndex + 1) % testimonials.length;

        // Show next testimonial
        testimonials[currentIndex].style.display = 'block';
        setTimeout(() => {
            testimonials[currentIndex].style.opacity = '1';
            testimonials[currentIndex].style.transform = 'scale(1)';
        }, 50);
    }

    // Start the slider
    const sliderInterval = setInterval(showNextTestimonial, interval);

    // Pause on hover
    slider.addEventListener('mouseenter', () => {
        clearInterval(sliderInterval);
    });

    // Resume on mouse leave
    slider.addEventListener('mouseleave', () => {
        clearInterval(sliderInterval);
        sliderInterval = setInterval(showNextTestimonial, interval);
    });
}

/**
 * Contact form handling
 */
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    const successModal = document.getElementById('successModal');
    const modalClose = document.querySelector('.modal__close');
    const modalButton = document.querySelector('.modal__button');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Form validation
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            if (!name || !email || !message) {
                alert('Please fill in all required fields.');
                return;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }

            // Simulate form submission
            // In a real implementation, you would send the form data to a server
            setTimeout(() => {
                // Show success modal
                successModal.classList.add('active');
                // Reset form
                contactForm.reset();
            }, 1000);
        });
    }

    // Close modal
    if (modalClose) {
        modalClose.addEventListener('click', function() {
            successModal.classList.remove('active');
        });
    }

    if (modalButton) {
        modalButton.addEventListener('click', function() {
            successModal.classList.remove('active');
        });
    }

    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === successModal) {
            successModal.classList.remove('active');
        }
    });
}

/**
 * Smooth scroll for anchor links
 */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        e.preventDefault();
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            // Close mobile menu if open
            const mobileMenu = document.querySelector('.mobile-menu');
            const hamburger = document.querySelector('.hamburger');
            if (mobileMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
                hamburger.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
            
            // Scroll to target
            window.scrollTo({
                top: targetElement.offsetTop - 100, // Offset for header
                behavior: 'smooth'
            });
        }
    });
});

/**
 * Clients carousel auto-scroll
 */
function initClientsCarousel() {
    const track = document.querySelector('.clients__track');
    if (!track) return;
    
    // The animation is handled by CSS, but we can add pause on hover functionality
    track.addEventListener('mouseenter', () => {
        track.style.animationPlayState = 'paused';
    });
    
    track.addEventListener('mouseleave', () => {
        track.style.animationPlayState = 'running';
    });
}

// Initialize clients carousel
initClientsCarousel();