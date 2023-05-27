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
  public currentID: string | null | undefined;

  constructor(public router: Router) {
  }

  ngOnInit() {
    this.currentID = localStorage.getItem('character');
  }

  redirectTo(route: string) {
    this.router.navigate([route + '/' + this.currentID]);
  }
}
