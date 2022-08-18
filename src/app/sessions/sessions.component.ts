import { Component, OnInit, AfterViewInit, QueryList, ViewChildren } from '@angular/core';
import { SessionService } from '../services/session.service'

@Component({
	selector: 'app-sessions',
	templateUrl: './sessions.component.html',
	styleUrls: ['./sessions.component.css']
})
export class SessionsComponent implements OnInit, AfterViewInit {

	constructor(private sessionServ: SessionService) { }

	isScrolling: boolean = false;
	joueurs: any = [];
	sessions: any = [];
	
	// Pour repérer la fin du chargement de la liste des joueurs (dans l'élément "select")
	@ViewChildren('optionsJoueurs') optionsJ: QueryList <any> = new QueryList() ;
	
	// Pour repérer la fin du chargement de la liste des résumés de sessions (dans les balises "articles")
	@ViewChildren('listeSessions') listeS: QueryList <any> = new QueryList() ;
	
	ngAfterViewInit() {
		this.optionsJ.changes.subscribe(t => {
			// Dès que la liste est chargée, on va chercher les sessions
			this.getSessionsJoueur();
		});
		
		this.listeS.changes.subscribe(t => {
			// Une fois les articles chargés, on réécrit le style de liste
			document.querySelectorAll("article ul").forEach(ul => { (ul as HTMLElement).style.listStyle = "inside"; });
		});
	}

	ngOnInit(): void {
		// ScrollSpy du menu - Dès qu'on franchit le milieu horizontal du viewport, on est notifié de l'élément visible
		const sessions = document.getElementsByTagName("article");
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

		for (let i = 0; i < sessions.length; i++) { observer.observe(sessions[i]); }
		
		// Liste des joueurs ayant des POV de sessions
		this.sessionServ.getJoueurs().subscribe({
			next: (value: any) => {
				this.joueurs = value;
				console.log("Liste des joueurs : ", this.joueurs);				
			},
			error: (err: Error) => alert("Erreur de récupération des joueurs : " + err.message)
		});
	}

	scrollTo(element: string, link: any): void {
		this.isScrolling = true;
		document.getElementById(element)?.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });

		// Utilisation du setTimeout() pour éviter de voir tous les menu-item passer un à un en "is-active"
		setTimeout(() => { this.isScrolling = false; }, 900);
		
		this.changerClasseActiveLink(link);
	}
	
	openModal(idModal: string) {
		document.getElementById(idModal)?.classList.add("is-active");
		document.getElementsByTagName("html")[0].classList.add("is-clipped");
	}
	
	closeModal(idModal: string) {
		document.getElementById(idModal)?.classList.remove("is-active");
		document.getElementsByTagName("html")[0].classList.remove("is-clipped");
	}
	
	getSessionsJoueur() {
		const joueur = (document.getElementById("choix-j") as HTMLSelectElement).value;
		this.sessionServ.getSessions(joueur).subscribe({
			next: (value: any) => {
				console.log("Liste des sessions du joueur sélectionné : ", value);
				this.sessions = value;
			},
			error: (err: Error) => alert("Erreur de récupération des sessions du joueur sélectionné : " + err.message)
		});
	}
	
	changerClasseActiveLink(link: any) {
		const activeLink = document.querySelector(".menu-list a.is-active");
		activeLink?.classList.remove("is-active");
		link.classList.add("is-active");
	}
}
