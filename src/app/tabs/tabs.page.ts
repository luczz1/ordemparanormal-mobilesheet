import { Component, } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
})
export class TabsPage {
  public currentID: string | null | undefined;
  public currentRoute: string = '';
  public currentCharacterId: string | null = '';

  backpack = 'assets/icon/backpack.svg';
  eye = 'assets/icon/eye.svg';
  d20 = 'assets/icon/d20.svg';
  attack = 'assets/icon/attack.svg';

  constructor(public router: Router, private activatedRoute: ActivatedRoute) {
    router.events.subscribe((val) => {
      this.currentID = localStorage.getItem('character');
      this.currentRoute = router.url.split('/')[2];
  });
  }


  redirectTo(route: string) {
    this.router.navigate([route + '/' + this.currentID]);
  }
}
