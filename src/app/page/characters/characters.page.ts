import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-characters',
  templateUrl: 'characters.page.html',
  styleUrls: ['characters.page.scss']
})
export class CharactersPage {

  constructor(public router: Router) {}

  public setLocalStorage() {
    localStorage.setItem('character', '1')
  }

}
