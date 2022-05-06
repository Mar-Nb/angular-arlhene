import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	title = 'angular-arhlene';

	changerSection(sec: Element) {
		sec.addEventListener("click", function () {

			// Changer d'onglet actif
			const activeLi = document.querySelector("li.is-active") as HTMLLIElement;
			activeLi.classList.remove("is-active", "has-text-primary", "has-text-weight-semibold");
			document.getElementById("tab-" + (sec as HTMLElement).innerText.trim().toLowerCase())?.classList.add("is-active", "has-text-primary", "has-text-weight-semibold");

			// Changer l'élément du menu actif
			document.getElementById("ni-" + activeLi.innerText.trim().toLowerCase())?.classList.remove("is-active");
			document.getElementById("ni-" + (sec as HTMLElement).innerText.trim().toLowerCase())?.classList.add("is-active");
		});
	}

	ngOnInit() {
		const splitRoute = window.location.href.split("/");
		let section = splitRoute[splitRoute.length - 1];
		// console.log(section);

		if (section == "") { section = "accueil"; }

		document.getElementById("tab-" + section)?.classList.add("is-active", "has-text-primary", "has-text-weight-semibold");
		document.getElementById("ni-" + section)?.classList.add("is-active");

		document.querySelectorAll("[id^='tab']").forEach(this.changerSection);
		document.querySelectorAll("[id^='ni-']").forEach(this.changerSection);

		// JS du burger menu
		document.addEventListener('DOMContentLoaded', () => {

			// Get all "navbar-burger" elements
			const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

			// Check if there are any navbar burgers
			if ($navbarBurgers.length > 0) {

				// Add a click event on each of them
				$navbarBurgers.forEach(el => {
					el.addEventListener('click', () => {

						// Get the target from the "data-target" attribute
						const target = el.dataset.target;
						const $target = document.getElementById(target);

						// Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
						el.classList.toggle('is-active');
						$target?.classList.toggle('is-active');
					});
				});
			}
		});
	}
}