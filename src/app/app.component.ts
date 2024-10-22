import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ChartModule } from 'primeng/chart';
import { ApiService } from './api.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ChartModule],
  templateUrl: './app.component.html',
  styles: [],
  providers: [ApiService]
})
export class AppComponent {
  data: any;
  options: any;

  basicData: any;
  basicOptions: any;

  temperature$!: Subscription;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.lineChart();

    this.basicChart();
  }

  private basicChart() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.basicData = {
      labels: [],
      datasets: [
        {
          label: 'Years Sales',
          data: [],
          backgroundColor: ['rgba(255, 159, 64, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(153, 102, 255, 0.2)'],
          borderColor: ['rgb(255, 159, 64)', 'rgb(75, 192, 192)', 'rgb(54, 162, 235)', 'rgb(153, 102, 255)'],
          borderWidth: 1
        }
      ]
    };

    this.basicOptions = {
      maintainAspectRatio: false,
      aspectRatio: 1,
      plugins: {
        legend: {
          labels: {
            color: textColor
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        },
        x: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        }
      }
    };
  }

  private lineChart() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.data = {
      labels: [],
      datasets: [
        {
          label: 'Temperature in seconds',
          data: [],
          fill: false,
          borderColor: documentStyle.getPropertyValue('--blue-500'),
          tension: 0
        }
      ]
    };

    this.options = {
      maintainAspectRatio: false,
      aspectRatio: 1,
      plugins: {
        legend: {
          labels: {
            color: textColor
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        },
        y: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        }
      }
    };
  }

  getTemperature() {
    this.temperature$ = this.apiService.getCurrentTemperature()
      .subscribe(x => {
        this.data.labels.push(this.data.labels.length + 1);
        this.data.datasets[0].data.push(x);

        this.data = { ... this.data };
      });
  }

  stopTemperature() {
    this.temperature$.unsubscribe();
  }

  getYearsSales() {
    this.apiService.getYearsSales()
      .subscribe(x => {
        this.basicData.labels.push(this.basicData.labels.length + 1);
        this.basicData.datasets[0].data.push(x);

        this.basicData = { ... this.basicData };
      });
  }
}
