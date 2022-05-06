import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-culture',
	templateUrl: './culture.component.html',
	styleUrls: ['./culture.component.css']
})
export class CultureComponent implements OnInit {

	constructor() { }

	isScrolling: boolean = false;

	ngOnInit(): void {
		// Changer le menu-item qui a la classe "is-active"
		document.querySelectorAll(".menu-list a").forEach((link) => {
			link.addEventListener("click", () => {
				const activeLink = document.querySelector(".menu-list a.is-active");
				activeLink?.classList.remove("is-active");
				link.classList.add("is-active");
			});
		});

		// ScrollSpy du menu - Dès qu'on franchit le milieu horizontal du viewport, on est notifié de l'élément visible
		const articles = document.getElementsByTagName("article");
		const observer = new IntersectionObserver((entries: IntersectionObserverEntry[]) => {
			for (const entry of entries) {
				if (entry.isIntersecting && !this.isScrolling) {
					const itemMenu = document.querySelector(`a[data-id='${entry.target.id}']`);
					const activeLink = document.querySelector(".menu-list a.is-active");
					activeLink?.classList.remove("is-active");
					itemMenu?.classList.add("is-active");
				}
			}
		}, { rootMargin: "-50% 0px" });

		for (let i = 0; i < articles.length; i++) { observer.observe(articles[i]); }
	}

	scrollTo(element: string): void {
		this.isScrolling = true;
		document.getElementById(element)?.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });

		// Utilisation du setTimeout() pour éviter de voir tous les menu-item passer un à un en "is-active"
		setTimeout(() => { this.isScrolling = false; }, 900);
	}

}
