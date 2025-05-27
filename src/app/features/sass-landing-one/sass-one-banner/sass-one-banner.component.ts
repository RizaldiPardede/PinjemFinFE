import { Component ,HostListener} from '@angular/core';
import { NgClass, ViewportScroller } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
	selector: 'app-sass-one-banner',
	imports: [RouterLink],
	templateUrl: './sass-one-banner.component.html',
	styleUrls: ['./sass-one-banner.component.css']
})
export class SassOneBannerComponent {

	constructor(private viewportScroller: ViewportScroller) {}

    public onClick(elementId: string): void { 
        this.viewportScroller.scrollToAnchor(elementId);
    }

    classApplied = false;
    toggleClass() {
        this.classApplied = !this.classApplied;
    }

    // Navbar Sticky
    isSticky: boolean = false;
    @HostListener('window:scroll', ['$event'])
    checkScroll() {
        const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
        if (scrollPosition >= 50) {
            this.isSticky = true;
        } else {
            this.isSticky = false;
        }
    }
}