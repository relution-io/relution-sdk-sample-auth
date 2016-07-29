import {Component} from '@angular/core';
import {Platform, ionicBootstrap} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {LoginPage} from './pages/login/login';
import * as Relution from 'relution-sdk';

@Component({
  template: '<ion-nav [root]="rootPage" relutiongray></ion-nav>'
})
export class MyApp {

  private rootPage: any;

  constructor(private platform: Platform) {
    this.rootPage = LoginPage;

    // initialized the Relution SDK
    Relution.init({
      serverUrl: 'https://pbrewing.mwaysolutions.com',
      application: 'sampleAuth'
    })
    .then((info) => {
      console.log('Relution is ready');
    });

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }
}

ionicBootstrap(MyApp);
