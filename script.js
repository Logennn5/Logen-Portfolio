// 1. Show or hide the navigation menu on small screens.
const menuButton = document.getElementById('menuButton');
const navigation = document.getElementById('navigation');

menuButton.addEventListener('click', function () {
  navigation.classList.toggle('open');
  const isOpen = navigation.classList.contains('open');
  menuButton.setAttribute('aria-expanded', isOpen);
  menuButton.textContent = isOpen ? '✕' : '☰';
});

// Close the mobile menu after a navigation link is selected.
navigation.querySelectorAll('a').forEach(function (link) {
  link.addEventListener('click', function () {
    navigation.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.textContent = '☰';
  });
});

// 2. Switch between light and dark themes.
const themeButton = document.getElementById('themeButton');
themeButton.addEventListener('click', function () {
  document.body.classList.toggle('dark');
  const darkModeOn = document.body.classList.contains('dark');
  themeButton.textContent = darkModeOn ? 'Light mode' : 'Dark mode';
});

// 3. Update the footer year automatically.
document.getElementById('year').textContent = new Date().getFullYear();

// 4. Show the back-to-top button after scrolling down.
const topButton = document.getElementById('topButton');
window.addEventListener('scroll', function () {
  if (window.scrollY > 300) {
    topButton.classList.add('visible');
  } else {
    topButton.classList.remove('visible');
  }
});
topButton.addEventListener('click', function () {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// 5. Check that the contact form has been filled in.
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');
contactForm.addEventListener('submit', function (event) {
  event.preventDefault();
  if (!contactForm.checkValidity()) {
    contactForm.reportValidity();
    return;
  }
  formMessage.textContent = 'Thanks! The form looks complete. This demo does not send messages yet.';
  contactForm.reset();
});
