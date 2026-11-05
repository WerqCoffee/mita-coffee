const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.site-nav');

menuButton.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Open navigation' : 'Close navigation');
  navigation.classList.toggle('open', !isOpen);
});

navigation.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open navigation');
    navigation.classList.remove('open');
  });
});

document.querySelectorAll('[data-subject]').forEach((link) => {
  link.addEventListener('click', () => {
    const subject = document.querySelector('#subject');
    if (subject) subject.value = link.dataset.subject;
  });
});

document.querySelector('#contact-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.reportValidity()) return;

  const data = new FormData(form);
  const subject = String(data.get('subject')).trim();
  const body = [
    `Name: ${String(data.get('name')).trim()}`,
    `Email: ${String(data.get('email')).trim()}`,
    '',
    String(data.get('message')).trim(),
  ].join('\n');
  const mailto = `mailto:Info.mitacoffee@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  document.querySelector('#form-status').textContent = 'Your email app should open with the inquiry ready. Please review and send it there.';
  window.location.href = mailto;
});

document.querySelector('#year').textContent = new Date().getFullYear();
