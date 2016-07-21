import {Component, Input} from '@angular/core';
import {NavController} from 'ionic-angular';
import { NgForm }    from '@angular/common';
import * as Relution from 'relution-sdk';

class LoginModel implements Relution.security.Credentials {
  constructor(public userName = '', public password = '') { }
}

/*
  Generated class for the LoginPage page.
  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/login/login.html',
})
export class LoginPage {
  private _model: LoginModel;

  constructor(private nav: NavController) {
    this.model = new LoginModel();
  }

  public get model(): LoginModel {
    return this._model;
  }

  public set model(v: LoginModel) {
    this._model = v;
  }

  onSubmit() {
    console.log(this.model);
    Relution.web.login(
      {
        userName: this.model.userName,
        password: this.model.password
      },
      {
        offlineCapable: true
      }
    )
    .then((resp) => {
      console.log(resp);
    })
    .catch((e) => {
      console.error(e);
    });
  }
}
