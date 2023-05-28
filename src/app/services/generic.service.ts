import { Injectable } from '@angular/core';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class GenericService {
  public loading: boolean = false;
  private loadingQueue: number = 0;

  constructor(
    private alertController: AlertController,
    private loadingCtrl: LoadingController,
    private toastController: ToastController
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

  public async multLoading(activate: boolean) {
    const mult = activate ? 1 : -1;
    this.loadingQueue += mult;

    if (this.loadingQueue > 0 && !this.loading) {
      if (activate) {
        this.loading = true;
        const loading = await this.loadingCtrl.create({
          cssClass: 'custom-loading',
          mode: 'md',
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
}
