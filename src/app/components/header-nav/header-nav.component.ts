import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-header-nav',
	templateUrl: './header-nav.component.html',
	styleUrls: ['./header-nav.component.css'],
})
export class HeaderNavComponent implements OnInit {

	constructor() {}

	ngOnInit(): void {}

	openAboutMe(){
		document.getElementById('about-me-container')?.classList.add('right-show')
		document.getElementById('about-me-container')?.classList.remove('right-hidden')
	}

	closeAboutMe(){
		document.getElementById('about-me-container')?.classList.add('right-hidden')
		document.getElementById('about-me-container')?.classList.remove('right-show')
	}
}
