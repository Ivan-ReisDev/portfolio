import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { SidebarComponent } from "../sidebar/sidebar.component";

@Component({
  selector: 'app-navbar',
  imports: [SidebarComponent],
  templateUrl: './navbar.component.html',
  providers: [CookieService],
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent  {


}
