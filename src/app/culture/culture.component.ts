import { Component, OnInit } from '@angular/core';
import { CultureService } from '../services/culture.service';

@Component({
	selector: 'app-culture',
	templateUrl: './culture.component.html',
	styleUrls: ['./culture.component.css']
})
export class CultureComponent implements OnInit {

	constructor(private cultServ: CultureService) { }

	isScrolling: boolean = false;
	listeMenu: string[] = [];
	listeSousMenu: string[] = [];
	culture: any;
	activeMenu: string = "";

	ngOnInit(): void {
		this.cultServ.getMenu().subscribe({
			next: (value) => {
				this.listeMenu = Object.values(value);
				this.activeMenu = this.listeMenu[0];
			},
		});

		this.cultServ.getContenu().subscribe({
			next: (value) => {
				let contenu = (document.getElementById("contenu") as HTMLDivElement);
				this.culture = value;
				contenu.innerHTML = this.culture.texte;

				// Remplissage du sous menu de l'offcanvas
				// contenu.querySelectorAll("h2, h3, h4, h5, h6").forEach((titre) => { listeSousMenu.push(titre.innerText); });
				document.querySelectorAll("ul[id^='sous-']").forEach(ul => ul.innerHTML = "");

				// const sousMenu = (document.getElementById("sous-" + this.activeMenu) as HTMLUListElement);
				let htmlSousMenu = "";
				contenu.querySelectorAll("h2:not(.no-menu), h3:not(.no-menu), h4:not(.no-menu), h5:not(.no-menu), h6:not(.no-menu)").forEach((titre, i) => {
					const sousLi = document.createElement("li");
					const id = "academie-" + (i + 1);
					sousLi.innerHTML = "<a data-id='" + id + "'" + (i == 0 ? " class='is-active'" : "") + ">" + titre.textContent + "</a>";
					htmlSousMenu += sousLi.outerHTML;
					// sousMenu.appendChild(sousLi);
				});

				// Ajout des sous-éléments de la section de culture en cours
				document.querySelectorAll("ul[id='sous-" + this.activeMenu + "']").forEach(ul => ul.innerHTML = htmlSousMenu);

				// onClick scrollTo() pour les liens des menus
				document.querySelectorAll("ul[id='sous-" + this.activeMenu + "'] a").forEach(a => (a as HTMLAnchorElement).onclick = () => {
					this.scrollTo((a as HTMLAnchorElement).dataset["id"] || '');
				});

				// Changer le menu-item qui a la classe "is-active"
				document.querySelectorAll(".menu-list ul[id='sous-" + this.activeMenu + "'] a").forEach((link) => {
					link.addEventListener("click", () => {
						const activeLink = document.querySelector(".fixed-menu a.is-active");
						const activeLinkOff = document.querySelector(".offcanvas a.is-active");
						activeLink?.classList.remove("is-active");
						activeLinkOff?.classList.remove("is-active");
						link.classList.add("is-active");

						const linkOff = document.querySelector(`.fixed-menu a[data-id='${(link as HTMLAnchorElement).dataset['id']}'`);
						linkOff?.classList.add("is-active");
					});
				});

				// ScrollSpy du menu - Dès qu'on franchit le milieu horizontal du viewport, on est notifié de l'élément visible
				const divs = document.getElementsByTagName("div");
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

				for (let i = 0; i < divs.length; i++) { observer.observe(divs[i]); }

				// Quelques fix de style (HTML mis dynamiquement, donc pas impacté par le CSS d'Angular)
				document.querySelectorAll("div#contenu div[id^='academie'], div#contenu p.has-text-justified:not(:first-child)").forEach((element) => {
					(element as HTMLElement).style.marginTop = "2rem";
					(element as HTMLElement).style.marginBottom = "2rem";
				});

				document.querySelectorAll("div#contenu ul").forEach(ul => { (ul as HTMLElement).style.listStyle = "inside"; });

				document.querySelectorAll("div.message").forEach(div => {
					(div as HTMLElement).style.marginTop = "1.5rem";
					(div as HTMLElement).style.marginBottom = "1.5rem";
				});
			}
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
