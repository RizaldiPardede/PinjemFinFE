
import { NgClass, NgIf,CurrencyPipe  } from '@angular/common';
import { AfterViewInit, Component, ElementRef, ViewChild  } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-sass-one-pricing',
     standalone: true,
    imports: [NgClass, NgIf, RouterLink,CurrencyPipe,CommonModule],
    templateUrl: './sass-one-pricing.component.html',
    styleUrls: ['./sass-one-pricing.component.css']
})
export class SassOnePricingComponent implements AfterViewInit{

    // Tabs
    currentTab = 'tab1';
    switchTab(event: MouseEvent, tab: string) {
        event.preventDefault();
        this.currentTab = tab;
    }

    plafons = [
    {
      name: 'Bronze',
      imageUrl: '../../../../assets/image/card_bronze.png',
      amount: 1000000,
      bunga: '3%'
    },
    {
      name: 'Silver',   
      imageUrl: '../../../../assets/image/card_silver.png',
      amount: 5000000,
      bunga: '5%'
    },
    {
      name: 'Gold',
      imageUrl: '../../../../assets/image/card_gold.png',
      amount: 15000000,
      bunga: '7%'
    },
    {
      name: 'Platinum',
      imageUrl: '../../../../assets/image/card_platinum.png',
      amount: 50000000,
      bunga: '10%'
    }
  ];

  @ViewChild('scrollContainer', { static: false }) scrollContainer!: ElementRef<HTMLDivElement>;

ngAfterViewInit() {
  setTimeout(() => {
    if (!this.scrollContainer || this.plafons.length === 0) return;

    const cardWidth = 340;
    const scrollElement = this.scrollContainer.nativeElement;

    let scrollIndex = 0;
    setInterval(() => {
      scrollIndex = (scrollIndex + 1) % this.plafons.length;
      scrollElement.scrollTo({
        left: scrollIndex * cardWidth,
        behavior: 'smooth'
      });
    }, 3000);
  }, 100); // Pastikan Angular selesai render
}

}