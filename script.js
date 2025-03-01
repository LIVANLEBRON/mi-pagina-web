document.addEventListener('DOMContentLoaded', function() {
    // Pop-up de bienvenida
    setTimeout(function() {
        Swal.fire({
            title: '¡Bienvenido a Urbaez Asesoría Contable y de Datos!',
            text: 'Contáctanos para una consulta.',
            icon: 'info',
            confirmButtonText: 'Entendido',
            confirmButtonColor: '#50C878'
        });
    }, 3000);

    // Menú hamburguesa para móviles
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Cerrar menú al hacer clic en un enlace
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });

    // Formulario de contacto
    const contactForm = document.querySelector('.contact form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            let isValid = true;
            const nameInput = contactForm.querySelector('input[name="name"]');
            const emailInput = contactForm.querySelector('input[name="email"]');
            const messageTextarea = contactForm.querySelector('textarea[name="message"]');
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!nameInput.value.trim()) {
                alert('Por favor, ingrese su nombre.');
                isValid = false;
                nameInput.focus();
            } else if (!emailInput.value.trim()) {
                alert('Por favor, ingrese su correo electrónico.');
                isValid = false;
                emailInput.focus();
            } else if (!emailPattern.test(emailInput.value.trim())) {
                alert('Por favor, ingrese un correo electrónico válido.');
                isValid = false;
                emailInput.focus();
            } else if (!messageTextarea.value.trim()) {
                alert('Por favor, ingrese su mensaje.');
                isValid = false;
                messageTextarea.focus();
            }

            if (!isValid) {
                event.preventDefault();
            } else {
                event.preventDefault();
                const form = event.target;
                const data = new FormData(form);
                fetch(form.action, {
                    method: form.method,
                    body: data,
                    headers: { 'Accept': 'application/json' }
                })
                .then(response => response.json())
                .then(data => {
                    if (data.ok) {
                        Swal.fire({
                            title: '¡Éxito!',
                            text: 'Mensaje enviado. ¡Gracias!',
                            icon: 'success',
                            confirmButtonColor: '#50C878'
                        });
                        form.reset();
                    } else {
                        Swal.fire({
                            title: 'Error',
                            text: 'Hubo un error al enviar el mensaje.',
                            icon: 'error',
                            confirmButtonColor: '#50C878'
                        });
                    }
                })
                .catch(error => {
                    Swal.fire({
                        title: 'Error',
                        text: 'Hubo un error al enviar el mensaje.',
                        icon: 'error',
                        confirmButtonColor: '#50C878'
                    });
                });
            }
        });
    }

    // Desplazamiento suave
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});