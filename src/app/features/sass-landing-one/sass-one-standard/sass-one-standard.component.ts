import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
    selector: 'app-sass-one-standard',
    imports: [FormsModule ,CommonModule],
    templateUrl: './sass-one-standard.component.html',
    styleUrls: ['./sass-one-standard.component.css']
})
export class SassOneStandardComponent {
   amount: number = 0;
tenor: number = 0;
interest: number = 0;
totalPayment: number = 0;
installment: number = 0;
calculated: boolean = false;

simulateLoan(): void {
  const annualInterestRate = 0.5;
  const monthlyRate = annualInterestRate / 12;

  this.interest = this.amount * monthlyRate * this.tenor;
  this.totalPayment = this.amount + this.interest;
  this.installment = this.totalPayment / this.tenor;
  this.calculated = true;
}

}