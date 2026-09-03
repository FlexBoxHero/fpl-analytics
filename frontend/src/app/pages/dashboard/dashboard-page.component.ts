import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { ChartConfiguration } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

type MetricType = 'total_points' | 'now_cost';

interface FplPlayer {
  first_name: string;
  second_name: string;
  total_points: number;
  now_cost: number;
}

interface BootstrapStaticResponse {
  elements: FplPlayer[];
}

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    BaseChartDirective
  ],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardPageComponent {
  readonly selectedMetric = signal<MetricType>('total_points');

  readonly bootstrapStaticQuery = injectQuery(() => ({
    queryKey: ['fpl-bootstrap-static'],
    queryFn: async (): Promise<BootstrapStaticResponse> => {
      const response = await fetch('https://fantasy.premierleague.com/api/bootstrap-static/');
      if (!response.ok) {
        throw new Error('Unable to load FPL bootstrap data.');
      }
      return (await response.json()) as BootstrapStaticResponse;
    },
    staleTime: 1000 * 60 * 15
  }));

  readonly topPlayers = computed(() => {
    const players = this.bootstrapStaticQuery.data()?.elements ?? [];
    const metric = this.selectedMetric();

    return [...players]
      .sort((a, b) => b[metric] - a[metric])
      .slice(0, 5)
      .map((player) => ({
        name: `${player.first_name} ${player.second_name}`,
        value: player[metric]
      }));
  });

  readonly chartData = computed<ChartConfiguration<'bar'>['data']>(() => ({
    labels: this.topPlayers().map((player) => player.name),
    datasets: [
      {
        label: this.selectedMetric() === 'total_points' ? 'Total Points' : 'Current Cost (x10)',
        data: this.topPlayers().map((player) => player.value),
        backgroundColor: '#3f51b5'
      }
    ]
  }));

  readonly chartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    maintainAspectRatio: false
  };

  setMetric(metric: MetricType): void {
    this.selectedMetric.set(metric);
  }
}
