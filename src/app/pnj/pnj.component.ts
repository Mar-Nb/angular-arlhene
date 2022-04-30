import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pnj',
  templateUrl: './pnj.component.html',
  styleUrls: ['./pnj.component.css']
})
export class PnjComponent implements OnInit {

  constructor() { }

  openModal(el: HTMLElement) {
    el.classList.add("is-active");
    document.getElementsByTagName("html")[0].classList.add("is-clipped");
  }

  closeModal(el: HTMLElement) {
    el.classList.remove("is-active");
    document.getElementsByTagName("html")[0].classList.remove("is-clipped");
  }

  closeAllModals() {
    (document.querySelectorAll(".modal") || []).forEach((modal) => { this.closeModal(modal as HTMLElement); });
  }

  ngOnInit(): void {
    // Add a click event on buttons to open a specific modal
    (document.querySelectorAll("[data-trigger='modal']") || []).forEach((btn) => {
      const modal = (btn as HTMLElement).dataset["target"] ?? "";
      const $target = document.getElementById(modal);
      console.log($target);

      btn.addEventListener("click", () => {
        this.openModal($target as HTMLElement);
      });
    });

    // Add a click event on various child elements to close the parent modal
    (document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button') || []).forEach(($close) => {
      const $target = $close.closest('.modal');

      $close.addEventListener('click', () => {
        this.closeModal($target as HTMLElement);
      });
    });

    // Add a keyboard event to close all modals
    document.addEventListener('keydown', (event) => {
      const e = event || window.event;

      if (e.key === "Escape") { // Escape key
        this.closeAllModals();
      }
    });
  }

}
