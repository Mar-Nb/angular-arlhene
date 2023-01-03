import { Component, OnInit } from '@angular/core';
import { PnjServiceService } from '../services/pnj-service.service'

@Component({
  selector: 'app-pnj',
  templateUrl: './pnj.component.html',
  styleUrls: ['./pnj.component.css']
})
export class PnjComponent implements OnInit {

  listePnj: any;
  nbPage: number = 0;
  currentPage: number = 1;

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
      next: (value: any) => {
        this.listePnj = value.resultat;
        this.nbPage = value.nbPage;
      },
      error: (err: Error) => alert("Erreur de récupération des PNJ : " + err.message),
      complete: () => {
        for (let index = 0; index < this.nbPage; index++) {
          const opt = document.createElement("option");
          opt.textContent = "" + (index + 1);
          opt.onclick = () => { this.changePage(opt.text); }
          (document.querySelector(".container .pagination select") as HTMLSelectElement).appendChild(opt);
        }
      }
    };

    this.pnjServ.getPage().subscribe(pnjObserver);

    document.addEventListener("keydown", (evt) => {
      const e = evt || window.event;
      if (e.code == "Escape") { this.closeAllModals(); }
    });
  }

  openOffCanvas() {
		(document.querySelector(".offcanvas") as HTMLDivElement).style.width = "100%";
		document.getElementsByTagName("html")[0]?.classList.add("is-clipped");
	}

	closeOffCanvas() {
		(document.querySelector(".offcanvas") as HTMLDivElement).style.width = "0";
		document.getElementsByTagName("html")[0]?.classList.remove("is-clipped");
	}

  changePage(page: string) {
    this.pnjServ.getPage(page).subscribe({
      next: (value: any) => {
        this.listePnj = value.resultat;
        this.currentPage = parseInt(page);
      },
      error: (err: Error) => alert("Erreur de récupération des PNJ : " + err.message)
    });
  }

  nextPage() {
    this.currentPage++;
    if (this.currentPage > this.nbPage) { this.currentPage = this.nbPage; }
    else {
      this.changePage(`${this.currentPage}`);
      (document.querySelector(".container .pagination select") as HTMLSelectElement).value = `${this.currentPage}`;
    }
  }

  previousPage() {
    this.currentPage--;
    if (this.currentPage < 1) { this.currentPage = 1; }
    else {
      this.changePage(`${this.currentPage}`);
      (document.querySelector(".container .pagination select") as HTMLSelectElement).value = `${this.currentPage}`;
    }
  }

}
