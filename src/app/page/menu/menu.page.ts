import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: 'menu.page.html',
  styleUrls: ['menu.page.scss']
})
export class MenuPage implements OnInit {

  constructor(private router: Router) {}

  ngOnInit(): void {
      if (!localStorage.getItem('character')) {
        this.router.navigateByUrl('/home')
      }
  }

}
