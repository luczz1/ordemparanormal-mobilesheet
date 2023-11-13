import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class RoutersnavService {
  private routes: string[] = [];

  constructor(private router: Router) {}

  addRoute(route: string) {
    this.routes.push(route);
  }

  async navigateToNextRoute() {
    while (this.routes.length > 0) {
      const nextRoute = this.routes.shift();
      await this.router.navigateByUrl(nextRoute);
    }
  }

  clearRoutes() {
    this.routes = [];
  }
}
