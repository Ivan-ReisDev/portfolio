import { Component } from '@angular/core';
import { PanelModule } from 'primeng/panel';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { EmailsService } from '../../resource/service/emails.service';
import { SentEmailRequest } from '../../resource/models/emails/SentEmailRequest';
import { Subject, takeUntil } from 'rxjs';
import { SignInResponse } from '../../resource/models/auth/SignInResponse';

@Component({
  selector: 'app-sent-emails',
  imports: [PanelModule, ReactiveFormsModule, CommonModule, ButtonModule],
  templateUrl: './sent-emails.component.html',
  styleUrl: './sent-emails.component.scss'
})
export class SentEmailsComponent {
private readonly destroy$: Subject<void> = new Subject()
  constructor(
     private messageService: MessageService,
     private emailsService: EmailsService,
  ) { }

  sentEmailForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    subject: new FormControl('')
  });

  onSubmit() {
    if (this.sentEmailForm.valid) {
          this.emailsService.sentEmail(this.sentEmailForm.value as SentEmailRequest)
           .pipe(
            takeUntil(this.destroy$)
          )
            .subscribe({
              next: (response) => {
                if (response) {
                  this.sentEmailForm.reset()
                  this.messageService.add({
                    severity: 'success',
                    summary: 'Sucesso',
                    detail: `e-mail enviado com sucesso.`,
                    life: 2000,
                  })
                }
              },
              error: (error) => {
                this.messageService.add({
                  severity: 'error',
                  summary: 'Erro',
                  detail: error.error.message,
                  life: 2000,
                })
              }
            });
        } else {
          console.log('Form inválido');
        }
  }
}
