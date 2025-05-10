// Menu mobile
document.addEventListener('DOMContentLoaded', () => {
    // Cache de elementos DOM
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;
    const header = document.querySelector('header');
    const contactForm = document.querySelector('.order-form');
    const closeMenuBtn = document.querySelector('.close-menu');

    if (!burger || !navLinks) return;

    // Função para fechar o menu
    const closeMenu = () => {
        navLinks.classList.remove('nav-active');
        burger.classList.remove('toggle');
        body.style.overflow = 'auto';
    };

    // Toggle do menu com animação suave
    burger.addEventListener('click', () => {
        navLinks.classList.toggle('nav-active');
        burger.classList.toggle('toggle');
        body.style.overflow = navLinks.classList.contains('nav-active') ? 'hidden' : 'auto';
    });

    // Fecha o menu ao clicar em um link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Fecha o menu ao clicar fora
    document.addEventListener('click', (e) => {
        if (!navLinks.contains(e.target) && !burger.contains(e.target) && navLinks.classList.contains('nav-active')) {
            closeMenu();
        }
    });

    // Previne que o clique no menu propague para o documento
    navLinks.addEventListener('click', (e) => e.stopPropagation());

    // Smooth scroll para links de navegação
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Melhorar animação de scroll com throttling
    let lastScroll = 0;
    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const currentScroll = window.pageYOffset;
                
                if (currentScroll <= 0) {
                    header.classList.remove('scroll-up');
                } else if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
                    header.classList.remove('scroll-up');
                    header.classList.add('scroll-down');
                    header.style.transform = 'translateY(-100%)';
                } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
                    header.classList.remove('scroll-down');
                    header.classList.add('scroll-up');
                    header.style.transform = 'translateY(0)';
                }
                
                lastScroll = currentScroll;
                ticking = false;
            });
            ticking = true;
        }
    });

    // Melhorar feedback do formulário
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const button = contactForm.querySelector('button');
            if (!button) return;
            
            const originalText = button.textContent;
            button.disabled = true;
            button.textContent = 'Enviando...';
            button.classList.add('loading');
            
            // Simular envio do formulário
            setTimeout(() => {
                button.classList.remove('loading');
                button.classList.add('success');
                button.textContent = 'Enviado!';
                
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.textContent = 'Mensagem enviada com sucesso!';
                contactForm.appendChild(successMessage);
                
                contactForm.reset();
                
                setTimeout(() => {
                    button.disabled = false;
                    button.textContent = originalText;
                    button.classList.remove('success');
                    successMessage.remove();
                }, 2000);
            }, 1500);
        });
    }

    // Animação de elementos quando entram na viewport
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, { threshold: 0.1 });

    // Observa elementos para animação
    document.querySelectorAll('.product-card, .about-content, .hero-content').forEach((el) => {
        observer.observe(el);
    });

    // Adiciona classe de animação ao carregar a página
    document.body.classList.add('loaded');

    // Melhorar animação dos cards com debounce
    let timeout;
    document.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            clearTimeout(timeout);
            card.style.transform = 'translateY(-10px)';
            card.style.boxShadow = '0 10px 20px rgba(0,0,0,0.2)';
        });
        
        card.addEventListener('mouseleave', () => {
            timeout = setTimeout(() => {
                card.style.transform = 'translateY(0)';
                card.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
            }, 100);
        });
    });

    // Melhorar validação do formulário
    if (contactForm) {
        const inputs = contactForm.querySelectorAll('input, textarea');
        
        inputs.forEach(input => {
            input.addEventListener('focus', () => {
                input.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', () => {
                if (!input.value) {
                    input.parentElement.classList.remove('focused');
                }
            });
            
            input.addEventListener('input', () => {
                input.classList.toggle('valid', !!input.value);
            });
        });
    }

    // Botão de fechar menu lateral
    if (closeMenuBtn) {
        closeMenuBtn.addEventListener('click', closeMenu);
    }
}); 