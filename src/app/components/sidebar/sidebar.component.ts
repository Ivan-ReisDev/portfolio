import { Component, OnInit, ViewChild } from '@angular/core';
import { DrawerModule } from 'primeng/drawer';
import { ButtonModule } from 'primeng/button';
import { Ripple } from 'primeng/ripple';
import { AvatarModule } from 'primeng/avatar';
import { StyleClass } from 'primeng/styleclass';
import { Drawer } from 'primeng/drawer';
import { CookieService } from 'ngx-cookie-service';
import { UserResponse } from '../../resource/models/user/UserResponse';
@Component({
  selector: 'app-sidebar',
  imports: [DrawerModule, ButtonModule, Ripple, AvatarModule, StyleClass],
  providers: [CookieService],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit{
  
 constructor(private cookie: CookieService){}

  data: UserResponse = {
    name: '',
    email: '',
    role: '',
    id: 0
  };

  ngOnInit(): void {
    this.data = JSON.parse(this.cookie.get('portfolio_profile'));
  }

  logout() {
    this.cookie.delete('portfolio_profile');
    window.location.href = '/login';
  }

  @ViewChild('drawerRef') drawerRef!: Drawer;

  closeCallback(e: any): void {
      this.drawerRef.close(e);
  }

  visible: boolean = false;
}
