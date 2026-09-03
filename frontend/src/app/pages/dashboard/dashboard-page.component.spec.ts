import { TestBed } from '@angular/core/testing';
import { QueryClient } from '@tanstack/query-core';
import { provideTanStackQuery } from '@tanstack/angular-query-experimental';
import { DashboardPageComponent } from './dashboard-page.component';

describe('DashboardPageComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardPageComponent],
      providers: [provideTanStackQuery(new QueryClient())]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(DashboardPageComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should update metric when toggled', () => {
    const fixture = TestBed.createComponent(DashboardPageComponent);
    const component = fixture.componentInstance;

    component.setMetric('now_cost');

    expect(component.selectedMetric()).toBe('now_cost');
  });
});
