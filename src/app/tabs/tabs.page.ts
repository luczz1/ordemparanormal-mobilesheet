import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ViewDidEnter } from '@ionic/angular';
import { filter } from 'rxjs';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
})
export class TabsPage {
  public hideTabs: boolean = false;
  public currentID: string | null | undefined;

  constructor(public router: Router) {
    router.events.subscribe((val) => {
      this.currentID = localStorage.getItem('character');
  });
  }

  redirectTo(route: string) {
    this.router.navigate([route + '/' + this.currentID]);
  }
}
