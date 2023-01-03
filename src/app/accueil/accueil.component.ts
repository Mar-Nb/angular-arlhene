import { Component, OnInit } from '@angular/core';
import { FacepalmsService } from '../services/facepalms.service';

@Component({
	selector: 'app-accueil',
	templateUrl: './accueil.component.html',
	styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {

	constructor(private fpServ: FacepalmsService) { }

	isScrolling: boolean = false;
	listeFP: any;

	ngOnInit(): void {
		// Changer le menu-item qui a la classe "is-active"
		document.querySelectorAll(".menu-list a").forEach((link) => {
			link.addEventListener("click", () => {
				document.querySelectorAll("a.is-active").forEach((e) => e.classList.remove("is-active"));
				
				// Les items possédant le même data-id que le lien cliqué sont passés en "is-active"
				document.querySelectorAll(`a[data-id='${(link as HTMLAnchorElement).dataset['id']}'`).forEach((e) => {
					e.classList.add("is-active");
				});
			});
		});

		// ScrollSpy du menu - Dès qu'on franchit le milieu horizontal du viewport, on est notifié de l'élément visible
		const articles = document.getElementsByTagName("article");
		const observer = new IntersectionObserver((entries: IntersectionObserverEntry[]) => {
			for (const entry of entries) {
				if (entry.isIntersecting && !this.isScrolling) {
					const itemMenu = document.querySelector(`.fixed-menu a[data-id='${entry.target.id}']`);
					const itemMenuOff = document.querySelector(`.offcanvas a[data-id='${entry.target.id}']`);
					const activeLink = document.querySelector(".fixed-menu a.is-active");
					const activeLinkOff = document.querySelector(".offcanvas a.is-active");
					activeLink?.classList.remove("is-active");
					activeLinkOff?.classList.remove("is-active");
					itemMenu?.classList.add("is-active");
					itemMenuOff?.classList.add("is-active");
				}
			}
		}, { rootMargin: "-50% 0px" });

		for (let i = 0; i < articles.length; i++) { observer.observe(articles[i]); }

		// Récupération des trois "facepalms" les plus récents en BD
		this.fpServ.getAll().subscribe({
			next: (value: any) => { this.listeFP = value; },
			error: (err: Error) => alert("Erreur de récupération des PNJ : " + err.message)
		});
	}

	scrollTo(element: string): void {
		this.isScrolling = true;
		document.getElementById(element)?.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });

		// Utilisation du setTimeout() pour éviter de voir tous les menu-item passer un à un en "is-active"
		setTimeout(() => { this.isScrolling = false; }, 900);
	}

	openOffCanvas() {
		(document.querySelector(".offcanvas") as HTMLDivElement).style.width = "100%";
		document.getElementsByTagName("html")[0]?.classList.add("is-clipped");
	}

	closeOffCanvas() {
		(document.querySelector(".offcanvas") as HTMLDivElement).style.width = "0";
		document.getElementsByTagName("html")[0]?.classList.remove("is-clipped");
	}

}
