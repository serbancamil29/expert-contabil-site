import './styles.css';

const header = document.querySelector('#header');
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('#nav-menu');
const contactForm = document.querySelector('#contact-form');

const drawer = document.querySelector('#editor-drawer');
const openEditorButton = document.querySelector('#open-editor');
const closeEditorButton = document.querySelector('#close-editor');
const editorForm = document.querySelector('#editor-form');
const saveStatus = document.querySelector('#save-status');
const copyContentButton = document.querySelector('#copy-content');
const resetContentButton = document.querySelector('#reset-content');

const announcementTitle = document.querySelector('#announcement-title');
const announcementBody = document.querySelector('#announcement-body');
const announcementDate = document.querySelector('#announcement-date');
const jobTitle = document.querySelector('#job-title');
const jobBody = document.querySelector('#job-body');

const STORAGE_KEY = 'expert-contabil-neculai-liviu-content-v2';

const defaultContent = {
  announcementTitle: 'Termen important pentru transmiterea documentelor',
  announcementBody:
    'Vă rugăm să transmiteți documentele contabile aferente lunii curente până cel târziu pe data de 5 a lunii următoare, pentru procesare în timp util și verificarea obligațiilor fiscale.',
  jobTitle: 'Contabil junior / asistent contabil',
  jobBody:
    'Căutăm o persoană atentă la detalii, interesată de contabilitate, documente justificative și relația cu clienții. Experiența este utilă, dar nu obligatorie. Trimite CV-ul folosind formularul de contact.',
  updatedAt: ''
};

const loadContent = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? { ...defaultContent, ...JSON.parse(saved) } : defaultContent;
  } catch (error) {
    console.warn('Nu s-a putut citi conținutul salvat.', error);
    return defaultContent;
  }
};

const formatDate = (value) => {
  if (!value) return 'Actualizat recent';
  return `Actualizat la ${new Intl.DateTimeFormat('ro-RO', {
    dateStyle: 'medium',
    timeStyle: 'short'
  }).format(new Date(value))}`;
};

const applyContent = (content) => {
  announcementTitle.textContent = content.announcementTitle;
  announcementBody.textContent = content.announcementBody;
  announcementDate.textContent = formatDate(content.updatedAt);
  jobTitle.textContent = content.jobTitle;
  jobBody.textContent = content.jobBody;

  if (editorForm) {
    editorForm.elements.announcementTitle.value = content.announcementTitle;
    editorForm.elements.announcementBody.value = content.announcementBody;
    editorForm.elements.jobTitle.value = content.jobTitle;
    editorForm.elements.jobBody.value = content.jobBody;
  }
};

const saveContent = () => {
  const content = {
    announcementTitle: editorForm.elements.announcementTitle.value.trim() || defaultContent.announcementTitle,
    announcementBody: editorForm.elements.announcementBody.value.trim() || defaultContent.announcementBody,
    jobTitle: editorForm.elements.jobTitle.value.trim() || defaultContent.jobTitle,
    jobBody: editorForm.elements.jobBody.value.trim() || defaultContent.jobBody,
    updatedAt: new Date().toISOString()
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
  applyContent(content);
  saveStatus.textContent = 'Salvat automat în browser.';

  window.clearTimeout(saveContent.statusTimeout);
  saveContent.statusTimeout = window.setTimeout(() => {
    saveStatus.textContent = 'Salvare automată activă.';
  }, 1800);
};

const openEditor = () => {
  drawer.classList.add('open');
  drawer.setAttribute('aria-hidden', 'false');
  document.body.classList.add('no-scroll');
};

const closeEditor = () => {
  drawer.classList.remove('open');
  drawer.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('no-scroll');
};

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

  const subject = encodeURIComponent(`Solicitare - ${companyType}`);
  const body = encodeURIComponent(
    `Bună ziua,\n\nNume: ${name}\nEmail: ${email}\nTip solicitare: ${companyType}\n\nMesaj:\n${message}\n\nMulțumesc.`
  );

  window.location.href = `mailto:office@expert-contabil.ro?subject=${subject}&body=${body}`;
});

openEditorButton.addEventListener('click', openEditor);
closeEditorButton.addEventListener('click', closeEditor);

drawer.addEventListener('click', (event) => {
  if (event.target === drawer) closeEditor();
});

window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeEditor();
});

editorForm.addEventListener('input', saveContent);

resetContentButton.addEventListener('click', () => {
  localStorage.removeItem(STORAGE_KEY);
  applyContent(defaultContent);
  saveStatus.textContent = 'Conținutul demo a fost resetat.';
});

copyContentButton.addEventListener('click', async () => {
  const content = loadContent();
  const text = `Titlu informare: ${content.announcementTitle}\n\nInformare:\n${content.announcementBody}\n\nTitlu job: ${content.jobTitle}\n\nJob:\n${content.jobBody}`;

  try {
    await navigator.clipboard.writeText(text);
    saveStatus.textContent = 'Conținut copiat în clipboard.';
  } catch {
    saveStatus.textContent = 'Nu s-a putut copia automat. Selectează manual textul din câmpuri.';
  }
});

applyContent(loadContent());
