import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import * as Relution from 'relution-sdk';

@Component({
  templateUrl: 'build/pages/user/user.html'
})
export class UserPage {
  public user: Relution.security.User;
  constructor(private navCtrl: NavController ) {
    this.user = Relution.security.getCurrentUser();
    console.log(JSON.stringify(this.user, null, 2));
  }
}
