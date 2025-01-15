import { Component } from '@angular/core';
import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
import { SentEmailsComponent } from "../../../components/sent-emails/sent-emails.component";
import { DividerModule } from 'primeng/divider';

@Component({
  selector: 'app-emails',
  imports: [PanelModule, ButtonModule, SentEmailsComponent, DividerModule],
  templateUrl: './emails.component.html',
  styleUrl: './emails.component.scss'
})
export class EmailsComponent {

}
