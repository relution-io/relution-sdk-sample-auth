import {Component, Input} from '@angular/core';
import {NavController, Loading, Alert} from 'ionic-angular';
import { NgForm }    from '@angular/common';
import {TabsPage} from './../tabs/tabs';
import * as Relution from 'relution-sdk';

@Component({
  templateUrl: 'build/pages/login/login.html'
})
export class LoginPage {
  public credentials = {userName: '', password: ''};
  constructor(private nav: NavController) {}

  onSubmit() {
    const loading = Loading.create({
      content: 'Please wait ...'
    });
    this.nav.present(loading);
    // login on  the Relution server
    return Relution.web.login(
      {
        userName: this.credentials.userName,
        password: this.credentials.password
      },
      {
        offlineCapable: true // there are more options available checkout : https://relution-io.github.io/relution-sdk/interfaces/_core_init_.initoptions.html
      }
    )
    .then((resp) => {
      // go to the tab page
      this.nav.rootNav.setRoot(TabsPage).then(() => {
        loading.dismiss();
      });
    })
    .catch((e: Relution.web.HttpError) => { // checkout https://relution-io.github.io/relution-sdk/interfaces/_web_http_.httperror.html
      // error occured
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
