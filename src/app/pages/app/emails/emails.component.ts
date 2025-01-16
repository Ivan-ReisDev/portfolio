import { Component } from '@angular/core';
import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
import { SentEmailsComponent } from "../../../components/sent-emails/sent-emails.component";
import { DividerModule } from 'primeng/divider';
import { CommonModule } from '@angular/common';
import { ContactsTableEmailsComponent } from "../../../components/contacts-table-emails/contacts-table-emails.component";

@Component({
  selector: 'app-emails',
  imports: [PanelModule, ButtonModule, SentEmailsComponent, DividerModule, CommonModule, ContactsTableEmailsComponent],
  templateUrl: './emails.component.html',
  styleUrl: './emails.component.scss'
})
export class EmailsComponent {
  public state = "sent";

  public changeState(state: string): void {
    this.state = state;
  }

}
