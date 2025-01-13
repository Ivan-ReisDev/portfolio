import { AuthService } from './../../resource/service/auth/auth.service';
import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import {CookieService} from 'ngx-cookie-service';
import { SignInRequest } from '../../resource/models/auth/SignInRequest';
import { SignInResponse } from '../../resource/models/auth/SignInResponse';
import { ToastModule } from 'primeng/toast'
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { ROUTES_ENDPOINTS } from '../../../config/routers';
import { Subject, takeUntil } from 'rxjs';
@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [
    CardModule,
    InputGroupAddonModule,
    InputGroupModule,
    ButtonModule,
    ReactiveFormsModule,
    CommonModule,
    ToastModule

  ],
  providers: [CookieService],
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnDestroy {
  private readonly destroy$: Subject<void> = new Subject()
 routers = ROUTES_ENDPOINTS;
  constructor(
    private authService: AuthService,
    private cookieService:CookieService,
    private messageService: MessageService,
    private router: Router
  ) {}

  signinForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  onSubmit() {
    if (this.signinForm.valid) {
      this.authService.signIn(this.signinForm.value as SignInRequest)
      .pipe(
        takeUntil(this.destroy$)
      )
        .subscribe({
          next: (response: SignInResponse) => {
            if (response) {
              this.signinForm.reset()
              this.router.navigate([ROUTES_ENDPOINTS.DASHBOARD])
              this.messageService.add({
                severity: 'success',
                summary: 'Sucesso',
                detail: `Bem-vindo (a) a dashboard ${response?.name}!`,
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

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
