/* ==========================================================================
   Interactivity & Enhancements
   Michele Meoni, MBA Portfolio
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // 1. Mobile Menu Toggle
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when a link is clicked
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // 2. Header Scroll Effect
    const header = document.querySelector('.header');
    
    const handleScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };
    
    window.addEventListener('scroll', handleScroll);
    // Initial check in case of page refresh
    handleScroll();

    // 3. Show More Timeline Toggle
    const toggleTimelineBtn = document.getElementById('toggleTimeline');
    const hiddenTimeline = document.getElementById('hiddenTimeline');

    if (toggleTimelineBtn && hiddenTimeline) {
        toggleTimelineBtn.addEventListener('click', () => {
            hiddenTimeline.classList.toggle('active');
            
            if (hiddenTimeline.classList.contains('active')) {
                toggleTimelineBtn.textContent = 'Hide Past History';
                // Scroll slightly to the newly revealed content
                hiddenTimeline.scrollIntoView({ behavior: 'smooth', block: 'start' });
            } else {
                toggleTimelineBtn.textContent = 'Show Past History (1980 - 2003)';
                // Scroll back to the toggle button
                toggleTimelineBtn.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        });
    }

    // 4. Scroll Reveal IntersectionObserver Fallback
    // Checks if browser does NOT support CSS scroll-driven animations natively
    if (!CSS.supports('(animation-timeline: view()) and (animation-range: entry)')) {
        const revealOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target); // Trigger only once
                }
            });
        }, revealOptions);

        const itemsToReveal = document.querySelectorAll('.scroll-reveal');
        itemsToReveal.forEach(item => {
            revealObserver.observe(item);
        });
    } else {
        // If native animations are supported, add visible class immediately 
        // to let native CSS view timelines take complete control
        const itemsToReveal = document.querySelectorAll('.scroll-reveal');
        itemsToReveal.forEach(item => {
            item.classList.add('visible');
        });
    }
});
