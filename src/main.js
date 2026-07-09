import './styles.css';

const pageIds = ['acasa', 'despre', 'servicii', 'abonamente', 'informari', 'legislatie', 'cariere', 'portal', 'date-firma', 'contact'];

const navMenu = document.querySelector('#nav-menu');
const navToggle = document.querySelector('.nav-toggle');
const pageElements = [...document.querySelectorAll('[data-page]')];
const pageLinks = [...document.querySelectorAll('[data-page-link]')];
const themeToggle = document.querySelector('#theme-toggle');
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

const CONTENT_KEY = 'expert-contabil-neculai-liviu-content-v4';
const THEME_KEY = 'expert-contabil-neculai-liviu-theme-v4';

const defaultContent = {
  announcementTitle: 'Termen important pentru transmiterea documentelor',
  announcementBody:
    'Vă rugăm să transmiteți documentele contabile aferente lunii curente până cel târziu pe data de 5 a lunii următoare, pentru procesare în timp util și verificarea obligațiilor fiscale.',
  jobTitle: 'Contabil junior / asistent contabil',
  jobBody:
    'Căutăm o persoană atentă la detalii, interesată de contabilitate, documente justificative și relația cu clienții. Experiența este utilă, dar nu obligatorie.',
  updatedAt: ''
};

const getPageFromHash = () => {
  const page = window.location.hash.replace('#', '').trim();
  return pageIds.includes(page) ? page : 'acasa';
};

const closeMobileMenu = () => {
  navToggle?.setAttribute('aria-expanded', 'false');
  navMenu?.classList.remove('open');
};

const showPage = (pageId) => {
  const targetPage = pageIds.includes(pageId) ? pageId : 'acasa';

  pageElements.forEach((page) => {
    const isActive = page.dataset.page === targetPage;
    page.classList.toggle('is-active', isActive);
    page.setAttribute('aria-hidden', String(!isActive));
  });

  pageLinks.forEach((link) => {
    const isActive = link.dataset.pageLink === targetPage;
    link.classList.toggle('active', isActive);
    if (isActive) {
      link.setAttribute('aria-current', 'page');
    } else {
      link.removeAttribute('aria-current');
    }
  });

  closeMobileMenu();
  window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
};

const navigateTo = (pageId) => {
  const nextPage = pageIds.includes(pageId) ? pageId : 'acasa';
  if (window.location.hash !== `#${nextPage}`) {
    window.location.hash = nextPage;
  } else {
    showPage(nextPage);
  }
};

pageLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    const pageId = link.dataset.pageLink;
    if (!pageId) return;
    event.preventDefault();
    navigateTo(pageId);
  });
});

window.addEventListener('hashchange', () => showPage(getPageFromHash()));

navToggle?.addEventListener('click', () => {
  const expanded = navToggle.getAttribute('aria-expanded') === 'true';
  navToggle.setAttribute('aria-expanded', String(!expanded));
  navMenu?.classList.toggle('open', !expanded);
});

const setTheme = (theme) => {
  const nextTheme = theme === 'dark' ? 'dark' : 'light';
  document.documentElement.dataset.theme = nextTheme;
  localStorage.setItem(THEME_KEY, nextTheme);
  if (themeToggle) {
    themeToggle.querySelector('.theme-icon').textContent = nextTheme === 'dark' ? '☾' : '◐';
    themeToggle.setAttribute('aria-label', nextTheme === 'dark' ? 'Activează tema light' : 'Activează tema dark');
  }
};

const savedTheme = localStorage.getItem(THEME_KEY);
const preferredDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches;
setTheme(savedTheme || (preferredDark ? 'dark' : 'light'));

themeToggle?.addEventListener('click', () => {
  const current = document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
  setTheme(current === 'dark' ? 'light' : 'dark');
});

