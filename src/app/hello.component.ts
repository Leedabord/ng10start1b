import { Component, OnInit, Input } from '@angular/core';
import { SessionService } from './services/session.service'

@Component({
  selector: 'hello',
  template: `<h1>Hello {{name}}!  Are you  {{currentUser}} ?</h1>`,
  styles: [`h1 { font-family: Lato; }`]
})
export class HelloComponent implements OnInit {
  @Input() name: string;

  currentUser: string;

  constructor(session:SessionService) {
    this.currentUser = " this. " + session.userName;
  }

  ngOnInit() {  }

}
