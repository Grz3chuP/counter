import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {IndexComponent} from "./index/index.component";
import {CounterComponent} from "./index/counter/counter.component";
import {HistoryComponent} from "./index/history/history.component";
import {StatisticComponent} from "./index/statistic/statistic.component";

const routes: Routes = [
  { path: '', redirectTo: 'index/counter', pathMatch: 'full'},
  {path: 'index', component: IndexComponent, children: [
      { path: '', redirectTo: 'counter', pathMatch: 'full'},
      { path: 'counter', component: CounterComponent },
      { path: 'history', component: HistoryComponent },
      { path: 'statistic', component: StatisticComponent },
] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