const loadContent = () => {
  try {
    const saved = localStorage.getItem(CONTENT_KEY);
    return saved ? { ...defaultContent, ...JSON.parse(saved) } : { ...defaultContent };
  } catch (error) {
    console.warn('Nu s-a putut citi conținutul local.', error);
    return { ...defaultContent };
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
  if (announcementTitle) announcementTitle.textContent = content.announcementTitle;
  if (announcementBody) announcementBody.textContent = content.announcementBody;
  if (announcementDate) announcementDate.textContent = formatDate(content.updatedAt);
  if (jobTitle) jobTitle.textContent = content.jobTitle;
  if (jobBody) jobBody.textContent = content.jobBody;

  if (editorForm) {
    editorForm.elements.announcementTitle.value = content.announcementTitle;
    editorForm.elements.announcementBody.value = content.announcementBody;
    editorForm.elements.jobTitle.value = content.jobTitle;
    editorForm.elements.jobBody.value = content.jobBody;
  }
};

const saveContent = () => {
  if (!editorForm) return;

  const content = {
    announcementTitle: editorForm.elements.announcementTitle.value.trim() || defaultContent.announcementTitle,
    announcementBody: editorForm.elements.announcementBody.value.trim() || defaultContent.announcementBody,
    jobTitle: editorForm.elements.jobTitle.value.trim() || defaultContent.jobTitle,
    jobBody: editorForm.elements.jobBody.value.trim() || defaultContent.jobBody,
    updatedAt: new Date().toISOString()
  };

  localStorage.setItem(CONTENT_KEY, JSON.stringify(content));
  applyContent(content);

  if (saveStatus) {
    saveStatus.textContent = 'Salvat automat local.';
    window.clearTimeout(saveContent.statusTimeout);
    saveContent.statusTimeout = window.setTimeout(() => {
      saveStatus.textContent = 'Salvare automată locală activă.';
    }, 1600);
  }
};

const openEditor = () => {
  if (!drawer) return;
  drawer.classList.add('open');
  drawer.setAttribute('aria-hidden', 'false');
  document.body.classList.add('no-scroll');
};

const closeEditor = () => {
  if (!drawer) return;
  drawer.classList.remove('open');
  drawer.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('no-scroll');
};

openEditorButton?.addEventListener('click', openEditor);
closeEditorButton?.addEventListener('click', closeEditor);

drawer?.addEventListener('click', (event) => {
  if (event.target === drawer) closeEditor();
});

window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeEditor();
});

editorForm?.addEventListener('input', saveContent);

resetContentButton?.addEventListener('click', () => {
  localStorage.removeItem(CONTENT_KEY);
  applyContent({ ...defaultContent });
  if (saveStatus) saveStatus.textContent = 'Conținutul demo a fost resetat.';
});

copyContentButton?.addEventListener('click', async () => {
  const content = loadContent();
  const text = `Informare: ${content.announcementTitle}\n\n${content.announcementBody}\n\nJob: ${content.jobTitle}\n\n${content.jobBody}`;

  try {
    await navigator.clipboard.writeText(text);
    if (saveStatus) saveStatus.textContent = 'Conținut copiat în clipboard.';
  } catch {
    if (saveStatus) saveStatus.textContent = 'Nu s-a putut copia automat. Selectează manual textul.';
  }
});

contactForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(contactForm);
  const name = data.get('name');
  const email = data.get('email');
  const companyType = data.get('companyType');
  const message = data.get('message');

  const subject = encodeURIComponent(`Solicitare site - ${companyType}`);
  const body = encodeURIComponent(
    `Bună ziua,\n\nNume / firmă: ${name}\nEmail: ${email}\nTip solicitare: ${companyType}\n\nMesaj:\n${message}\n\nMulțumesc.`
  );

  window.location.href = `mailto:office@expert-contabil.ro?subject=${subject}&body=${body}`;
});


