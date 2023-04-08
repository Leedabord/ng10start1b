import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SessionService } from '../services/session.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-first-demo',
  templateUrl: './first-demo.component.html',
  styleUrls: ['./first-demo.component.css']
})
export class FirstDemoComponent implements OnInit, OnDestroy {
  message:string;
  subscription: Subscription;

  showRecs = [ { Event_Key: "", groupKey: "gk001", Team: "", w$: 0, s18: 0, sf9: 0, sb9: 0 } ];
  getRecs = [ { fields: {Team: "", win$: 0, groupKey: "gk0001a" } } ];

  match = [ 
    {tt: "aa", so: [ 
    {gk: "00gkey", ww: 0, ss: 0, bb: 0 }, 
    {gk: "00gkey", ww: 0, ss: 0, bb: 0 }, 
    {gk: "00gkey", ww: 0, ss: 0, bb: 0 }, 
    {gk: "00gkey", ww: 0, ss: 0, bb: 0 }, 
    {gk: "00gkey", ww: 0, ss: 0, bb: 0 }, 
    {gk: "00gkey", ww: 0, ss: 0, bb: 0 }, 
    {gk: "00gkey", ww: 0, ss: 0, bb: 0 }, 
    {gk: "00gkey", ww: 0, ss: 0, bb: 0 }, 
    {gk: "00gkey", ww: 0, ss: 0, bb: 0 }, 
    {gk: "00gkey", ww: 0, ss: 0, bb: 0 }, 
    {gk: "00gkey", ww: 0, ss: 0, bb: 0 }, 
    {gk: "00gkey", ww: 0, ss: 0, bb: 0 }, 
    {gk: "00gkey", ww: 0, ss: 0, bb: 0 }, 
    {gk: "00gkey", ww: 0, ss: 0, bb: 0 }, 
    {gk: "00gkey", ww: 0, ss: 0, bb: 0 }, 
    {gk: "00gkey", ww: 0, ss: 0, bb: 0 }, 
    {gk: "00gkey", ww: 0, ss: 0, bb: 0 }, 
    {gk: "00gkey", ww: 0, ss: 0, bb: 0 }
   ] }, 
   {tt: "bb", so: [ 
    {gk: "01gkey", ww: 0, ss: 0, bb: 0 }, 
    {gk: "00gkey", ww: 0, ss: 0, bb: 0 }, 
    {gk: "00gkey", ww: 0, ss: 0, bb: 0 }, 
    {gk: "00gkey", ww: 0, ss: 0, bb: 0 }, 
    {gk: "00gkey", ww: 0, ss: 0, bb: 0 }, 
    {gk: "00gkey", ww: 0, ss: 0, bb: 0 }, 
    {gk: "00gkey", ww: 0, ss: 0, bb: 0 }, 
    {gk: "00gkey", ww: 0, ss: 0, bb: 0 }, 
    {gk: "00gkey", ww: 0, ss: 0, bb: 0 }, 
    {gk: "00gkey", ww: 0, ss: 0, bb: 0 }, 
    {gk: "00gkey", ww: 0, ss: 0, bb: 0 }, 
    {gk: "00gkey", ww: 0, ss: 0, bb: 0 }, 
    {gk: "00gkey", ww: 0, ss: 0, bb: 0 }, 
    {gk: "00gkey", ww: 0, ss: 0, bb: 0 }, 
    {gk: "00gkey", ww: 0, ss: 0, bb: 0 }, 
    {gk: "00gkey", ww: 0, ss: 0, bb: 0 }, 
    {gk: "00gkey", ww: 0, ss: 0, bb: 0 }, 
    {gk: "00gkey", ww: 0, ss: 0, bb: 0 }
   ] }, 
   {tt: "cc", so: [ 
    {gk: "02gkey", ww: 0, ss: 0, bb: 0 }, 
    {gk: "00gkey", ww: 0, ss: 0, bb: 0 }, 
    {gk: "00gkey", ww: 0, ss: 0, bb: 0 }, 
    {gk: "00gkey", ww: 0, ss: 0, bb: 0 }, 
    {gk: "00gkey", ww: 0, ss: 0, bb: 0 }, 
    {gk: "00gkey", ww: 0, ss: 0, bb: 0 }, 
    {gk: "00gkey", ww: 0, ss: 0, bb: 0 }, 
    {gk: "00gkey", ww: 0, ss: 0, bb: 0 }, 
    {gk: "00gkey", ww: 0, ss: 0, bb: 0 }, 
    {gk: "00gkey", ww: 0, ss: 0, bb: 0 }, 
    {gk: "00gkey", ww: 0, ss: 0, bb: 0 }, 
    {gk: "00gkey", ww: 0, ss: 0, bb: 0 }, 
    {gk: "00gkey", ww: 0, ss: 0, bb: 0 }, 
    {gk: "00gkey", ww: 0, ss: 0, bb: 0 }, 
    {gk: "00gkey", ww: 0, ss: 0, bb: 0 }, 
    {gk: "00gkey", ww: 0, ss: 0, bb: 0 }, 
    {gk: "00gkey", ww: 0, ss: 0, bb: 0 }, 
    {gk: "00gkey", ww: 0, ss: 0, bb: 0 }
   ] }, 
   {tt: "dd", so: [ 
    {gk: "03gkey", ww: 0, ss: 0, bb: 0 }, 
    {gk: "00gkey", ww: 0, ss: 0, bb: 0 }, 
    {gk: "00gkey", ww: 0, ss: 0, bb: 0 }, 
    {gk: "00gkey", ww: 0, ss: 0, bb: 0 }, 
    {gk: "00gkey", ww: 0, ss: 0, bb: 0 }, 
    {gk: "00gkey", ww: 0, ss: 0, bb: 0 }, 
    {gk: "00gkey", ww: 0, ss: 0, bb: 0 }, 
    {gk: "00gkey", ww: 0, ss: 0, bb: 0 }, 
    {gk: "00gkey", ww: 0, ss: 0, bb: 0 }, 
    {gk: "00gkey", ww: 0, ss: 0, bb: 0 }, 
    {gk: "00gkey", ww: 0, ss: 0, bb: 0 }, 
    {gk: "00gkey", ww: 0, ss: 0, bb: 0 }, 
    {gk: "00gkey", ww: 0, ss: 0, bb: 0 }, 
    {gk: "00gkey", ww: 0, ss: 0, bb: 0 }, 
    {gk: "00gkey", ww: 0, ss: 0, bb: 0 }, 
    {gk: "00gkey", ww: 0, ss: 0, bb: 0 }, 
    {gk: "00gkey", ww: 0, ss: 0, bb: 0 }, 
    {gk: "00gkey", ww: 0, ss: 0, bb: 0 }
   ] }, 
   {tt: "ee", so: [ 
    {gk: "04gkey", ww: 0, ss: 0, bb: 0 }, 
    {gk: "00gkey", ww: 0, ss: 0, bb: 0 }, 
    {gk: "00gkey", ww: 0, ss: 0, bb: 0 }, 
    {gk: "00gkey", ww: 0, ss: 0, bb: 0 }, 
    {gk: "00gkey", ww: 0, ss: 0, bb: 0 }, 
    {gk: "00gkey", ww: 0, ss: 0, bb: 0 }, 
    {gk: "00gkey", ww: 0, ss: 0, bb: 0 }, 
    {gk: "00gkey", ww: 0, ss: 0, bb: 0 }, 
    {gk: "00gkey", ww: 0, ss: 0, bb: 0 }, 
    {gk: "00gkey", ww: 0, ss: 0, bb: 0 }, 
    {gk: "00gkey", ww: 0, ss: 0, bb: 0 }, 
    {gk: "00gkey", ww: 0, ss: 0, bb: 0 }, 
    {gk: "00gkey", ww: 0, ss: 0, bb: 0 }, 
    {gk: "00gkey", ww: 0, ss: 0, bb: 0 }, 
    {gk: "00gkey", ww: 0, ss: 0, bb: 0 }, 
    {gk: "00gkey", ww: 0, ss: 0, bb: 0 }, 
    {gk: "00gkey", ww: 0, ss: 0, bb: 0 }, 
    {gk: "00gkey", ww: 0, ss: 0, bb: 0 }
   ] }, 
  ];

