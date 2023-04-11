import { Component, VERSION, Optional, OnInit, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatChipsModule} from '@angular/material/chips';
import { SessionService } from './services/session.service'
import { Subscription } from 'rxjs';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})

export class AppComponent  implements OnInit, OnDestroy {
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
    tag: "USGA", wins: 0, bonus: 0, skins: 0, tsf9: 0, tsb9: 0, tsr18: 0, 
    hw: [false,false,false,false,false,false,false,false,false,
        false,false,false,false,false,false,false,false,false],
        sf9: [8,8,8,8,8,8,8,8,8],
        sb9: [8,8,8,8,8,8,8,8,8] },
    {utilkey: "sgt-when-where", 
    tag: "SCGA", wins: 0, bonus: 0, skins: 0, tsf9: 0, tsb9: 0, tsr18: 0, 
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
    setInterval(() => {
      this.progress = (this.progress + Math.floor(Math.random() * 4) + 1) % 100;
    }, 200);
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

  openDialog() {
    const dialogRef = this._dialog.open(DialogContentComponent);

    dialogRef.afterClosed().subscribe(result => {
      this.lastDialogResult = result;
    })
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


@Component({
  template: `
    <h1 matDialogTitle>This is a dialog</h1>
    <div matDialogContent>
      <mat-form-field>
        <label>
          This is a text box inside of a dialog.
          <input matInput #dialogInput>
        </label>
      </mat-form-field>
    </div>
    <div matDialogActions>
      <button mat-raised-button [matDialogClose]="dialogInput.value">CLOSE</button>
    </div>
  `,
})
export class DialogContentComponent {
  constructor( @Optional() public dialogRef: MatDialogRef<DialogContentComponent>) { }
}

/*  
{
	"vm": {	"when": "When",	"loc": "Dos Lagos",	"pp": 2,	"ww": 16,	"tt": 0,	"jp": 0,
    	"cp": [4,4,3,4,5,4,5,3,4,4,4,3,4,5,4,4,3,4],
  		"ch": [7,5,15,13,11,3,17,9,1,14,6,18,4,12,8,10,16,2],
  		"pz4": [15,8,5,3,1,0,-2,-4,-6,-8]
	},
	"vp": [	{
			"nm": " ", "id": "", "tm": "", "th": 0, "ts": 0, "tw": 0, "wolfPts": 0,
			"wolf": {
				"role": ["Hunter","Hunter","Hunter","Hunter","Hunter","Hunter",
                 "Hunter","Hunter","Hunter","Hunter","Hunter","Hunter",
                 "Hunter","Hunter","Hunter","Hunter","Hunter","Hunter"],
				"pts": [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
				"winner": [false,false,false,false,false,false,false,false,false,
                   false,false,false,false,false,false,false,false,false]
			},
			"s": [null,null,null,null,null,null,null,null,null,
            null,null,null,null,null,null,null,null,null],
			"h": [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			"w": [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			"u1": [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			"u2": [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
		},
	],
	"urc": 245
}
*/
