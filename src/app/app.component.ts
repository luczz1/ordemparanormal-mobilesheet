import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {
    // let _lsTotal = 0;
    // let _xLen: number;
    // let _x: PropertyKey;
    // for (_x in localStorage) {
    //   if (!localStorage.hasOwnProperty(_x)) {
    //     continue;
    //   }
    //   _xLen = (localStorage[_x].length + _x.length) * 2;
    //   _lsTotal += _xLen;
    //   console.log(_x.substr(0, 50) + ' = ' + (_xLen / 1024).toFixed(2) + ' KB');
    // }
    // console.log('Total = ' + (_lsTotal / 1024).toFixed(2) + ' KB');
  }
}
