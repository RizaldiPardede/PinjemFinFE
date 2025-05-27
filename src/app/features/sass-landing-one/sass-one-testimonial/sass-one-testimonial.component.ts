import { Component } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
    selector: 'app-sass-one-testimonial',
	imports: [CarouselModule],
    templateUrl: './sass-one-testimonial.component.html',
    styleUrls: ['./sass-one-testimonial.component.css']
})
export class SassOneTestimonialComponent {

    testimonialSlides: OwlOptions = {
		loop: true,
		margin: 10,
		nav: true,
		navText:[
			"<i class='flaticon-left'></i>",
			"<i class='flaticon-right'></i>"
		],
		dots: false,
		smartSpeed: 2000,
		items: 1
    }

}