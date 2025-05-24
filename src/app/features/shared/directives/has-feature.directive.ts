import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { FeatureService } from './FeatureService'; // Pastikan pathnya sesuai

@Directive({
  selector: '[appHasFeature]' // Selector yang akan digunakan di template
})
export class HasFeatureDirective {
  @Input() set appHasFeature(features: string | string[]) {
    if (Array.isArray(features)) {
      this.checkMultipleFeatures(features); // Jika menerima array fitur
    } else {
      this.checkSingleFeature(features); // Jika menerima satu fitur
    }
  }

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private featureService: FeatureService // Service untuk mengecek fitur yang dimiliki
  ) {}

  // Cek apakah user memiliki fitur tunggal
  private checkSingleFeature(feature: string) {
    this.featureService.hasFeature(feature).subscribe(hasFeature => {
      if (hasFeature) {
        this.viewContainer.createEmbeddedView(this.templateRef);
      } else {
        this.viewContainer.clear();
      }
    });
  }

  // Cek apakah user memiliki semua fitur dalam array
  private checkMultipleFeatures(features: string[]) {
    this.featureService.hasFeatures(features).subscribe(hasAllFeatures => {
      if (hasAllFeatures) {
        this.viewContainer.createEmbeddedView(this.templateRef);
      } else {
        this.viewContainer.clear();
      }
    });
  }
}
