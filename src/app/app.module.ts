import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { BtcService } from './btc.service';

import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    BrowserModule,
    
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
    ]),
    HttpClientModule,
    
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
  ],
  bootstrap: [AppComponent],
  providers: [BtcService],
})
export class AppModule {}