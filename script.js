emailjs.init("PetBloom"); // User ID do EmailJS

// Formulário de Contato com Validação
document.getElementById('contact-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const message = document.getElementById('message');
    let isValid = true;

    document.querySelectorAll('.error-message').forEach(msg => msg.textContent = '');

    // Validação
    if (!name.value.trim()) {
        name.nextElementSibling.textContent = 'Por favor, insira seu nome.';
        isValid = false;
    }
    if (!email.value.match(/^[^@]+@[^@]+\.[^@]+$/)) {
        email.nextElementSibling.textContent = 'Por favor, insira um e-mail válido.';
        isValid = false;
    }
    if (!message.value.trim()) {
        message.nextElementSibling.textContent = 'Por favor, insira uma mensagem.';
        isValid = false;
    }

    if (isValid) {
        emailjs.send('your_service_id', 'your_template_id', {
            from_name: name.value,
            from_email: email.value,
            message: message.value
        })
        .then(() => {
            alert('Mensagem enviada com sucesso!');
            document.getElementById('contact-form').reset();
        }, (error) => {
            alert('Erro ao enviar mensagem: ' + JSON.stringify(error));
        });
    }
});

// Carrossel
const carouselItems = document.querySelectorAll('.carousel-item');
let currentIndex = 0;

function showSlide(index) {
    carouselItems.forEach((item, i) => {
        item.classList.toggle('active', i === index);
    });
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % carouselItems.length;
    showSlide(currentIndex);
}

showSlide(currentIndex);
setInterval(nextSlide, 5000);

// FAQ
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const answer = question.nextElementSibling;
        answer.classList.toggle('active');
        question.classList.toggle('active');
    });
});

const backToTopBtn = document.getElementById('back-to-top');
window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Filtro de Produtos
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-filter');
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        document.querySelectorAll('.card').forEach(card => {
            const category = card.getAttribute('data-category');
            card.style.display = (filter === 'all' || category === filter) ? 'block' : 'none';
        });
    });
});

// Modal de Detalhes do Produto
const modal = document.getElementById('product-modal');
const modalImage = document.getElementById('modal-image');
const modalTitle = document.getElementById('modal-title');
const modalDescription = document.getElementById('modal-description');
const modalPrice = document.getElementById('modal-price');
const closeModal = document.querySelector('.close-modal');

document.querySelectorAll('.details-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const card = btn.closest('.card');
        modalImage.src = card.querySelector('img').src;
        modalTitle.textContent = card.querySelector('h4').textContent;
        modalDescription.textContent = card.querySelector('p').textContent;
        modalPrice.textContent = `Preço: R$${card.querySelector('meta[itemprop="price"]').content}`;
        modal.style.display = 'flex';
    });
});

closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.style.display = 'none';
});

window.addEventListener('scroll', () => {
    const parallax = document.querySelector('.parallax-bg');
    const scrollPosition = window.scrollY;
    parallax.style.transform = `translateY(${scrollPosition * 0.5}px)`;
});

// Suporte a Instalação PWA
let deferredPrompt;
const installBtn = document.getElementById('install-btn');

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    installBtn.style.display = 'inline-block';
});

installBtn.addEventListener('click', () => {
    if (deferredPrompt) {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('Usuário aceitou instalar o PWA');
            }
            deferredPrompt = null;
            installBtn.style.display = 'none';
        });
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.getElementById('nav-links');

    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        const isExpanded = navLinks.classList.contains('active');
        menuToggle.setAttribute('aria-expanded', isExpanded);
    });
});
