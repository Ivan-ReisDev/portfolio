import { Component, OnInit, ViewChild } from '@angular/core';
import { DrawerModule } from 'primeng/drawer';
import { ButtonModule } from 'primeng/button';
import { Ripple } from 'primeng/ripple';
import { AvatarModule } from 'primeng/avatar';
import { Drawer } from 'primeng/drawer';
import { CookieService } from 'ngx-cookie-service';
import { UserResponse } from '../../resource/models/user/UserResponse';
import { AuthService } from '../../resource/service/auth/auth.service';
import { Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-sidebar',
  imports: [DrawerModule, ButtonModule, Ripple, AvatarModule],
  providers: [CookieService],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit {
  private readonly destroy$: Subject<void> = new Subject();

  constructor(
    private router: Router,
    private cookie: CookieService,
    private authService: AuthService,
    private messageService: MessageService
  ) {}

  data: UserResponse = {
    name: '',
    email: '',
    role: '',
    id: 0,
    url: ''
  };

  ngOnInit(): void {
    this.data = JSON.parse(this.cookie.get('portfolio_profile'));
  }

  logout() {
    this.authService.logout()
      .pipe(
        takeUntil(this.destroy$)
      ).subscribe({
        next: () => {
          this.cookie.delete('portfolio_profile');
          this.router.navigate(['']);
          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: 'Logout realizado com sucesso!',
            life: 2000,
          });
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

  getInitials(name: string): string {
    const nameArray = name.split(' ');
    const initials = nameArray
      .map(part => part.charAt(0).toUpperCase())
      .join('');
    return initials;
  }

  @ViewChild('drawerRef') drawerRef!: Drawer;

  closeCallback(e: any): void {
    this.drawerRef.close(e);
  }

  visible: boolean = false;

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
