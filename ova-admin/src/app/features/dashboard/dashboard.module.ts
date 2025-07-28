// src/app/features/dashboard/dashboard.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';
import { RouterModule } from '@angular/router';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { NgChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [DashboardHomeComponent],
  imports: [
    CommonModule,
    RouterModule,
    DashboardRoutingModule,
    NgChartsModule
  ]
})
export class DashboardModule {}
