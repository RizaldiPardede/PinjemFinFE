import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { NgClass } from '@angular/common';
import { MiniChatComponent } from '../mini-chat/mini-chat.component';
import { CommonModule } from '@angular/common';
import { ChatService } from '../../core/component_service/ChatService';
import { HasFeatureDirective } from '../shared/directives/has-feature.directive';
import { FeatureService } from '../shared/directives/FeatureService';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgClass, RouterModule, MiniChatComponent, CommonModule,HasFeatureDirective],
  providers: [FeatureService],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  isLoggingOut: boolean = false;
  isSubMenuOpen: { [key: string]: boolean } = {
    submenu1: false,
    submenu2: false,
    submenu3: false
  };

  isChatVisible = false;

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object,
    private chatService: ChatService
  ) {}

  ngOnInit(): void {
    // Cek token dan redirect ke login jika tidak ada
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('token');

      if (!token) {
        this.router.navigate(['/login']);
      }
    }

    this.chatService.chatVisibility$.subscribe((visible: boolean) => {
      this.isChatVisible = visible;
    });
  }

  toggleSubMenu(key: string) {
    this.isSubMenuOpen[key] = !this.isSubMenuOpen[key];
  }

  logout(): void {
    this.isLoggingOut = true;
    setTimeout(() => {
      if (typeof localStorage !== 'undefined') {
        localStorage.removeItem('token');
      }
      this.isLoggingOut = false;
      this.router.navigate(['/login']);
    }, 1000); // simulasi proses logout
  }

  toggleChat() {
    this.isChatVisible = !this.isChatVisible;
  }

  // Menavigasi ke halaman Profile
  goToProfile(): void {
    this.router.navigate(['/profile']); // Ganti dengan rute yang sesuai untuk profile
  }

  // Menavigasi ke halaman Settings
  goToSettings(): void {
    this.router.navigate(['/settings']); // Ganti dengan rute yang sesuai untuk settings
  }
}
