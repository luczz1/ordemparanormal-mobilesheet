import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class CharacterGuard {
  constructor(private router: Router) {}

  canActivate(
    next?: ActivatedRouteSnapshot,
    state?: RouterStateSnapshot
  ): boolean {
    if (!localStorage.getItem('token') || !localStorage.getItem('character')) {
      this.router.navigateByUrl(`/home`);
      return false;
    }

    return true;
  }
}
