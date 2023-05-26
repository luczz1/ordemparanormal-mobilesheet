import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class RouterGuard {
  constructor(private router: Router) {}

  canActivate(
    next?: ActivatedRouteSnapshot,
    state?: RouterStateSnapshot
  ): boolean {
    if (localStorage.getItem('character')) {
      this.router.navigate[(`/character/${localStorage.getItem('character')}`)];
      return false;
    }

    return true;
  }
}
