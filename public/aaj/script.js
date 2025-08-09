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
