document.addEventListener('DOMContentLoaded', () => {
    // 1. Theme Toggle (Safe check in case it is added in the future)
    const themeToggleBtn = document.getElementById('theme-toggle');
    const sunIcon = document.querySelector('.sun-icon');
    const moonIcon = document.querySelector('.moon-icon');
    
    if (themeToggleBtn && sunIcon && moonIcon) {
        const savedTheme = localStorage.getItem('theme');
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
            document.documentElement.setAttribute('data-theme', 'dark');
            sunIcon.style.display = 'none';
            moonIcon.style.display = 'block';
        }

        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            let targetTheme = 'light';
            
            if (currentTheme === 'light') {
                targetTheme = 'dark';
                sunIcon.style.display = 'none';
                moonIcon.style.display = 'block';
            } else {
                targetTheme = 'light';
                sunIcon.style.display = 'block';
                moonIcon.style.display = 'none';
            }
            
            document.documentElement.setAttribute('data-theme', targetTheme);
            localStorage.setItem('theme', targetTheme);
        });
    }

    // 2. Sticky Header Scroll Effect
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // 3. Scroll Reveal Animation (Reveal elements on scroll)
    const revealElements = document.querySelectorAll('.reveal-up');
    
    if (revealElements.length > 0) {
        const revealOptions = {
            threshold: 0.15,
            rootMargin: "0px 0px -50px 0px"
        };

        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target);
                }
            });
        }, revealOptions);

        revealElements.forEach(el => {
            revealObserver.observe(el);
        });
    }

    // 4. Dynamic Number Counter Animations
    const counters = document.querySelectorAll('.counter');
    
    if (counters.length > 0) {
        let hasCounted = false;
        
        const counterObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !hasCounted) {
                    counters.forEach(counter => {
                        const target = parseInt(counter.getAttribute('data-target'), 10) || 0;
                        const suffix = counter.getAttribute('data-suffix') || '';
                        const prefix = counter.getAttribute('data-prefix') || '';
                        const duration = 2000; // 2 seconds animation
                        const startTime = performance.now();
                        
                        const animate = (currentTime) => {
                            const elapsedTime = currentTime - startTime;
                            const progress = Math.min(elapsedTime / duration, 1);
                            
                            // Ease out quad formula for smooth decelerating animation
                            const easeProgress = progress * (2 - progress);
                            const currentValue = Math.floor(easeProgress * target);
                            
                            counter.innerText = prefix + currentValue + suffix;
                            
                            if (progress < 1) {
                                requestAnimationFrame(animate);
                            } else {
                                counter.innerText = prefix + target + suffix;
                            }
                        };
                        
                        requestAnimationFrame(animate);
                    });
                    hasCounted = true;
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        const counterSection = document.querySelector('.counter-section');
        if (counterSection) {
            counterObserver.observe(counterSection);
        }
    }

    // 5. Interactive Mobile Navigation Drawer
    const mobileToggle = document.querySelector('.mobile-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (mobileToggle && mainNav) {
        mobileToggle.addEventListener('click', () => {
            const isActive = mobileToggle.classList.toggle('active');
            mainNav.classList.toggle('active');
            
            // Lock/Unlock Body Scroll
            if (isActive) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });

        // Close menu when clicking any link
        const navLinks = mainNav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileToggle.classList.remove('remove'); // Reset if needed, but remove is not correct
                mobileToggle.classList.remove('active');
                mainNav.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // 6. Accessibility Dropdown Toggles (Keyboard Support)
    const dropdownToggles = document.querySelectorAll('.has-dropdown > a');
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const parent = toggle.parentElement;
                const menu = parent.querySelector('.dropdown-menu');
                
                if (menu) {
                    const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
                    toggle.setAttribute('aria-expanded', !isExpanded);
                    if (!isExpanded) {
                        menu.style.opacity = '1';
                        menu.style.visibility = 'visible';
                        menu.style.transform = 'translateY(0)';
                    } else {
                        menu.style.opacity = '0';
                        menu.style.visibility = 'hidden';
                        menu.style.transform = 'translateY(10px)';
                    }
                }
            }
        });
    });
});
