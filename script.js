document.addEventListener('DOMContentLoaded', function() {
    // Añadir clase para animaciones de entrada
    const hexCells = document.querySelectorAll('.hex-cell');
    
    // Añadir índices para animaciones escalonadas
    hexCells.forEach((cell, index) => {
        cell.style.setProperty('--i', index);
        
        // Añadir efecto de hover con animación suave
        cell.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.05)';
            this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.2)';
            this.style.zIndex = '10';
        });
        
        cell.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
            this.style.zIndex = '';
        });
    });
    
    // Animación suave para el scroll entre secciones
    const menuLinks = document.querySelectorAll('a[href^="#"]');
    
    menuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Animación para los elementos del menú
    const menuItems = document.querySelectorAll('.hex-item');
    
    menuItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) rotate(360deg)';
            this.style.transition = 'all 0.5s ease';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
    
    // Efecto de aparición al hacer scroll
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observar todas las secciones para animarlas al hacer scroll
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
        section.style.transition = 'all 0.8s ease-out';
        observer.observe(section);
    });
    
    // Animación para el formulario de contacto
    const formInputs = document.querySelectorAll('.contact-form input, .contact-form textarea');
    
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.style.borderColor = 'var(--dorado-miel)';
            this.style.boxShadow = '0 0 8px rgba(243, 156, 18, 0.5)';
            this.style.transform = 'scale(1.02)';
        });
        
        input.addEventListener('blur', function() {
            this.style.borderColor = '';
            this.style.boxShadow = '';
            this.style.transform = '';
        });
    });

    // Carruseles dentro de hexágonos
    const carousels = document.querySelectorAll('.carousel');
    carousels.forEach(carousel => {
        const images = carousel.querySelectorAll('img');
        let current = 0;
        if (images.length > 0) {
            images[0].classList.add('active');
        }
        setInterval(() => {
            if (images.length < 2) return;
            images[current].classList.remove('active');
            current = (current + 1) % images.length;
            images[current].classList.add('active');
        }, 3000);
    });

    // Tabs en Servicios: Servicios / Actividades
    const serviceTabs = document.querySelectorAll('.services-tabs .tab');
    const tabServicios = document.getElementById('tab-servicios');
    const tabActividades = document.getElementById('tab-actividades');

    if (serviceTabs.length) {
        serviceTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                // Activar botón
                serviceTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');

                // Mostrar contenido correspondiente
                [tabServicios, tabActividades].forEach(c => c && c.classList.remove('active'));
                const target = tab.dataset.tab === 'actividades' ? tabActividades : tabServicios;
                if (target) target.classList.add('active');
            });
        });
    }
});