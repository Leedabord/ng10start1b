import 'hammerjs';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppMaterialModule } from './app.material.module';
import { AppComponent, DialogContentComponent } from './app.component';
import { SessionService } from './services/session.service';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { HelloComponent } from './hello.component';
// import { MatInputModule } from '@angular/material/input';
import { FirstDemoComponent } from './first-demo/first-demo.component'

@NgModule({
  imports:  [ BrowserModule,     BrowserAnimationsModule,
    FormsModule, 
    // MatInputModule,   
    AppMaterialModule,    
    HttpClientModule,   
  ],
  declarations: [AppComponent, DialogContentComponent, 
    HelloComponent, FirstDemoComponent ],
  entryComponents: [DialogContentComponent],
  providers: [SessionService],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
