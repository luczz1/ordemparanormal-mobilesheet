import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController, ViewDidEnter, ViewDidLeave } from '@ionic/angular';
import { AuthService } from 'src/app/services/endpoints/auth.service';
import { GenericService } from 'src/app/services/generic.service';

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
})
export class LoginPage implements ViewDidEnter, ViewDidLeave {
  public loginForm = new FormGroup({
    id: new FormControl(0),
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  public pageLoaded = false;
  public newAcc = true;

  constructor(
    private auth: AuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public modalController: ModalController,
    private generic: GenericService
  ) {}

  ionViewDidEnter(): void {
    this.pageLoaded = true;
  }

  ionViewDidLeave(): void {
    this.newAcc = true;
    this.loginForm.reset();

    this.pageLoaded = false;
  }

  public createAccount() {
    if (!this.newAcc) {
      this.loginForm.get('name').clearValidators();
      this.loginForm.get('name').updateValueAndValidity();
    } else {
      this.loginForm.get('name').setValidators([Validators.required]);
      this.loginForm.get('email').setValidators([Validators.required, Validators.email]);

      this.loginForm.get('name').updateValueAndValidity();
      this.loginForm.get('email').updateValueAndValidity();
    }

    if (this.loginForm.valid) {
      const obj = this.loginForm.getRawValue();
      const endpoint = this.newAcc ? 'createAccount' : 'login';

      this.auth[endpoint](obj).subscribe({
        next: (token) => {
          localStorage.setItem('token', token);
          this.generic.presentToast(`${this.newAcc ? 'Conta criada' : 'Logado'} com sucesso!`);
          this.router.navigate(['/characters']);
        },
        error: (err) => {
          console.log(err), this.generic.presentToast(err.error, 3);
        },
      });
    } else {
      this.generic.presentToast(
        'Formulário inválido.',
        3
      );
    }
  }

  public redirectToBackScreen() {
    this.router.navigateByUrl('/home');
  }
}
