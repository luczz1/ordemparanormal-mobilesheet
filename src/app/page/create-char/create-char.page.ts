import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController, ViewDidEnter, ViewDidLeave } from '@ionic/angular';
import { CharactersService } from 'src/app/services/endpoints/characters.service';
import { GenericService } from 'src/app/services/generic.service';

@Component({
  selector: 'app-create-char',
  templateUrl: 'create-char.page.html',
  styleUrls: ['create-char.page.scss'],
})
export class CreateCharPage implements ViewDidEnter, ViewDidLeave {
  public characterForm: any = new FormGroup({
    id: new FormControl(0),
    name: new FormControl(null, [Validators.required]),
    age: new FormControl(null, [Validators.required]),
    birthplace: new FormControl(''),
    personality: new FormControl(null, [Validators.required]),
    charClass: new FormControl(null, [Validators.required]),
    characteristic: new FormControl(''),
    current_effort: new FormControl(null),
    current_life: new FormControl(null),
    current_sanity: new FormControl(null),
    displacement: new FormControl(null, [Validators.required]),
    image_url: new FormControl(null, [Validators.required]),
    max_effort: new FormControl(null, [Validators.required]),
    max_life: new FormControl(null, [Validators.required]),
    max_sanity: new FormControl(null, [Validators.required]),
    nex: new FormControl(null, [Validators.required]),
    player: new FormControl(null, [Validators.required]),
    weight: new FormControl(0),
  });

  public selectedImage = '';
  public characterId = 0;
  public editingMode = false;

  public imagesModalIsOpen = false;

  public pageLoaded = false;

  public imagesArray = [
    { name: 'Agatha', url: '/assets/char/agatha.png' },
    { name: 'Arthur', url: '/assets/char/arthur.png' },
    { name: 'Balu', url: '/assets/char/balu.png' },
    { name: 'Beatrice', url: '/assets/char/beatrice.png' },
    { name: 'Carina', url: '/assets/char/carina.png' },
    { name: 'Clarissa', url: '/assets/char/clarissa.png' },
    { name: 'Dante', url: '/assets/char/dante.png' },
    { name: 'Daniel', url: '/assets/char/daniel.png' },
    { name: 'Elizabeth', url: '/assets/char/liz.png' },
    { name: 'Erin', url: '/assets/char/erin.png' },
    { name: 'Fernando', url: '/assets/char/fernando.png' },
    { name: 'Gal', url: '/assets/char/gal.png' },
    { name: 'Ivete', url: '/assets/char/ivete.png' },
    { name: 'Joui', url: '/assets/char/joui.png' },
    { name: 'Kaiser', url: '/assets/char/kaiser.png' },
    { name: 'Kian', url: '/assets/char/kian.png' },
    { name: 'Magistrada', url: '/assets/char/magistrada.png' },
    { name: 'Mia', url: '/assets/char/mia.png' },
    { name: 'Olivia', url: '/assets/char/olivia.png' },
    { name: 'Rubens', url: '/assets/char/rubens.png' },
    { name: 'Thiago', url: '/assets/char/thiago.png' },
    { name: 'Tristan', url: '/assets/char/tristan.png' },
    { name: 'Veríssimo', url: '/assets/char/verissimo.png' },
  ];

  constructor(
    private characterService: CharactersService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public modalController: ModalController,
    private generic: GenericService
  ) {}

  ionViewDidEnter(): void {
    this.editingMode = false;

    this.characterId = Number(
      this.activatedRoute.snapshot.paramMap.get('characterid')
    );

    if (this.characterId) {
      this.pageLoaded = false;

      this.generic.multLoading(true);
      this.editingMode = true;
      this.getCharacterByID();
    } else {
      this.pageLoaded = true;
    }
    this.selectedImage = '';
  }

  ionViewDidLeave(): void {
    this.pageLoaded = false;

    this.characterForm.reset(
      { id: 0 },
      { birthplace: '' },
      { characterisct: '' }
    );
  }

  public selectImage(imageurl: string, imagename: string) {
    this.characterForm.get('image_url').patchValue(imageurl);
    this.selectedImage = imagename;
    this.modalController.dismiss();
  }

  public getCharacterByID() {
    this.characterService.getCharacterByID(this.characterId).subscribe(
      (res) => {
        this.characterForm.patchValue(res.character);
        this.characterForm.get('charClass').patchValue(res.character.class);

        this.pageLoaded = true;

        this.generic.multLoading(false);
      },
      (error) => {
        this.generic.presentToast(error.error.error, 3);

        this.pageLoaded = true;

        this.generic.multLoading(false);
      }
    );
  }

  public createCharacter() {
    if (this.characterForm.valid) {
      const obj = this.characterForm.getRawValue();

      obj.current_life = Number(obj.max_life);
      obj.current_sanity = Number(obj.max_sanity);
      obj.current_effort = Number(obj.max_effort);

      obj.current_life = Number(obj.current_life);
      obj.current_sanity = Number(obj.current_sanity);
      obj.current_effort = Number(obj.current_effort);

      obj.max_life = Number(obj.max_life);
      obj.max_sanity = Number(obj.max_sanity);
      obj.max_effort = Number(obj.max_effort);

      obj.displacement = Number(obj.displacement);

      this.characterService.createNewCharacter(obj).subscribe({
        next: () => this.router.navigate(['/characters']),
        error: (err) => {
          console.log(err), this.generic.presentToast(err.error.error, 3);
        },
      });
    } else {
      alert('Formulário inválido. Certifique-se de que não esqueceu nada.');
    }
  }

  public saveCharacterEdit() {
    if (this.characterForm.valid) {
      const obj = this.characterForm.getRawValue();

      obj.displacement = Number(obj.displacement);
      localStorage.setItem('name', obj.name);

      this.characterService.editCharacter(this.characterId, obj).subscribe({
        next: () => this.router.navigate([`/character/${this.characterId}`]),
        error: (err) => {
          console.log(err), this.generic.presentToast(err.error.error, 3);
        },
      });
    } else {
      alert('Formulário inválido. Certifique-se de que não esqueceu nada.');
    }
  }

  public redirectToBackScreen() {
    if (this.editingMode) {
      this.router.navigateByUrl(`/character/${this.characterId}`);
      return;
    }

    this.router.navigateByUrl('/characters');
  }
}
