import { Component, HostListener } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController, ViewDidEnter, ViewDidLeave } from '@ionic/angular';
import { NgxImageCompressService } from 'ngx-image-compress';
import { ClassesModel, TracksModel } from 'src/app/models/character';
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
    path: new FormControl(null),
    charClass: new FormControl(null, [Validators.required]),
    occupation: new FormControl(''),
    current_effort: new FormControl(0),
    current_life: new FormControl(0),
    current_sanity: new FormControl(0),
    displacement: new FormControl('9m/6q', [Validators.required]),
    image_url: new FormControl(null),
    max_effort: new FormControl(0),
    max_life: new FormControl(0),
    max_sanity: new FormControl(0),
    nex: new FormControl(5),
    player: new FormControl(null, [Validators.required]),
    weight: new FormControl(0),
    origin: new FormControl('', [Validators.required]),
    pe_round: new FormControl(0),
  });

  public attrForm = new FormGroup({
    id_attr: new FormControl(0),
    agility: new FormControl(1),
    strength: new FormControl(1),
    intellect: new FormControl(1),
    stamina: new FormControl(1),
    presence: new FormControl(1),
  });

  public imageResult = '';

  public pageWidth = 0;
  public characterId = 0;
  public editingMode = false;

  public pageLoaded = false;

  public editingAttr = false;
  public className = '';

  public classesGroup: ClassesModel[] = [];
  public tracksGroup: TracksModel[] = [];
  public originsGroup: ClassesModel[] = [];

  public nexValues = [
    5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95,
    100,
  ];

  public hideClassesSuggestions = true;
  public hideTracksSuggestions = true;
  public hideOriginsSuggestions = true;
  public hideNexSuggestions = true;

  constructor(
    private characterService: CharactersService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public modalController: ModalController,
    private generic: GenericService,
    private imageCompress: NgxImageCompressService
  ) {}

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.pageWidth = event.target.innerWidth;
  }

  ionViewDidEnter(): void {
    this.editingMode = false;

    this.pageWidth = window.innerWidth;

    this.characterId = Number(
      this.activatedRoute.snapshot.paramMap.get('characterid')
    );

    this.getClasses();
    this.getOrigins();

    if (this.characterId) {
      this.pageLoaded = false;

      this.generic.multLoading(true);
      this.editingMode = true;
      this.getCharacterByID();
    } else {
      this.pageLoaded = true;
    }
  }

  ionViewDidLeave(): void {
    this.pageLoaded = false;

    this.characterForm.reset({ id: 0 }, { birthplace: '' }, { occupation: '' });
  }

  public getCharacterByID() {
    this.characterService.getCharacterByID(this.characterId).subscribe(
      (res) => {
        this.characterForm.patchValue(res.character);
        this.characterForm.get('charClass').patchValue(res.character.class);
        this.imageResult = this.characterForm.get('image_url').getRawValue();

        this.className = res.character.class;
        if (this.className !== 'Mundano') {
          const classId =
            this.className === 'Combatente'
              ? 1
              : this.className === 'Especialista'
              ? 2
              : 3;
          this.getTracks(classId, this.className, false);
        } else {
          this.characterForm.get('nex').patchValue(null);
        }

        this.pageLoaded = true;

        this.generic.multLoading(false);
      },
      (error) => {
        this.generic.presentToast(error.error, 3);

        this.pageLoaded = true;

        this.generic.multLoading(false);
      }
    );
  }

  public createCharacter() {
    if (this.characterForm.valid && this.attrForm.valid) {
      const obj = this.characterForm.getRawValue();
      const objAttr = this.attrForm.getRawValue();

      this.characterService.createNewCharacter(obj, objAttr).subscribe({
        next: () => this.router.navigate(['/characters']),
        error: (err) => {
          console.log(err), this.generic.presentToast(err.error, 3);
        },
      });
    } else {
      this.generic.presentToast(
        'Formulário inválido. Certifique-se de que não esqueceu nada.',
        3
      );
    }
  }

  public saveCharacterEdit() {
    if (this.characterForm.valid) {
      const obj = this.characterForm.getRawValue();

      localStorage.setItem('name', obj.name);

      this.characterService.editCharacter(this.characterId, obj).subscribe({
        next: () => {
          this.router.navigate([`/character/${this.characterId}`]);
          localStorage.setItem('updatedChar', 'true');
        },
        error: (err) => {
          console.log(err), this.generic.presentToast(err.error, 3);
        },
      });
    } else {
      this.generic.presentToast(
        'Formulário inválido. Certifique-se de que não esqueceu nada.',
        3
      );
    }
  }

  public compressFile() {
    const MAX_MEGABYTE = 0.5;

    this.imageCompress.uploadAndGetImageWithMaxSize(MAX_MEGABYTE).then(
      (result: string) => {
        this.imageResult = result;

        this.characterForm.get('image_url').patchValue(this.imageResult);
      },
      (result: string) => {
        console.error(
          "The compression algorithm didn't succed! The best size we can do is",
          this.imageCompress.byteCount(result),
          'bytes'
        );

        this.imageResult = result;
        this.characterForm.get('image_url').patchValue(this.imageResult);
      }
    );
  }

  public getTracks(class_id: number, classname: string, clearTrack = true) {
    if (clearTrack) {
      this.characterForm.get('charClass').patchValue(classname);
      this.characterForm.get('path').patchValue('');
    }

    this.className = classname;

    if (classname === 'Mundano') {
      this.characterForm.get('nex').patchValue(null);
      this.tracksGroup = [];
      return;
    } else {
      if (this.characterForm.get('nex').getRawValue() === null) {
        this.characterForm.get('nex').patchValue(5);
      }
    }

    this.characterService.getTracks(class_id).subscribe({
      next: (response: TracksModel[]) => {
        this.tracksGroup = response;
      },
      error: (err) => {
        this.generic.presentToast(err.error, 3);
      },
    });
  }

  public redirectToBackScreen() {
    if (this.editingMode) {
      this.router.navigateByUrl(`/character/${this.characterId}`);
      return;
    }

    this.router.navigateByUrl('/characters');
  }

  public hideSuggestion(name: string) {
    setTimeout(() => {
      this[name] = true;
    }, 50);
  }

  private getClasses() {
    this.characterService.getClasses().subscribe({
      next: (response: ClassesModel[]) => {
        this.classesGroup = response;
      },
      error: (err) => {
        this.generic.presentToast(err.error, 3);
      },
    });
  }

  private getOrigins() {
    this.characterService.getOrigins().subscribe({
      next: (response: ClassesModel[]) => {
        this.originsGroup = response;
      },
      error: (err) => {
        this.generic.presentToast(err.error, 3);
      },
    });
  }
}
