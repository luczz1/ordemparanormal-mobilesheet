import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-char',
  templateUrl: 'create-char.page.html',
  styleUrls: ['create-char.page.scss']
})
export class CreateCharPage {

  constructor(public router: Router) {}

  public setLocalStorage() {
    localStorage.setItem('character', '1')
    this.router.navigateByUrl(`/character/1`)
  }

}
