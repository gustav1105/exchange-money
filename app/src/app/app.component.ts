import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { getSupportedCurrencies, fetchAvailableDates, getExchangeRate } from 'lib/src';
import { CommonModule } from '@angular/common';

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
  availableDates: string[] = [];
  conversionResult: number | null = null;

  constructor() {}

  async ngOnInit(): Promise<void> {
    // Populate currencies using library function
    const pairs = getSupportedCurrencies();
    const uniqueCurrencies = new Set(pairs.map(pair => pair.split('/')[0]));
    this.currencies = Array.from(uniqueCurrencies);

    // Fetch available dates from the library
    try {
      this.availableDates = await fetchAvailableDates();
    } catch (error) {
      console.error("Error fetching available dates:", error);
    }
  }

  async convertCurrency(): Promise<void> {
    if (!this.selectedDate || !this.fromCurrency || !this.toCurrency || !this.amount) {
      console.warn("Please fill all the fields for conversion.");
      return;
    }

    try {
      // Fetch conversion rate for the selected date and currencies from the library
      const result = await getExchangeRate(this.selectedDate, this.fromCurrency, this.toCurrency, this.amount);
      this.conversionResult = result.convertedAmount;
    } catch (error) {
      console.error("Error converting currency:", error);
      this.conversionResult = null;
    }
  }
}

