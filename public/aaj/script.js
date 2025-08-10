// Script principal do site AAJ
// - Menu responsivo (hambúrguer)
// - Validação simples do formulário de contato
// - Melhorias de navegação (fechar menu após clique)

const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

// Ano no rodapé
(function setYear() {
  const yearEl = $('#year');
  if (yearEl) yearEl.textContent = new Date().getFullYear().toString();
})();

// Menu hamburguer
(function mobileMenu() {
  const toggle = $('.nav-toggle');
  const nav = $('#menu-principal');
  if (!toggle || !nav) return;

  const closeMenu = () => {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  };

  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  // Fecha ao clicar em link
  $$('.nav-link', nav).forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  // Fecha ao apertar ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });
})();

// Validação simples do formulário
(function contactForm() {
  const form = $('#form-contato');
  if (!form) return;

  const feedback = $('#form-feedback');
  const fields = {
    nome: $('#nome'),
    email: $('#email'),
    mensagem: $('#mensagem'),
  };

  const errorEls = {
    nome: document.querySelector('[data-error-for="nome"]'),
    email: document.querySelector('[data-error-for="email"]'),
    mensagem: document.querySelector('[data-error-for="mensagem"]'),
  };

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function setError(field, message) {
    if (errorEls[field]) errorEls[field].textContent = message || '';
  }

  function clearErrors() {
    Object.keys(errorEls).forEach((k) => setError(k, ''));
    if (feedback) feedback.textContent = '';
  }

  function validate() {
    clearErrors();
    let valid = true;

    if (!fields.nome.value.trim()) {
      setError('nome', 'Por favor, informe seu nome.');
      valid = false;
    }
    if (!emailRegex.test(fields.email.value.trim())) {
      setError('email', 'Digite um e-mail válido.');
      valid = false;
    }
    if (!fields.mensagem.value.trim() || fields.mensagem.value.trim().length < 10) {
      setError('mensagem', 'Escreva ao menos 10 caracteres.');
      valid = false;
    }

    return valid;
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!validate()) return;

    // Simulação de envio
    setTimeout(() => {
      if (feedback) {
        feedback.textContent = 'Mensagem enviada com sucesso! Obrigado pelo contato.';
      }
      form.reset();
    }, 300);
  });
})();

// Slider do HERO (transição automática de imagens)
(function heroSlider() {
  const media = document.querySelector('.hero-media');
  if (!media) return;

  const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const images = ['./hero-1.jpg', './hero-2.jpg', './hero-3.jpg', './hero-4.jpg', './hero-5.jpg'];

  // Preload de imagens
  images.forEach((src) => { const i = new Image(); i.src = src; });

  let i = 1; // começamos da segunda, pois a primeira já está no CSS
  let timer;
  const delay = 6000;

  function showNext() {
    if (reduceMotion) {
      media.style.backgroundImage = `url('${images[i]}')`;
      i = (i + 1) % images.length;
      return;
    }
    media.style.opacity = '0';
    setTimeout(() => {
      media.style.backgroundImage = `url('${images[i]}')`;
      media.style.opacity = '1';
      i = (i + 1) % images.length;
    }, 400);
  }

  function start() { stop(); timer = setInterval(showNext, delay); }
  function stop() { if (timer) clearInterval(timer); }

  // Inicia
  start();

  // Pausa quando a aba não estiver visível
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stop(); else start();
  });
})();
