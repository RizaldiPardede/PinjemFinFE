import { Component, HostListener } from '@angular/core';
import { NgClass, ViewportScroller } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-navbar',
    imports: [NgClass, RouterLink],
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

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