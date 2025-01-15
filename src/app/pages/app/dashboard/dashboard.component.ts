import { Component } from '@angular/core';
import { CardsDashboardComponent } from "../../../components/cards-dashboard/cards-dashboard.component";

@Component({
  selector: 'app-dashboard',
  imports: [CardsDashboardComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  title = 'Dashboard';
}
