import { Component } from '@angular/core';

@Component({
  selector: 'app-inventory',
  templateUrl: 'inventory.page.html',
  styleUrls: ['inventory.page.scss'],
})
export class InventoryPage {
  public skills: { name: string; value: number }[] = [
    {
      name: 'atletismo',
      value: 0,
    },
    {
      name: 'atualidades',
      value: 0,
    },
    {
      name: 'ciência',
      value: 0,
    },
    {
      name: 'diplomacia',
      value: 0,
    },
    {
      name: 'enganação',
      value: 0,
    },
    {
      name: 'fortitude',
      value: 0,
    },
    {
      name: 'furtividade',
      value: 0,
    },
    {
      name: 'intimidação',
      value: 0,
    },
    {
      name: 'investigação',
      value: 0,
    },
    {
      name: 'luta',
      value: 0,
    },
    {
      name: 'medicina',
      value: 0,
    },
    {
      name: 'ocultismo',
      value: 0,
    },
    {
      name: 'percepção',
      value: 0,
    },
    {
      name: 'pilotagem',
      value: 0,
    },
    {
      name: 'pontaria',
      value: 0,
    },
    {
      name: 'prestidigitação',
      value: 0,
    },
    {
      name: 'profissão',
      value: 0,
    },
    {
      name: 'reflexos',
      value: 0,
    },
    {
      name: 'religião',
      value: 0,
    },
    {
      name: 'tática',
      value: 0,
    },
    {
      name: 'tecnologia',
      value: 0,
    },
    {
      name: 'vontade',
      value: 0,
    },
  ];

  constructor() {}
}
