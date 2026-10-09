document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Mobile Hamburger Menu
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // 2. Menu Filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const menuItems = document.querySelectorAll('.menu-item');

    if (filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                filterBtns.forEach(b => b.classList.remove('active'));
                // Add active class to clicked button
                btn.classList.add('active');

                const filterValue = btn.getAttribute('data-filter');

                menuItems.forEach(item => {
                    if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                        item.style.display = 'block';
                        // Small animation reset
                        item.style.animation = 'none';
                        item.offsetHeight; // trigger reflow
                        item.style.animation = 'fadeIn 0.5s ease-in-out';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }

    // 3. Contact Form Validation and Honest Feedback
    const contactForm = document.getElementById('contactForm');
    const formFeedback = document.getElementById('formFeedback');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Basic check to ensure required fields aren't empty whitespace
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();

            if (!name || !email || !subject || !message) {
                formFeedback.textContent = "Please fill out all required fields properly.";
                formFeedback.className = "form-feedback error";
                return;
            }

            // Simulate honest local submission response
            formFeedback.textContent = "Thank you! Your message format is valid. (Note: As this is a frontend demonstration, no message was actually sent to a server).";
            formFeedback.className = "form-feedback success";
            
            // Reset form fields
            contactForm.reset();
            
            // Clear message after 5 seconds
            setTimeout(() => {
                formFeedback.textContent = "";
                formFeedback.className = "form-feedback";
            }, 8000);
        });
    }
});