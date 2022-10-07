const header = document.querySelector('.header');
const navToggle = document.querySelector('.nav__mobile-toggle');
const navList = document.querySelector('.nav__list');

navToggle.addEventListener('click', () => {
  navList.hasAttribute('data-visible')
    ? navToggle.setAttribute('aria-expanded', false)
    : navToggle.setAttribute('aria-expanded', true);
  navList.toggleAttribute('data-visible');
  // header.toggleAttribute('data-overlay');
});