  isDarkTheme = false;
  lastDialogResult: string;
  mode: string;
  value: number;

  foods: any[] = [
    { name: 'Pizza', rating: 'Excellent' },
    { name: 'Burritos', rating: 'Great' },
    { name: 'French fries', rating: 'Pretty good' },
  ];

  badgeDisabled = true;
  badgeHidden = false;
  badgeOverlap = false;
 
  public selectedValue: string;

  constructor(
    private httpC: HttpClient, 
    private sessionSvc: SessionService
    ) {  }

    ngOnInit() {
      console.log("first-demo onInit:: ", Date.now() );
  
      this.tempfn();  // call function to do something

      this.subscription = this.sessionSvc.currentMessage.subscribe(message => this.message = message)
    }
    
    ngOnDestroy() {
      this.subscription.unsubscribe();
    }
    
  tempfn() { 

    var ii = 0, jj = 0;
  
    this.getRecs.forEach((ee, xx) => {
      console.log("tempfn >> getRecs::", xx, ":: ", this.getRecs[xx]);
      var isNew = true; var isLatest = false;
      for (jj = 0; jj < this.match.length; jj++) {
        if ("AA" == "AA") {
          isNew = false;
          if (isLatest) {
            // replace "AA"
          }
        }
      }
    } )

    /*
    for (ii = 0; ii < this.getRecs.length; ii++) {  
      for (jj = 0; jj < this.match.length; jj++) {
        if (this.getRecs[ii].tt === this.match[jj].tt) {
          if (this.getRecs[ii].gk > this.match[jj].so[this.getRecs[ii].hh-1].gk) {
            this.match[jj].so[this.getRecs[ii].hh-1].ss = this.getRecs[ii].ss;
            this.match[jj].so[this.getRecs[ii].hh-1].ww += this.getRecs[ii].bb;
          }
        }
      }
    }
    console.log( ">> :: ", this.match);
xxx
    */
  }
    
}