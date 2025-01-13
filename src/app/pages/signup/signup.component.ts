import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsersService } from './../../resource/service/users.service';
import { Component, OnDestroy } from '@angular/core';
import { passwordMatchValidator } from './validators/passwordMatchValidator';
import { UserCreateRequest } from '../../resource/models/user/UserCreateRequest';
import { ROUTES_ENDPOINTS } from '../../../config/routers';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule, CommonModule, ToastModule, ButtonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent implements OnDestroy {
  private readonly destroy$: Subject<void> = new Subject()
  constructor(
    private usersService: UsersService,
    private router: Router,
    private messageService: MessageService,
  ) { }

  signUnForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(8)])
  },
    { validators: passwordMatchValidator() });

  onSubmit() {
    if (this.signUnForm.valid) {
      this.usersService.signUp(this.signUnForm.value as UserCreateRequest)
      .pipe(
        takeUntil(this.destroy$)
      )
        .subscribe({
          next: (response) => {
            if (response.status === 201) {
              this.signUnForm.reset();
              this.router.navigate([ROUTES_ENDPOINTS.SIGNIN]);
              this.messageService.add({
                severity: 'success',
                summary: 'Sucesso',
                detail: 'Usuário criado com sucesso',
                life: 2000,
              });
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
    } else {
      console.log('Form inválido');
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