const portalModes = [...document.querySelectorAll('[data-portal-mode]')];
const portalViews = [...document.querySelectorAll('[data-portal-view]')];
const clientRows = [...document.querySelectorAll('[data-client]')];
const clientSearchInput = document.querySelector('#client-search');
const clientCount = document.querySelector('#client-count');
const clientEmptyState = document.querySelector('#client-empty-state');

const portalClients = {
  alpha: {
    name: 'Alpha Market SRL', invoices: '42', payments: '8', docs: '3', tax: '12.400',
    status: 'Documente incomplete', docProgress: '72%', accountingProgress: '48%', taxProgress: '20%',
    message: 'Mai sunt necesare 3 documente pentru închiderea lunii și aprobarea plăților către furnizori.'
  },
  atelier: {
    name: 'Atelier Nord PFA', invoices: '16', payments: '2', docs: '1', tax: '3.100',
    status: 'Aproape finalizat', docProgress: '88%', accountingProgress: '74%', taxProgress: '55%',
    message: 'Lipsește extrasul de cont pentru reconciliere și confirmarea unei plăți către furnizor.'
  },
  medica: {
    name: 'Medica Plus SRL', invoices: '67', payments: '14', docs: '5', tax: '28.900',
    status: 'Necesită atenție', docProgress: '61%', accountingProgress: '36%', taxProgress: '18%',
    message: 'Sunt mai multe facturi neconfirmate și documente justificative care trebuie verificate.'
  },
  construct: {
    name: 'Construct Basota SRL', invoices: '38', payments: '6', docs: '2', tax: '17.250',
    status: 'În lucru', docProgress: '79%', accountingProgress: '52%', taxProgress: '31%',
    message: 'Este nevoie de confirmarea plăților scadente și de două documente justificative.'
  }
};


const updateClientSearch = () => {
  if (!clientSearchInput) return;
  const query = clientSearchInput.value.trim().toLowerCase();
  let visibleCount = 0;

  clientRows.forEach((row) => {
    const text = row.textContent.toLowerCase();
    const isVisible = !query || text.includes(query);
    row.hidden = !isVisible;
    if (isVisible) visibleCount += 1;
  });

  if (clientCount) {
    clientCount.textContent = query ? `${visibleCount} rezultate` : `${clientRows.length} firme`;
  }

  if (clientEmptyState) {
    clientEmptyState.hidden = visibleCount !== 0;
  }
};

const setText = (selector, value) => {
  const node = document.querySelector(selector);
  if (node) node.textContent = value;
};

const setProgress = (selector, value) => {
  const node = document.querySelector(selector);
  if (!node) return;
  node.textContent = value;
  const bar = node.parentElement?.querySelector('i');
  if (bar) bar.style.setProperty('--w', value);
};

const applyPortalClient = (key) => {
  const client = portalClients[key] || portalClients.alpha;
  clientRows.forEach((row) => row.classList.toggle('active', row.dataset.client === key));
  setText('#portal-client-name', client.name);
  setText('#portal-invoices', client.invoices);
  setText('#portal-payments', client.payments);
  setText('#portal-docs', client.docs);
  setText('#portal-tax', client.tax);
  setText('#portal-status', client.status);
  setText('#portal-client-message', client.message);
  setProgress('#portal-doc-progress', client.docProgress);
  setProgress('#portal-accounting-progress', client.accountingProgress);
  setProgress('#portal-tax-progress', client.taxProgress);
};

portalModes.forEach((button) => {
  button.addEventListener('click', () => {
    const mode = button.dataset.portalMode;
    portalModes.forEach((item) => item.classList.toggle('active', item === button));
    portalViews.forEach((view) => view.classList.toggle('is-active', view.dataset.portalView === mode));
  });
});

clientRows.forEach((row) => {
  row.addEventListener('click', () => applyPortalClient(row.dataset.client));
});

clientSearchInput?.addEventListener('input', updateClientSearch);

applyPortalClient('alpha');
updateClientSearch();

applyContent(loadContent());
showPage(getPageFromHash());
