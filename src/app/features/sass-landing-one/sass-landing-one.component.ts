import { Component } from '@angular/core';
import { SassOneBannerComponent } from './sass-one-banner/sass-one-banner.component';
import { SassOneServicesComponent } from './sass-one-services/sass-one-services.component';
import { SassOneWhyChooseComponent } from './sass-one-why-choose/sass-one-why-choose.component';
import { SassOneStandardComponent } from './sass-one-standard/sass-one-standard.component';
import { SassOneAppsComponent } from './sass-one-apps/sass-one-apps.component';
import { SassOneCounterComponent } from './sass-one-counter/sass-one-counter.component';
import { SassOnePricingComponent } from './sass-one-pricing/sass-one-pricing.component';
import { SassOneTestimonialComponent } from './sass-one-testimonial/sass-one-testimonial.component';
import { NavbarComponent} from './common/navbar/navbar.component';
import { FooterComponent} from './common/footer/footer.component';
import { BackToTopComponent} from './common/back-to-top/back-to-top.component';
@Component({
    selector: 'app-sass-landing-one',
    imports: [SassOneBannerComponent, SassOneServicesComponent, SassOneWhyChooseComponent, SassOneStandardComponent, SassOneAppsComponent, SassOneCounterComponent, SassOnePricingComponent, SassOneTestimonialComponent,
        NavbarComponent,FooterComponent,BackToTopComponent
    ],
    templateUrl: './sass-landing-one.component.html',
    styleUrls: ['./sass-landing-one.component.scss']
})
export class SassLandingOneComponent {}