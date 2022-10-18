import { FastAverageColor } from 'fast-average-color';
const fac = new FastAverageColor();

const header = document.querySelector('.header');
const navToggle = document.querySelector('.nav__mobile-toggle');
const navList = document.querySelector('.nav__list');
const navLinks = document.querySelectorAll('.nav__link');
const skillsItem = document.querySelectorAll('.skills__item');
const skillsImages = document.querySelectorAll('.skills__image');

// Sets the --skill-colour css custom property using the
// average colour of the skill logo 
skillsImages.forEach(skill => {
	fac.getColorAsync(skill)
		.then(color => {
			skill.style.setProperty('--skill-colour', color.hex + 'aa')
		})
});

// Reveals elements on scroll
// Thanks to: https://alvarotrigo.com/blog/css-animations-scroll/
function reveal() {
	var reveals = document.querySelectorAll('.reveal');
	for (var i = 0; i < reveals.length; i++) {
		var windowHeight = window.innerHeight;
		var elementTop = reveals[i].getBoundingClientRect().top;
		var elementVisible = 60; // Offset for when revveal--active is applied

		if (elementTop < windowHeight - elementVisible) {
			reveals[i].classList.add('reveal--active');
		}
	}
}

// Runs the reveal animation function on scroll
// window.addEventListener('scroll', reveal);

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
window.onresize = function () {
	let browserWidth = window.outerWidth;

	if (browserWidth > 768) {
    navToggle.setAttribute('aria-expanded', false);
    navList.removeAttribute('data-visible');
    header.removeAttribute('data-overlay');
    document.body.classList.remove('overflow-hidden');
  }
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

// Waits until everythings loaded before doing the initial reveal.
// This might solve the issue where the hero paragraph reveals instantly.
window.addEventListener('load', () => {
  // reveal();
});