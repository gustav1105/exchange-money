import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { getSupportedCurrencies } from 'lib/src/interface/currencies';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Currency Converter';
  currencies: string[] = []; // Populate from library function
  fromCurrency: string = 'USD';
  toCurrency: string = 'EUR';
  amount: number = 1;
  selectedDate: string = '';
  availableDates: string[] = ['2023-10-20', '2023-10-21', '2023-10-22'];
  conversionResult: number | null = null;

  constructor() {}

  ngOnInit(): void {
    const pairs = getSupportedCurrencies();
    const uniqueCurrencies = new Set(pairs.map(pair => pair.split('/')[0])); // Unique base currencies
    this.currencies = Array.from(uniqueCurrencies);
  }

  convertCurrency(): void {
    const conversionRate = 1.1; // Example static rate
    this.conversionResult = this.amount * conversionRate;
  }
}
