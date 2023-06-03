import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ViewDidEnter, ViewDidLeave } from '@ionic/angular';
import { Editor } from 'ngx-editor';

@Component({
  selector: 'app-character-notes',
  templateUrl: 'character-notes.page.html',
  styleUrls: ['character-notes.page.scss'],
})
export class CharacterNotesPage implements ViewDidEnter, ViewDidLeave {
  public editor: Editor = new Editor();
  public html = '';

  public pageLoaded = false;

  public characterID = 0;
  public charName: string | null = '';
  public timeoutId: ReturnType<typeof setTimeout> | null = null;

  constructor(private activatedRoute: ActivatedRoute) {}

  ionViewDidEnter(): void {
    this.characterID = Number(
      this.activatedRoute.snapshot.paramMap.get('characterid')
    );
    this.charName = localStorage.getItem('name');

    if (localStorage.getItem(`notation${this.characterID}`)) {
      this.html = localStorage.getItem(`notation${this.characterID}`);
    }

    this.editor = new Editor();

    this.pageLoaded = true;
  }

  ionViewDidLeave(): void {
    this.pageLoaded = false;
    this.html = null;
    this.editor.destroy();
  }

  public saveNotations() {
    if (this.timeoutId !== null) {
      clearTimeout(this.timeoutId);
    }

    this.timeoutId = setTimeout(() => {
      const cleanedHtml = this.removeTagsAndCheckEmpty(this.html);
      if (cleanedHtml.length === 0) {
        localStorage.removeItem(`notation${this.characterID}`);
      } else {
        localStorage.setItem(`notation${this.characterID}`, this.html);
      }
    }, 200);
  }

  private removeTagsAndCheckEmpty(html) {
    const regex = /<[^>]+>/g;
    const cleanedHtml = html.replace(regex, '');
    return cleanedHtml.trim();
  }

}
