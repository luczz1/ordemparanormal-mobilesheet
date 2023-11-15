import { Injectable } from '@angular/core';
import {
  AlertController,
  LoadingController,
  ToastController,
} from '@ionic/angular';
import { CharactersService } from './endpoints/characters.service';

@Injectable({
  providedIn: 'root',
})
export class GenericService {
  public loading: boolean = false;
  private loadingQueue: number = 0;

  public currentWeight = 0;
  public totalWeight = 0;

  public weightStatus = '';

  public weightGet = false;

  constructor(
    private alertController: AlertController,
    private loadingCtrl: LoadingController,
    private toastController: ToastController,
    private charactersService: CharactersService
  ) {}

  public async alertBox(header: string, message: string): Promise<boolean> {
    let alertHandler = false;
    const alert = await this.alertController.create({
      cssClass: 'custom-alert',
      message,
      header,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'alert-button-cancel',
          handler: () => {
            alertHandler = false;
          },
        },
        {
          text: 'Confirmar',
          cssClass: 'alert-button-confirm',
          handler: () => {
            alertHandler = true;
          },
        },
      ],
    });
    await alert.present();
    await alert.onWillDismiss();
    return alertHandler;
  }

  public async multLoading(activate: boolean, fullBackdrop = false) {
    const mult = activate ? 1 : -1;
    this.loadingQueue += mult;

    if (this.loadingQueue > 0 && !this.loading) {
      if (activate) {
        this.loading = true;
        const loading = await this.loadingCtrl.create({
          cssClass: `${fullBackdrop ? 'custom-loading-backdrop' : 'custom-loading'}`,
          mode: 'md',
          message: 'Carregando...'
        });
        await loading.present();

        const interval = setInterval(async () => {
          if (!this.loading) {
            clearInterval(interval);
            await this.loadingCtrl.dismiss().catch((err) => {
              console.log(err);
            });
          }
        }, 10);
      }
    } else {
      this.loadingQueue = 0;
      if (this.loading) {
        this.loading = false;
      }
    }
  }

  public async presentToast(
    message: string,
    type?: number,
    showCartItemButton = false
  ) {
    let color: string;

    const active = await this.toastController.getTop();

    if (active) {
      await active.dismiss();
    }

    switch (type) {
      case 2:
        color = 'warning';
        break;
      case 3:
        color = 'danger';
        break;
      default:
        color = 'success';
        break;
    }

    const toast = await this.toastController.create({
      message,
      color,
      cssClass: 'defaultToast',
      duration: 2000,
      position: 'top',
      animated: true,
    });

    toast.present();
  }

  public getInventoryWeight(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (this.weightGet) {
        return resolve(true);
      }

      const jsonTotalWeight = JSON.parse(localStorage.getItem('totalWeight'));

      if (jsonTotalWeight) {
        this.currentWeight = jsonTotalWeight.atual;
        this.totalWeight = jsonTotalWeight.total;

        this.weightStatus = jsonTotalWeight.status;

        this.weightGet = true;
        return resolve(true);
      }

      this.charactersService
        .getInventoryWeight(Number(localStorage.getItem('character')))
        .subscribe(
          (res) => {
            this.currentWeight = res.atual;
            this.totalWeight = res.total;

            this.weightStatus = res.status;

            this.weightGet = true;

            localStorage.setItem('totalWeight', JSON.stringify(res));

            resolve(true);
          },
          (error) => {
            this.presentToast(error.error, 3)
            resolve(false)
          }
        );
    });
  }
}
