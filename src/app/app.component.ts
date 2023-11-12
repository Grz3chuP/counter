import {Component, OnInit} from '@angular/core';
import {MainService} from "./main.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'counter';
  user: any = undefined;

  constructor(private serwis: MainService) {
  }

  ngOnInit(): void {
    this.odpalLogin();
  }


  private odpalLogin() {
          this.serwis.checkLogin()
            .subscribe({
              next: (d: any) => {
                console.log(d);
                this.user = d.user;
              },
              error: (d: any) => {
                console.error(d);
                if (this.serwis.checkIfUnauthenticatedAndRedirectIfSo(d)) return;
              }
            });

          this.serwis.refreshCsrfToken()
            .subscribe({
              next: (d: any) => {
                console.log(d);
              },
              error: (d: any) => {
                console.error(d);
              }
            });

  }
}
