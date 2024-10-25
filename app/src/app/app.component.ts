import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Currency Converter';
  currencies: string[] = ['USD', 'EUR', 'GBP', 'INR', 'JPY']; // Example currencies
  fromCurrency: string = 'USD';
  toCurrency: string = 'EUR';
  amount: number = 1;
  selectedDate: string = '';
  availableDates: string[] = ['2023-10-20', '2023-10-21', '2023-10-22']; // Example dates
  conversionResult: number | null = null;

  convertCurrency(): void {
    // Mock conversion logic; replace this with actual API call or service logic.
    const conversionRate = 1.1; // Example static rate
    this.conversionResult = this.amount * conversionRate;
  }
}

