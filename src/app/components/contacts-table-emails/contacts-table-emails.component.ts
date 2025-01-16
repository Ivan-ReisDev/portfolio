import { ContactService } from './../../resource/service/contact.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { Contact } from '../../resource/models/contact/Contact';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-contacts-table-emails',
  imports: [TableModule, CommonModule, ToastModule],
  templateUrl: './contacts-table-emails.component.html',
  providers: [DatePipe],
  styleUrl: './contacts-table-emails.component.scss'
})
export class ContactsTableEmailsComponent implements OnInit, OnDestroy {
   private readonly destroy$: Subject<void> = new Subject()
   public page = 1;
   public limit = 10;
   public contacts: Contact[] = [];

  constructor(
     private contactService: ContactService,
     private messageService: MessageService,
  ) { }
  ngOnInit(): void {
    this.loadContacts();
  }

  loadContacts() {
    this.contactService.findByContactList(this.page, this.limit)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response: Contact[]) => {
          if (response) {
            this.contacts = response;
          }
        },
        error: (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: error.error.message,
            life: 2000,
          });
        }
      });
  }

  onPage(event: any) {
    this.page = event.page + 1; // O evento page é zero-indexed, então somamos 1
    this.limit = event.rows;
    this.loadContacts(); // Carregar os dados da nova página
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
