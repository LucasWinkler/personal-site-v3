import { FastAverageColor } from 'fast-average-color';
const fac = new FastAverageColor();

const header = document.querySelector('.header');
const navToggle = document.querySelector('.nav__mobile-toggle');
const navList = document.querySelector('.nav__list');
const floatingCta = document.querySelector('.floating-cta');
const contact = document.querySelector('.contact');
const navLinks = document.querySelectorAll('.nav__link');
const skillsImages = document.querySelectorAll('.skills__image');
let lastScrollY = window.scrollY;

// Sets the --skill-colour css custom property using the
// average colour of the skill logo
skillsImages.forEach(skill => {
  fac.getColorAsync(skill).then(color => {
    skill.style.setProperty('--skill-colour', color.hex + 'aa');
  });
});

// Reveals elements on scroll
// Thanks to: https://alvarotrigo.com/blog/css-animations-scroll/
function reveal() {
  let reveals = document.querySelectorAll('.reveal');

  for (var i = 0; i < reveals.length; i++) {
    let windowHeight = window.innerHeight;
    let elementTop = reveals[i].getBoundingClientRect().top;
    let offset = 60;

    if (elementTop < windowHeight - offset) {
      reveals[i].classList.add('reveal--active');
    }
  }
}

// Runs the reveal animation function on scroll
window.addEventListener('scroll', reveal);

window.addEventListener('scroll', () => {
  // if (window.scrollY >= header.offsetHeight / 2) {
  //   header.classList.add('header--scrolled');
  // } else {
  //   header.classList.remove('header--scrolled');
  // }
  // console.log('lastScrollY', lastScrollY);
  // console.log('currentScrollY', window.scrollY);

  if (
    lastScrollY < window.scrollY ||
    window.scrollY <= header.offsetHeight / 2
  ) {
    header.classList.remove('header--scrolled');
  } else {
    header.classList.add('header--scrolled');
  }

  lastScrollY = window.scrollY;
});

function toggleFloatingCta() {
  let contactTop = contact.getBoundingClientRect().top;
  let windowHeight = window.innerHeight;
  let offset = 20;

  if (contactTop < windowHeight + offset) {
    floatingCta.classList.add('floating-cta--hidden');
  } else {
    floatingCta.classList.remove('floating-cta--hidden');
  }
}

window.addEventListener('scroll', toggleFloatingCta);

// Toggles the nav menu
navToggle.addEventListener('click', () => {
  navList.hasAttribute('data-visible')
    ? navToggle.setAttribute('aria-expanded', false)
    : navToggle.setAttribute('aria-expanded', true);
  navList.toggleAttribute('data-visible');
  header.toggleAttribute('data-overlay');
  document.body.classList.toggle('overflow-hidden');
});

// Closes nav menu when a nav link is clicked
navLinks.forEach(navLink => {
  navLink.addEventListener('click', () => {
    navToggle.setAttribute('aria-expanded', false);
    navList.removeAttribute('data-visible');
    header.removeAttribute('data-overlay');
    document.body.classList.remove('overflow-hidden');
  });
});

// Closes nav menu when screen size gets bigger than a 768px
function checkBrowserWidth() {
  let browserWidth = window.innerWidth;

  if (browserWidth >= 768) {
    navToggle.setAttribute('aria-expanded', false);
    navList.removeAttribute('data-visible');
    header.removeAttribute('data-overlay');
    document.body.classList.remove('overflow-hidden');
  }
}

window.onresize = function () {
  reveal();
  checkBrowserWidth();
};

// Checks if the user clicked outside of the mobile nav menu and if so closes the menu
navList.addEventListener('click', function (e) {
  if (e.offsetX < 0) {
    navToggle.setAttribute('aria-expanded', false);
    navList.removeAttribute('data-visible');
    header.removeAttribute('data-overlay');
    document.body.classList.remove('overflow-hidden');
  }
});

document.addEventListener('DOMContentLoaded', function () {
  var lazyBackgrounds = [].slice.call(
    document.querySelectorAll('.background-circle')
  );

  if ('IntersectionObserver' in window) {
    let lazyBackgroundObserver = new IntersectionObserver(function (
      entries,
      observer
    ) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('background-circle--visible');
          lazyBackgroundObserver.unobserve(entry.target);
        }
      });
    });

    lazyBackgrounds.forEach(function (lazyBackground) {
      lazyBackgroundObserver.observe(lazyBackground);
    });
  }
});

// Waits until everythings loaded before doing the initial reveal.
// This might solve the issue where the hero paragraph reveals instantly.
window.addEventListener('load', () => {
  reveal();
});
