import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faFacebook,
  faInstagram,
  faTiktok,
  faTwitter,
  faLinkedin,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons';
import { LogoutService } from '../../services/auth/logout.service';

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
  // social media icons
  faFacebook = faFacebook;
  faYoutube = faYoutube;
  faInstagram = faInstagram;
  faTiktok = faTiktok;
  faTwitter = faTwitter;
  faLinkedin = faLinkedin;

  isLoged: boolean;
  constructor(private logoutService: LogoutService) {
    this.isLoged = false;
  }

  logout() {
    this.logoutService.logout();
  }

  ngOnInit(): void {
    if (localStorage.getItem('currentUser')) this.isLoged = true;
    if (!localStorage.getItem('currentUser')) this.isLoged = false;
  }
}
