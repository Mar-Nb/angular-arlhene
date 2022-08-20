import { Component, OnInit } from '@angular/core';
import { GuildeService } from '../services/guilde.service';

@Component({
	selector: 'app-guilde',
	templateUrl: './guilde.component.html',
	styleUrls: ['./guilde.component.css']
})
export class GuildeComponent implements OnInit {

	constructor(private guildeServ: GuildeService) { }

	isScrolling: boolean = false;
	listeMembres: any = [];

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
		
		this.guildeServ.getMembres().subscribe({
			next: (value: any) => { this.listeMembres = value; console.log(this.listeMembres); },
			error: (err: Error) => alert("Erreur de récupération des membres de la guilde : " + err.message)
		});
		
		document.addEventListener("keydown", (evt) => {
			const e = evt || window.event;
			if (e.code == "Escape") { this.closeAllModals(); }
		});
	}

	scrollTo(element: string): void {
		this.isScrolling = true;
		document.getElementById(element)?.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });

		// Utilisation du setTimeout() pour éviter de voir tous les menu-item passer un à un en "is-active"
		setTimeout(() => { this.isScrolling = false; }, 900);
	}
	
	openModal(id: string) {
		document.getElementById(id)?.classList.add("is-active");
		document.getElementsByTagName("html")[0].classList.add("is-clipped");
	}
	
	closeModal(id: string) {
		document.getElementById(id)?.classList.remove("is-active");
		document.getElementsByTagName("html")[0].classList.remove("is-clipped");
	}
	
	closeAllModals() {
		(document.querySelectorAll(".modal") || []).forEach((modal) => { this.closeModal(modal.id); });
	}
}
