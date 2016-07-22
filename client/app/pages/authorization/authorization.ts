import {Component} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';
import {NavController} from 'ionic-angular';
import * as Relution from 'relution-sdk';

@Component({
  templateUrl: 'build/pages/authorization/authorization.html'
})
export class AuthorizationPage {
  public authorization: Relution.security.Authorization;
  constructor(private navCtrl: NavController) {
    this.authorization = Relution.security.getCurrentAuthorization();
    console.log(JSON.stringify(this.authorization, null, 2));
  }
}
