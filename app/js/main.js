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

// Reveals elements on scroll
// Thanks to: https://alvarotrigo.com/blog/css-animations-scroll/
function reveal() {
	var reveals = document.querySelectorAll('.reveal');
	for (var i = 0; i < reveals.length; i++) {
		var windowHeight = window.innerHeight;
		var elementTop = reveals[i].getBoundingClientRect().top;
		var elementVisible = 100;

		if (elementTop < windowHeight - elementVisible) {
			reveals[i].classList.add('reveal--active');
		} else {
			reveals[i].classList.remove('reveal--active');
		}
	}
}
window.addEventListener('scroll', reveal);

// Check the position of elements on load
reveal();