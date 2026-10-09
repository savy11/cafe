document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Mobile Hamburger Menu Toggle
    const hamburger = document.getElementById('nav-toggle');
    const navLinks = document.getElementById('primary-navigation');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
            hamburger.setAttribute('aria-expanded', !isExpanded);
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close mobile nav when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // 2. Menu Filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const menuItems = document.querySelectorAll('.menu-item');

    if (filterBtns.length > 0 && menuItems.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Update active state and aria-selected
                filterBtns.forEach(b => {
                    b.classList.remove('active');
                    b.setAttribute('aria-selected', 'false');
                });
                btn.classList.add('active');
                btn.setAttribute('aria-selected', 'true');

                const filterValue = btn.getAttribute('data-filter');

                menuItems.forEach(item => {
                    const itemCategory = item.getAttribute('data-category');
                    if (filterValue === 'all' || itemCategory === filterValue) {
                        item.style.display = 'flex';
                        // Trigger smooth reflow animation
                        item.style.animation = 'none';
                        item.offsetHeight; // reflow
                        item.style.animation = 'fadeIn 0.4s ease-out';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }

    // 3. Contact Form Submission & Validation
    const contactForm = document.getElementById('contactForm');
    const formFeedback = document.getElementById('formFeedback');

    if (contactForm && formFeedback) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const subjectInput = document.getElementById('subject');
            const messageInput = document.getElementById('message');

            const name = nameInput ? nameInput.value.trim() : '';
            const email = emailInput ? emailInput.value.trim() : '';
            const subject = subjectInput ? subjectInput.value.trim() : '';
            const message = messageInput ? messageInput.value.trim() : '';

            // Simple email regex validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!name || !email || !subject || !message) {
                formFeedback.textContent = "Please fill out all required fields.";
                formFeedback.className = "form-feedback error";
                return;
            }

            if (!emailRegex.test(email)) {
                formFeedback.textContent = "Please provide a valid email address.";
                formFeedback.className = "form-feedback error";
                return;
            }

            // Realistic positive submission feedback
            formFeedback.textContent = `Thank you, ${name}! Your message has been received. Our team will get back to you within 24 hours.`;
            formFeedback.className = "form-feedback success";
            
            // Reset form
            contactForm.reset();
            
            // Auto-hide feedback after 8 seconds
            setTimeout(() => {
                formFeedback.style.display = 'none';
                formFeedback.className = "form-feedback";
            }, 8000);
        });
    }
});