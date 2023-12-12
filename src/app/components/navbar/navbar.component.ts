import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import {
  FontAwesomeModule,
  FaIconLibrary,
} from '@fortawesome/angular-fontawesome';
import {
  faFacebook,
  faInstagram,
  faTiktok,
  faTwitter,
  faLinkedin,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons';
import { LogoutService } from '../../services/auth/logout.service';
import { UserDataService } from '../../services/auth/user-data.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
    FontAwesomeModule,
    CommonModule,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  isLoged: boolean;
  userData: { name: string; email: string; role: string } | null;

  constructor(
    private logoutService: LogoutService,
    private userDataService: UserDataService,
    library: FaIconLibrary
  ) {
    this.isLoged = false;
    this.userData = null;

    library.addIcons(
      faFacebook,
      faInstagram,
      faTwitter,
      faLinkedin,
      faTiktok,
      faYoutube
    );
  }

  ngOnInit(): void {
    this.userDataService.getUserData().subscribe((userData: string | null) => {
      this.userData = userData ? JSON.parse(userData).user : null;
      this.isLoged = userData ? true : false;
    });
  }

  logout() {
    this.logoutService.logout();
  }
}
