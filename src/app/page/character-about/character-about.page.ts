import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ModalController, ViewDidEnter, ViewDidLeave } from '@ionic/angular';
import { InventoryModel } from 'src/app/models/character';
import { CharactersService } from 'src/app/services/endpoints/characters.service';
import { GenericService } from 'src/app/services/generic.service';

@Component({
  selector: 'app-character-about',
  templateUrl: 'character-about.page.html',
  styleUrls: ['character-about.page.scss'],
})
export class CharacterAboutPage implements ViewDidEnter, ViewDidLeave {
  public characterID = 0;
  public charName: string | null = '';
  public timeoutId: ReturnType<typeof setTimeout> | null = null;

  public pageLoaded = false;

  public aboutForm = new FormGroup({
    id: new FormControl(null),
    history: new FormControl(null),
    personality: new FormControl(null),
    goals: new FormControl(null),
    character_id: new FormControl(null),
  });

  constructor(
    private activatedRoute: ActivatedRoute,
    private charactersService: CharactersService,
    public generic: GenericService
  ) {}

  ionViewDidEnter(): void {
    this.charName = localStorage.getItem('name');

    this.characterID = Number(
      this.activatedRoute.snapshot.paramMap.get('characterid')
    );

    if (localStorage.getItem('characterAbout')) {
      this.aboutForm.patchValue(
        JSON.parse(localStorage.getItem('characterAbout'))
      );

      this.pageLoaded = true;
    } else {
      if (localStorage.getItem('loaded')) {
      this.generic.multLoading(true);
      }
      this.getAboutInfos();
    }
  }

  ionViewDidLeave() {
    this.pageLoaded = false;
}

  public getAboutInfos() {
    this.charactersService.getCharacterAbout(this.characterID).subscribe(
      (res) => {
        if (res) {
          this.aboutForm.patchValue(res);
          localStorage.setItem('characterAbout', JSON.stringify(res));
        }

        if (localStorage.getItem('loaded')) {
        this.generic.multLoading(false);
        }
        this.pageLoaded = true;
      },
      (error) => {
        this.generic.multLoading(false);
        this.generic.presentToast(error.error, 3);
        this.pageLoaded = true;
      }
    );
  }

  public editAboutInfos() {
    if (this.timeoutId !== null) {
      clearTimeout(this.timeoutId);
    }

    this.timeoutId = setTimeout(() => {
      const obj = this.aboutForm.getRawValue();
      this.charactersService
        .editCharacterAbout(this.characterID, obj)
        .subscribe({
          next: () =>
            localStorage.setItem('characterAbout', JSON.stringify(obj)),
          error: (err) => this.generic.presentToast(err.error, 3),
        });
      this.timeoutId = null;
    }, 1000);
  }
}
