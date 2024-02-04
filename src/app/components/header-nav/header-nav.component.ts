import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-header-nav',
	templateUrl: './header-nav.component.html',
	styleUrls: ['./header-nav.component.css', './responsive.component.css'],
})
export class HeaderNavComponent implements OnInit {
	constructor() {}

	ngOnInit(): void {}

	openAboutMe() {
		const aboutMe = document.getElementById('about-me-container');

		if (aboutMe) {
			if (aboutMe.classList.contains('right-hidden')) {
				aboutMe.classList.remove('right-hidden');
				aboutMe.classList.add('right-show');
			} else {
				aboutMe.classList.remove('right-show');
				aboutMe.classList.add('right-hidden');
			}
		}
	}

	closeAboutMe() {
		document.getElementById('about-me-container')?.classList.add('right-hidden');
		document.getElementById('about-me-container')?.classList.remove('right-show');
	}

	showMenu() {
		const navMenu = document.getElementById('nav-menu');

		if (navMenu) {
			if (navMenu.classList.contains('responsive-menu-hidden')) {
				navMenu.classList.remove('responsive-menu-hidden');
			} else {
				navMenu.classList.add('responsive-menu-hidden');
			}
		}
	}
}
