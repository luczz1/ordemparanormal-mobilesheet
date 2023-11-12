import { ViewDidEnter, ViewDidLeave } from '@ionic/angular';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/endpoints/auth.service';
import { GenericService } from 'src/app/services/generic.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements ViewDidEnter {
  public username = '';

  constructor(
    private route: Router,
    private auth: AuthService,
    private generic: GenericService
  ) {}

  ionViewDidEnter(): void {
    if (localStorage.getItem('token')) this.whoami();
  }

  public redirectToCharOrLogin() {
    if (localStorage.getItem('token')) {
      this.route.navigateByUrl('/characters');
    } else {
      this.route.navigateByUrl('/login');
    }
  }

  public whoami() {
    this.auth.whoami().subscribe({
      next: (res) => {
        this.username = res;
      },
      error: (err) => {
        console.log(err.error);
      },
    });
  }

  public async logout() {
    const ok = await this.generic.alertBox(
      'ATENÇÃO',
      `Deseja mesmo sair?`
    );

    if (!ok) {
      return;
    }

    localStorage.clear();
    window.location.replace('home');
  }
}
