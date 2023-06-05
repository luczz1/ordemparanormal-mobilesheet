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
    appearance: new FormControl(null),
    character_id: new FormControl(null),
  });

  constructor(
    private activatedRoute: ActivatedRoute,
    private charactersService: CharactersService,
    public generic: GenericService
  ) {}

  ionViewDidEnter(): void {
    this.generic.multLoading(true);

    this.charName = localStorage.getItem('name');

    this.characterID = Number(
      this.activatedRoute.snapshot.paramMap.get('characterid')
    );

    this.getAboutInfos();
  }

  ionViewDidLeave(): void {
    this.pageLoaded = false;
    this.aboutForm.reset();
  }

  public getAboutInfos() {
    this.charactersService.getCharacterAbout(this.characterID).subscribe(
      (res) => {
        if (res) {
          this.aboutForm.patchValue(res);
        }

        this.generic.multLoading(false);
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
        .subscribe({ error: (err) => this.generic.presentToast(err.error, 3) });
      this.timeoutId = null;
    }, 500);
  }
}
