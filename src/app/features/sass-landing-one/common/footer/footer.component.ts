import { Component } from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-footer',
    imports: [RouterLink],
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.css']
})
export class FooterComponent {

    constructor(private viewportScroller: ViewportScroller) {}

    public onClick(elementId: string): void { 
        this.viewportScroller.scrollToAnchor(elementId);
    }

}