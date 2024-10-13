document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('nav ul');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('open');
        hamburger.classList.toggle('active');
    });

    const navItems = document.querySelectorAll('nav ul li a');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if(navLinks.classList.contains('open')){
                navLinks.classList.remove('open');
                hamburger.classList.remove('active');
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    if(form){
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            let valid = true;
            let errorMessage = '';

            if(name === ''){
                valid = false;
                errorMessage += 'Lūdzu, ievadiet savu vārdu.\n';
            }

            if(email === ''){
                valid = false;
                errorMessage += 'Lūdzu, ievadiet savu e-pastu.\n';
            } else {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if(!emailPattern.test(email)){
                    valid = false;
                    errorMessage += 'Lūdzu, ievadiet derīgu e-pastu.\n';
                }
            }

            if(message === ''){
                valid = false;
                errorMessage += 'Lūdzu, ievadiet savu ziņu.\n';
            }

            if(!valid){
                alert(errorMessage);
                return;
            }

            const formData = { name, email, message };

            fetch('http://localhost:3000/submit-form', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })
            .then(response => response.text())
            .then(data => {
                alert(data);
                form.reset();
            })
            .catch((error) => {
                console.error('Kļūda:', error);
                alert('Radās kļūda nosūtot formu.');
            });
        });
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const productGrid = document.querySelector('.product-grid');
    if(productGrid){
        let scrollAmount = 0;
        const slideTimer = setInterval(() => {
            productGrid.scrollBy({ left: 200, behavior: 'smooth' });
            scrollAmount += 200;
            if(scrollAmount >= productGrid.scrollWidth - productGrid.clientWidth){
                productGrid.scrollTo({ left: 0, behavior: 'smooth' });
                scrollAmount = 0;
            }
        }, 5000);
    }
});