#Relution Login Sample
Abhängigkeiten um dieses Tutorial nachzubauen
- [node >= 4.4](https://nodejs.org/en/)
- [typescript](http://www.typescriptlang.org/)
- [relution-cli](https://github.com/relution-io/relution-cli)




### 1. Neues Projekt anlegen
Erstellen Sie einen leeren Ordner am besten über den Terminal.

```bash
>: mkdir relution-sample-auth
```
nun wechseln Sie in den von Ihnen ertellten Ordner un legen Sie ein neues Projekt an. Weitere Information hierzu finden Sie im Develoepr Guide 1.1.

> Beachten Sie das Sie Ihre Applikation auf Ihren Relution Server veröffentlichen müssen.

### 2. Client anlegen

Wenn Sie die ionic cli erfolgreich installiert haben können Sie nun Ihre Client App anlegen.

```bash
> relution-sample-auth: ionic start client --v2 --ts
```

Nun müssen Sie Ihr Relution Projekt um Konfigurieren da nun nicht mehr Ihr www Ordner sondern der Ordner client/www veröffentlicht werden soll.

Hierzu tragen Sie als ersten folgendes in die Datei ```.relutionignore``` ein unm diese dateien auszugrenzen:
```json
    /client/node_modules
    /client/app
    /client/hooks
    /client/platforms
    /client/plugins
    /client/resources
    /client/typings
    /client/.gitignore
    /client/.*
    /client/*.*
    /client/config.xml
```
wechseln Sie nun in den client Ordner und starten Sie testweise das Projekt

```bash
> relution-sample-auth: cd client
> relution-sample-auth/client: ionic serve
```
Die Ausgabe sollte folgendem entsprechen:
```bash
[14:26:23] Starting 'clean'...
[14:26:23] Finished 'clean' after 10 ms
[14:26:23] Starting 'watch'...
[14:26:23] Starting 'sass'...
[14:26:23] Starting 'html'...
[14:26:23] Starting 'fonts'...
[14:26:23] Starting 'scripts'...
[14:26:24] Finished 'html' after 191 ms
[14:26:24] Finished 'scripts' after 192 ms
[14:26:24] Finished 'fonts' after 201 ms
[14:26:25] Finished 'sass' after 1.38 s
8.3 MB bytes written (5.79 seconds)
[14:26:34] Finished 'watch' after 11 s
[14:26:34] Starting 'serve:before'...
[14:26:34] Finished 'serve:before' after 14 μs

Running live reload server: http://localhost:35729
Watching: www/**/*, !www/lib/**/*
√ Running dev server:  http://localhost:8100
Ionic server commands, enter:
  restart or r to restart the client app from the root
  goto or g and a url to have the app navigate to the given url
  consolelogs or c to enable/disable console log output
  serverlogs or s to enable/disable server log output
  quit or q to shutdown the server and exit

ionic $ 
````

und Ihnen den Standardbrowsers Ihres Betriebssystems öffnen mit der ionic starter Tabs app. Jetzt können Sie die App wieder auf Ihren Relution Server veröffentlichen und diese sollte unter folgender Url 

```html
https://{YOUR_SERVER}/{YOUR_USER_ORGANIZATION}/{YOUR_APP_NAME}
```
erreichbar sein.

### 3. Relution SDK installieren / initialisieren

Installieren Sie nun das Relution SDK über npm mit folgenden Befehl

```bash 
> relution-sample-auth/client: npm i -S https://github.com/relution-io/relution-sdk
```

Öffnen Sie nun in Ihrem Code Editor die Datei ``` client/app/app.ts ````

Die folgender maßen aussehen sollte:
```javascript
import {Component} from '@angular/core';
import {Platform, ionicBootstrap} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {TabsPage} from './pages/tabs/tabs';


@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>'
})
export class MyApp {

  private rootPage: any;

  constructor(private platform: Platform) {
    this.rootPage = TabsPage;

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }
}

ionicBootstrap(MyApp);
```

Nun müssen wir erst einmal Relution initialisieren, hierzu mmüssen wir das SDK packtet ersteinmal importieren.

```javascript
import * as Relution from 'relution-sdk';
```

Fügen Sie in Ihrem constructor der Class MyApp das Relution init hinzu.
```javascript
Relution.init({
  serverUrl: '{{YOUR_SERVER_URL}}',
  application: '{{YOUR_APPLICATION_NAME}}'
})
.then((info) => {
  console.log('Relution is ready');
});
```
Die Server Url ist die von Ihrem Relution Server ohn Organisation und ohne Applikation Namen. Ihren App namem finden Sie in der relution.hjson in Ihrem Root verzeichnis.
Die app.ts sollte nun folgender masen aussehen: 
```javascript
import {Component} from '@angular/core';
import {Platform, ionicBootstrap} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {TabsPage} from './pages/tabs/tabs';
import * as Relution from 'relution-sdk';

@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>'
})
export class MyApp {

  private rootPage: any;

  constructor(private platform: Platform) {
    this.rootPage = TabsPage;
    Relution.init({
      serverUrl: 'http://pbrewing.mwaysolutions.com:8080',
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
```
In Ihrer Browser Console sollte ein log mit
```Relution is ready```
erscheinen auserdem eine Device Information wo Sie Inhalt über Ihr aktuelles Device was in dem fall der Browser ist.

### 4. Login
Für den Login benötigen Sie eine Component dies können Sie mit der ionic-cli generieren:
```bash
> relution-sample-auth/client:  ionic g page login
√ Create app/pages/login/login.html
√ Create app/pages/login/login.scss
√ Create app/pages/login/login.ts

Don't forget to add an import for login.scss in app/themes/app.core.scss:

  @import "../pages/login/login.scss";
```
Um die LoginSeite als erstes aufrufen zu können importieren Sie die Seite in Ihre app.ts und legen Sie diese als rootPage fest:
```javascript
import {Component} from '@angular/core';
import {Platform, ionicBootstrap} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {LoginPage} from './pages/login/login';
import * as Relution from 'relution-sdk';

@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>'
})
export class MyApp {

  private rootPage: any;

  constructor(private platform: Platform) {
    this.rootPage = LoginPage;
    Relution.init({
      serverUrl: 'http://pbrewing.mwaysolutions.com',
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
```

Ok öffnen Sie nun die Datei app/pages/login/login.ts
und erstellen Sie Ihr LoginModel
```javascript
import * as Relution from 'relution-sdk';
class LoginModel implements Relution.security.Credentials {
  constructor(public userName = '', public password = '') { }
}
```

und fügen Sie es Ihrer LoginPage hinzu:

```javascript
@Component({
  templateUrl: 'build/pages/login/login.html',
})
export class LoginPage {
  private _model: LoginModel;

  constructor(private nav: NavController) {
    this._model = new LoginModel();
  }

  public get model(): LoginModel {
    return this._model;
  }

  public set model(v: LoginModel) {
    this._model = v;
  }
}
```
jetzt haben wir ein LoginModel mit dem wir uns ein Formular erstellen können. Also öffnen Sie die login.html Datei und fügen Sie folgendes html dem ``` <ion-content> ``` hinzu:
```html
<ion-list>
    <form>
      <ion-item>
        <ion-label fixed>Username</ion-label>
        <ion-input type="text" [(ngModel)]="model.userName" required></ion-input>
      </ion-item>
      <ion-item>
        <ion-label fixed>Password</ion-label>
        <ion-input type="password" [(ngModel)]="model.password" required></ion-input>
      </ion-item>
      <button type="submit" fab fab-right on-click="onSubmit()">
        <ion-icon ios="ios-checkmark-circle-outline" md="md-checkmark-circle-outline"></ion-icon>
      </button>
    </form>
</ion-list>
```
Als Ergebnis sollten Sie nun ein Formular sehen das zwei Inputfelder besitzt eins für den Usernamen eins für das Passwort. Nun müssen wie die Daten noch an den Relution Server weiterleiten für dies adden Sie eine onSubmit Methode Ihrer LoginPage hinzu:

```javascript
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
      console.log(resp); //server Response
    })
    .catch((e) => {
      console.error(e);
    });
  }
```
Nun können Sie das Formular ausfüllen und an den Relution Server weiterleiten.
und hier die komplette Loginpage:
```javascript
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
```








