import 'hammerjs';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppMaterialModule } from './app.material.module';
import { MatInputModule } from '@angular/material/input';
import { AppComponent, DialogContentComponent } from './app.component';
import { SessionService } from './services/session.service';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HelloComponent } from './hello.component';
import { FirstDemoComponent } from './first-demo/first-demo.component'
import { CrisisListComponent } from './crisis-list/crisis-list.component';
import { HeroesListComponent } from './heroes-list/heroes-list.component';

@NgModule({
  imports:  [ BrowserModule,     BrowserAnimationsModule,
    FormsModule, 
    // MatInputModule,   
    AppMaterialModule,    
    HttpClientModule,   
    RouterModule.forRoot([
      {path: 'crisis-list', component: CrisisListComponent},
      {path: 'heroes-list', component: HeroesListComponent},
      {path: '', redirectTo: '/heroes-list', pathMatch: 'full'},
      {path: '**', component: PageNotFoundComponent}
    ])
  ],
  declarations: [AppComponent, DialogContentComponent, 
    HelloComponent, FirstDemoComponent,
    CrisisListComponent,
    HeroesListComponent,
    PageNotFoundComponent
  ],
  entryComponents: [DialogContentComponent],
  providers: [SessionService],
  bootstrap: [ AppComponent ]
})
export class AppModule { }

/*

    RouterModule.forRoot([
      {path: 'crisis-list', component: CrisisListComponent},
      {path: 'heroes-list', component: HeroesListComponent},
      {path: '', redirectTo: '/heroes-list', pathMatch: 'full'},
      {path: '**', component: PageNotFoundComponent}
  declarations: [AppComponent, DialogContentComponent, 
    HelloComponent, FirstDemoComponent,
    CrisisListComponent,
    HeroesListComponent,
    PageNotFoundComponent
  ],
  entryComponents: [DialogContentComponent],
  providers: [SessionService],

Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/