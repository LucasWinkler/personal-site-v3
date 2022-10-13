// const FastAverageColor = require("fast-average-color").FastAverageColor;
import { FastAverageColor } from 'fast-average-color';
const fac = new FastAverageColor();

const header = document.querySelector('.header');
const navToggle = document.querySelector('.nav__mobile-toggle');
const navList = document.querySelector('.nav__list');
const navLinks = document.querySelectorAll('.nav__link');
const skillsItem = document.querySelectorAll('.skills__item');
const skillsImages = document.querySelectorAll('.skills__image');
	

// const animationTimeRange = [1, 5];

// function getRandomIntFromRange(range) {
// 	return range[Math.floor(Math.random() * range.length)];
// }

// function randomizeSkillsAnimationDelay() {
// 	skillsItem.forEach(skill => {
// 		skill.style.setProperty(
// 			'--animation-delay',
// 			getRandomIntFromRange(animationTimeRange)
// 		);
// 	});
// }

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
		var elementVisible = 60;

		if (elementTop < windowHeight - elementVisible) {
			reveals[i].classList.add('reveal--active');
		}

		// DISABLED FOR: Bad user experience when interacting
		// with the contact form.
		//
		// Separate the remove to it's own if statement to prevent
		// reveal--active from constantly being added and removed on scroll
		// due to elementTop changing on animation
		// if (!(elementTop < windowHeight)) {
		// 	reveals[i].classList.remove('reveal--active');
		// }
	}
}

window.addEventListener('scroll', reveal);

navToggle.addEventListener('click', () => {
	navList.hasAttribute('data-visible')
		? navToggle.setAttribute('aria-expanded', false)
		: navToggle.setAttribute('aria-expanded', true);
	navList.toggleAttribute('data-visible');
	header.toggleAttribute('data-overlay');
	document.body.classList.toggle('overflow-hidden');
});

navLinks.forEach(navLink => {
	navLink.addEventListener('click', () => {
		navToggle.setAttribute('aria-expanded', false);
		navList.removeAttribute('data-visible');
		header.removeAttribute('data-overlay');
		document.body.classList.remove('overflow-hidden');
	});
});

window.onresize = function () {
	var w = outerWidth;

	if (w > 768) {
		navToggle.setAttribute('aria-expanded', false);
		navList.removeAttribute('data-visible');
		header.removeAttribute('data-overlay');
		document.body.classList.remove('overflow-hidden');
	}
};

navList.addEventListener('click', function (e) {
	if (e.offsetX < 0) {
		navToggle.setAttribute('aria-expanded', false);
		navList.removeAttribute('data-visible');
		header.removeAttribute('data-overlay');
		document.body.classList.remove('overflow-hidden');
	}
});

// Check the position of elements on load
reveal();
// randomizeSkillsAnimationDelay();
