import {Component} from '@angular/core';
import {NavController, Loading, Alert} from 'ionic-angular';
import * as Relution from 'relution-sdk';
import {LoginPage} from './../login/login';

@Component({
  templateUrl: 'build/pages/user/user.html'
})
export class UserPage {
  public user: Relution.security.User;

  constructor(private navCtrl: NavController ) {
    this.user = Relution.security.getCurrentUser();
  }

  logout() {
    const loading = Loading.create({
      content: 'Please wait ...'
    });
    this.navCtrl.present(loading);
    Relution.web.logout()
    .then(() => {
      this.navCtrl.setRoot(LoginPage).then(() => {
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
      this.navCtrl.present(alert);
    });
  }
}
