import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { HeaderComponent } from './header/header.component';
import { IndexComponent } from './index/index.component';
import { CounterComponent } from './index/counter/counter.component';
import { HistoryComponent } from './index/history/history.component';
import { StatisticComponent } from './index/statistic/statistic.component';
import { NotyficationComponent } from './index/counter/notyfication/notyfication.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    IndexComponent,
    CounterComponent,
    HistoryComponent,
    StatisticComponent,
    NotyficationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
