import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';

// Angular Material Modules
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSliderModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  prediction: number = 150000;
  confidence: number = 95;
  lowerBound: number = 0;
  upperBound: number = 0;
  isFading: boolean = false;

  ngOnInit(): void {
    this.calculateBounds(); // Initial calculation without fade
  }

  onValueChange(): void {
    this.isFading = true;
    setTimeout(() => {
      this.calculateBounds();
      // A nested timeout to allow the fade-out to happen before fading back in
      setTimeout(() => {
        this.isFading = false;
      }, 50);
    }, 200); // This delay should match the start of the CSS transition
  }

  calculateBounds(): void {
    // This is a simplified, placeholder logic for demonstration.
    const baseMargin = this.prediction * 0.05; // 5% base uncertainty
    const confidenceFactor = (this.confidence - 80) / 19; // Scale from 0 to 1 as confidence goes from 80 to 99

    const margin = baseMargin + (this.prediction * 0.10 * confidenceFactor);

    this.lowerBound = this.prediction - margin;
    this.upperBound = this.prediction + margin;
  }
}
