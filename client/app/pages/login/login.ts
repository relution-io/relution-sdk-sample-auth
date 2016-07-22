import {Component, Input} from '@angular/core';
import {NavController, Loading, Alert} from 'ionic-angular';
import { NgForm }    from '@angular/common';
import {TabsPage} from './../tabs/tabs';
import {Observable} from 'rxjs/Rx';
import * as Relution from 'relution-sdk';

class LoginModel implements Relution.security.Credentials {
  constructor(public userName = '', public password = '') { }
}

@Component({
  templateUrl: 'build/pages/login/login.html'
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
    const loading = Loading.create({
      content: 'Please wait ...'
    });
    this.nav.present(loading);
    return Relution.web.login(
      {
        userName: this.model.userName,
        password: this.model.password
      },
      {
        offlineCapable: true
      }
    )
    .then((resp) => {
      this.nav.rootNav.setRoot(TabsPage).then(() => {
        loading.dismiss();
      });
    })
    .catch((e: Relution.web.HttpError) => {
      loading.dismiss();
      let alert = Alert.create({
        title: `${e.name} ${e.statusCode}`,
        subTitle: e.message,
        buttons: ['OK']
      });
      this.nav.present(alert);
    });
  }
}
