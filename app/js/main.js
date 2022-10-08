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

function reveal() {
	var reveals = document.querySelectorAll('.reveal');
	for (var i = 0; i < reveals.length; i++) {
		var windowHeight = window.innerHeight;
		var elementTop = reveals[i].getBoundingClientRect().top;
		var elementVisible = 50;

		if (elementTop < windowHeight - elementVisible) {
			reveals[i].classList.add('active');
		} else {
			reveals[i].classList.remove('active');
		}
	}
}

window.addEventListener('scroll', reveal);
reveal();