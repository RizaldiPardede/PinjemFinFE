import { Component } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
    selector: 'app-sass-one-trusted-company',
	imports: [CarouselModule],
    templateUrl: './sass-one-trusted-company.component.html',
    styleUrls: ['./sass-one-trusted-company.component.css']
})
export class SassOneTrustedCompanyComponent {

    companySlides: OwlOptions = {
		loop: true,
		margin: 10,
		nav: false,
		dots: false,
		smartSpeed: 2000,
		autoplay: true,
		responsive: {
			0: {
				items: 2
			},
			600: {
				items: 3
			},
			1000: {
				items: 5
			}
		}
    }

}