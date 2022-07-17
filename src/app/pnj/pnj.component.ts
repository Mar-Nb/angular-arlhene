import { Component, OnInit } from '@angular/core';
import { PnjServiceService } from '../services/pnj-service.service'

@Component({
  selector: 'app-pnj',
  templateUrl: './pnj.component.html',
  styleUrls: ['./pnj.component.css']
})
export class PnjComponent implements OnInit {

  listePnj: any;

  constructor(private pnjServ: PnjServiceService) { }

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

  ngOnInit(): void {
    const pnjObserver = {
      next: (value: any) => this.listePnj = value,
      error: (err: Error) => alert("Erreur de récupération des PNJ : " + err.message),
      complete: () => {}
    };

    this.pnjServ.getAll().subscribe(pnjObserver);

    document.addEventListener("keydown", (evt) => {
      const e = evt || window.event;
      if (e.code == "Escape") { this.closeAllModals(); }
    });
  }

}
