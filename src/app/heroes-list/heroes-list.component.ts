import { Component, VERSION, Optional, OnInit, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SessionService } from '../services/session.service'
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-heroes-list',
  templateUrl: './heroes-list.component.html',
  styleUrls: ['./heroes-list.component.css']
})
export class HeroesListComponent implements OnInit, OnDestroy {
  message:string;
  subscription: Subscription;

  currentUser: string;
  name = 'Angular ' + VERSION.major;

  isDarkTheme = false;
  lastDialogResult: string;
  mode: string;
  value: number;

  foods: any[] = [
    { name: 'Pizza', rating: 'Excellent' },
    { name: 'Burritos', rating: 'Great' },
    { name: 'French fries', rating: 'Pretty good' },
  ];

  public selectedValue: string;

  public games = [
    {value: 'rts-0', viewValue: 'Starcraft'},
    {value: 'rpg-1', viewValue: 'Baldur\'s Gate'},
    {value: 'fps-2', viewValue: 'Doom'}
  ];

  public progress = 0;
  public slider = {
    'autoTicks': false,
    'disabled': false,
    'invert': false,
    'max': 100,
    'min': 0,
    'showTicks': false,
    'step': 1,
    'thumbLabel': false,
    'value': 0,
    'vertical': false,
    'tickInterval': 1,
    'checked': true
  };
  public tiles = [
    { text: 'One', cols: 3, rows: 1, color: 'lightblue' },
    { text: 'Two', cols: 1, rows: 2, color: 'lightgreen' },
    { text: 'Three', cols: 1, rows: 1, color: 'lightpink' },
    { text: 'Four', cols: 2, rows: 1, color: '#DDBDF1' },
  ];

  public color: string;

  public availableColors = [
    { name: 'none', color: '' },
    { name: 'Primary', color: 'primary' },
    { name: 'Accent', color: 'accent' },
    { name: 'Warn', color: 'warn' }
  ];

  public match = {when: "", where: ""};

  public Teams = [ 
    { utilkey: "sgt-when-where", 
    tag: "LIV", wins: 0, bonus: 0, skins: 0, tsf9: 0, tsb9: 0, tsr18: 0, 
    hw: [false,false,false,false,false,false,false,false,false,
        false,false,false,false,false,false,false,false,false],
        sf9: [8,8,8,8,8,8,8,8,8],
        sb9: [8,8,8,8,8,8,8,8,8] },
    {utilkey: "sgt-when-where", 
    tag: "PGA", wins: 0, bonus: 0, skins: 0, tsf9: 0, tsb9: 0, tsr18: 0, 
    hw: [false,false,false,false,false,false,false,false,false,
        false,false,false,false,false,false,false,false,false],
        sf9: [8,8,8,8,8,8,8,8,8],
        sb9: [8,8,8,8,8,8,8,8,8] },
    {utilkey: "sgt-when-where", 
    tag: "Buggers", wins: 0, bonus: 0, skins: 0, tsf9: 0, tsb9: 0, tsr18: 0, 
    hw: [false,false,false,false,false,false,false,false,false,
        false,false,false,false,false,false,false,false,false],
        sf9: [8,8,8,8,8,8,8,8,8],
        sb9: [8,8,8,8,8,8,8,8,8] },
    {utilkey: "sgt-when-where", 
    tag: "Mango", wins: 0, bonus: 0, skins: 0, tsf9: 0, tsb9: 0, tsr18: 0, 
    hw: [false,false,false,false,false,false,false,false,false,
        false,false,false,false,false,false,false,false,false],
        sf9: [8,8,8,8,8,8,8,8,8],
        sb9: [8,8,8,8,8,8,8,8,8] },
  ];

  constructor(private _dialog: MatDialog, private _snackbar: MatSnackBar, 
    //    private httpC: HttpClient, 
        private session: SessionService) {
        this.currentUser = session.userName;
    
    // Update the value for the progress-bar on an interval.
    /*    setInterval(() => {
          this.progress = (this.progress + Math.floor(Math.random() * 4) + 1) % 100;
        }, 200);
    */
  }

  ngOnInit() {
    this.subscription = this.session.currentMessage.subscribe(message => this.message = message)
  }
      
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
    
  newMessage() {
    this.session.changeMessage("Hello from appC")
  }
    
  showSnackbar() {
    this._snackbar.open('YUM SNACKS', 'CHEW');
  }
  get tickInterval(): number | 'auto' {
    return this.slider.showTicks ? (this.slider.autoTicks ? 'auto' : this.slider.tickInterval) : null;
  }
  set tickInterval(v) {
    this.slider.tickInterval = Number(v);
  }
    
  tempfn() { 
        let skinpot = 0; let sf9 = 0;
      
        for (let ii = 0; ii < 9; ii++) {
          skinpot += 1;
          let minscore = Math.min(this.Teams[0].sf9[ii], this.Teams[1].sf9[ii],
            this.Teams[2].sf9[ii], this.Teams[3].sf9[ii] );  
          let winner = 9;
          for (let jj = 0; jj < 4; jj++) {
            this.Teams[jj].hw[ii] = false;
            if (this.Teams[jj].sf9[ii] == minscore) {
              if (winner == 9) {
                winner = jj;  
              } else {
                winner = 9;
              }
            }
          }
          if (winner < 4) {
            this.Teams[winner].hw[ii] = true;
            this.Teams[winner].skins += skinpot;
            skinpot = 0;
          }
        }
      
    for (let ii = 0; ii < 9; ii++) {
          skinpot += 1;
          let minscore = Math.min(this.Teams[0].sb9[ii], this.Teams[1].sb9[ii],
            this.Teams[2].sb9[ii], this.Teams[3].sb9[ii] );  
          let winner = 9;
          for (let jj = 0; jj < 4; jj++) {
            this.Teams[jj].hw[ii] = false;
            if (this.Teams[jj].sb9[ii] == minscore) {
              if (winner == 9) {
                winner = jj;  
              } else {
                winner = 9;
              }
            }
          }
          if (winner < 4) {
            this.Teams[winner].hw[ii] = true;
            this.Teams[winner].skins += skinpot;
            skinpot = 0;
          }
    }
      
    for (let jj = 0; jj < 4; jj++) {
      this.Teams[jj].wins = this.Teams[jj].bonus + this.Teams[jj].skins;
    }
      
  } // end tempfn()

}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/