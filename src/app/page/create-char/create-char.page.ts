import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CharactersService } from 'src/app/services/endpoints/characters.service';

@Component({
  selector: 'app-create-char',
  templateUrl: 'create-char.page.html',
  styleUrls: ['create-char.page.scss'],
})
export class CreateCharPage {
  public characterForm: any = new FormGroup({
    id: new FormControl(0),
    name: new FormControl('', [Validators.required]),
    age: new FormControl(null, [Validators.required]),
    birthplace: new FormControl(''),
    personality: new FormControl('', [Validators.required]),
    charClass: new FormControl('', [Validators.required]),
    characteristic: new FormControl(''),
    current_effort: new FormControl(0),
    current_life: new FormControl(0),
    current_sanity: new FormControl(0),
    displacement: new FormControl(null, [Validators.required]),
    image_url: new FormControl(''),
    max_effort: new FormControl(0, [Validators.required]),
    max_life: new FormControl(0, [Validators.required]),
    max_sanity: new FormControl(0, [Validators.required]),
    nex: new FormControl(null, [Validators.required]),
    player: new FormControl('', [Validators.required]),
    weight: new FormControl(0),
  });

  constructor(
    private characterService: CharactersService,
    private router: Router
  ) {}

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

      this.characterService
        .createNewCharacter(obj)
        .subscribe({
          next: () => this.router.navigate(['/characters']),
          error: (err) => console.log(err),
        });
    } else {
      alert('Formulário inválido. Certifique-se de que não esqueceu nada.')
    }
  }
}
