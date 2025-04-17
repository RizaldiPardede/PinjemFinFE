import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgClass, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  isLoggingOut: boolean = false;
  isSubMenuOpen: { [key: string]: boolean } = {
    submenu1: false,
    submenu2: false,
    submenu3: false
  };

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    // ⛔️ Hindari akses localStorage langsung tanpa cek
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('token');

      if (!token) {
        this.router.navigate(['/login']);
      }
    }
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
    }, 1000); // simulasi proses logout, bisa dihapus kalau async beneran
  }
}
