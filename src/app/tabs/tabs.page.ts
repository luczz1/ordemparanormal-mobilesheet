import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
})
export class TabsPage implements OnInit {
  public hideTabs: boolean = false;

  constructor(public router: Router) {
    console.log(router.url);
  }

  ngOnInit() {
    this.router.events
      .pipe(
        filter(
          (event): event is NavigationEnd => event instanceof NavigationEnd
        )
      )
      .subscribe((event: NavigationEnd) => {
        this.hideTabs =
          event.url !== '/' &&
          event.url !== '/about' &&
          event.url !== '/characters';
      });
  }

  redirectTo(route: string) {
    this.router.navigate([route]);
  }
}
