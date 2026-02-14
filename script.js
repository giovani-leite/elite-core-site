document.addEventListener('DOMContentLoaded', () => {

    /* =========================================
       1. SCROLL ANIMATIONS (IntersectionObserver)
       ========================================= */
    const fadeElems = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Run animation only once
            }
        });
    }, observerOptions);

    fadeElems.forEach(elem => {
        observer.observe(elem);
    });

    /* =========================================
       2. FAQ ACCORDION
       ========================================= */
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const content = header.nextElementSibling;

            // Toggle active class on header for rotation icon
            header.classList.toggle('active');

            // Toggle max-height for smooth opening
            if (header.classList.contains('active')) {
                content.style.maxHeight = content.scrollHeight + "px";
            } else {
                content.style.maxHeight = "0";
            }
        });
    });

    /* =========================================
       3. SMOOTH SCROLL FOR ANCHOR LINKS
       ========================================= */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    /* =========================================
       4. DYNAMIC YEAR IN FOOTER
       ========================================= */
    // Ensure copyright year is always current
    const footerYear = document.querySelector('footer p');
    if (footerYear) {
        const currentYear = new Date().getFullYear();
        // Just a safety check to replace if hardcoded 2026 changes
        footerYear.innerHTML = footerYear.innerHTML.replace('2026', currentYear);
    }

    /* =========================================
       5. STICKY MOBILE CTA
       ========================================= */
    const stickyCta = document.getElementById('sticky-cta');
    const heroSection = document.querySelector('.hero');

    if (stickyCta && heroSection) {
        window.addEventListener('scroll', () => {
            const heroBottom = heroSection.getBoundingClientRect().bottom;

            // Show sticky bar when user scrolls past the Hero section
            if (heroBottom < 0) {
                stickyCta.classList.add('visible');
            } else {
                stickyCta.classList.remove('visible');
            }
        });
    }

    /* =========================================
       6. COUNTDOWN TIMER (15 Min Loop)
       ========================================= */
    const timerDisplay = document.getElementById('countdown');

    if (timerDisplay) {
        let time = 15 * 60; // 15 minutes in seconds

        // Evergreen logic: reset to 15m if refresh. 
        // Real tracking would require localStorage, but usually simple loop is fine for LP.

        const updateTimer = () => {
            const minutes = Math.floor(time / 60);
            let seconds = time % 60;

            seconds = seconds < 10 ? '0' + seconds : seconds;
            timerDisplay.innerHTML = `${minutes}:${seconds}`;

            if (time > 0) {
                time--;
            } else {
                // Restart for evergreen effect
                time = 15 * 60;
            }
        };

        setInterval(updateTimer, 1000);
        updateTimer(); // Initial call
    }

});
