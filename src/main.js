import './styles.css';

const header = document.querySelector('#header');
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('#nav-menu');
const contactForm = document.querySelector('#contact-form');

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 8);
});

navToggle.addEventListener('click', () => {
  const expanded = navToggle.getAttribute('aria-expanded') === 'true';
  navToggle.setAttribute('aria-expanded', String(!expanded));
  navMenu.classList.toggle('open');
});

navMenu.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navToggle.setAttribute('aria-expanded', 'false');
    navMenu.classList.remove('open');
  });
});

contactForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(contactForm);
  const name = data.get('name');
  const email = data.get('email');
  const companyType = data.get('companyType');
  const message = data.get('message');

  const subject = encodeURIComponent(`Solicitare ofertă contabilitate - ${companyType}`);
  const body = encodeURIComponent(
    `Bună ziua,\n\nNume: ${name}\nEmail: ${email}\nTip companie: ${companyType}\n\nMesaj:\n${message}\n\nMulțumesc.`
  );

  window.location.href = `mailto:office@contaplus.ro?subject=${subject}&body=${body}`;
});
