import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-your-modal',
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>Escolha como rolar a perícia</ion-title>
        <ion-buttons slot="end">
          <ion-button (click)="dismiss('')">
            <ion-icon name="close"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-button
        class="modal-button"
        (click)="dismiss('agility')"
        expand="block"
      >
        Agilidade
      </ion-button>
      <ion-button
        class="modal-button"
        (click)="dismiss('strength')"
        expand="block"
      >
        Força
      </ion-button>
      <ion-button
        class="modal-button"
        (click)="dismiss('intellect')"
        expand="block"
      >
        Intelecto
      </ion-button>
      <ion-button
        class="modal-button"
        (click)="dismiss('presence')"
        expand="block"
      >
        Presença
      </ion-button>
      <ion-button
        class="modal-button"
        (click)="dismiss('stamina')"
        expand="block"
      >
        Vigor
      </ion-button>
    </ion-content>
  `,
  styles: [
    `
      .modal-content {
        max-width: 300px;
        margin: 0 auto;
      }

      .modal-button {
        margin-top: 3em;
        --border-style: solid;
        --border-width: 1px;
        --background: none;
        --border-radius: 16px;
        --border-color: var(--ion-color-light-main);
        --color: var(--ion-color-light-main);
      }
    `,
  ],
})
export class RollQuestionComponent {
  @Input() skill: any;

  constructor(private modalController: ModalController) {}

  dismiss(rollValue: string | number) {
    this.modalController.dismiss({ rollValue });
  }
}
