import {Component, OnInit} from '@angular/core';
import {database} from "../../wailsjs/go/models";
import {GetAccounts} from "../../wailsjs/go/main/App";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'polar';

  accounts: database.Account[] = [];

  ngOnInit(): void {
    this.fetchAccounts();
  }

  fetchAccounts(): void {
    GetAccounts()
      .then((result: database.Account[]) => {
        console.log("Accounts from SQLite:", result);
        this.accounts = result;
      })
      .catch((error) => {
      console.error("Failed to fetch accounts from Go:", error);
    });
  }
}
