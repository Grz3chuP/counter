import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule} from "@angular/platform-browser/animations";
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
import { WeekhistoryComponent } from './index/history/weekhistory/weekhistory.component';
import {RemoveObjectComponent} from "./index/history/remove-object/remove-object.component";
import {OptionsComponent} from "./index/counter/options/options.component";
import {StatisticdayComponent} from "./index/statistic/statisticday/statisticday.component";
import {StatisticeventComponent} from "./index/statistic/statisticevent/statisticevent.component";
import {AddHistoryComponent} from "./index/history/add-history/add-history.component";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    IndexComponent,
    CounterComponent,
    HistoryComponent,
    StatisticComponent,
    NotyficationComponent,
    WeekhistoryComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        RemoveObjectComponent,
        OptionsComponent,
        StatisticdayComponent,
        StatisticeventComponent,
        AddHistoryComponent
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
