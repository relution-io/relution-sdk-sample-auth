#Relution Login Sample
Abhängigkeiten um dieses Tutorial nachzubauen
- [node >= 4.4](https://nodejs.org/en/)
- [typescript](http://www.typescriptlang.org/)
- [ionic-cli](http://ionicframework.com/docs/v2/getting-started/installation/)
- [relution-cli](https://github.com/relution-io/relution-cli)




### 1. Neues Projekt anlegen
Zuerst erstellen wir einen leeren Ordner, am besten über das Terminal.

```bash
>: mkdir relution-sample-auth
```
Nun wechseln wir in den gerade  erstellten Ordner und legen ein neues Projekt an. 
Weitere Information sind im Developer Guide 1.1. verfügbar.

> Es ist zu beachten, dass das Projekt auf einem Relution Server zu veröffentlichen ist.

Schritt 1 ist erreichbar unter:
```bash
git checkout -f step-1
```
### 2. Client anlegen

Wenn die 'ionic-cli' erfolgreich installiert ist, kann nun die App angelegt werden.

```bash
> relution-sample-auth: ionic start client --v2 --ts
```

Nun muss das erstellte Relution Projekt angepasst werden, da nun nicht mehr der 'www' Ordner sondern der Ordner 'client/www' veröffentlicht werden soll.

Hierzu tragen wir als erstes folgendes in die Datei ```.relutionignore``` ein, um die nachstehenden Dateien für den Bauprozess auszugrenzen:
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
Nun wechseln wir in den 'Client' Ordner und starten testweise das Projekt:

```bash
> relution-sample-auth: cd client
> relution-sample-auth/client: ionic serve
```
Die Ausgabe sollte wie folgt aussehen:
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

und den Standard-Browser des Betriebssystems öffnen. Die Ionic Start App enthält nun ein Tab Layout.
Das Ergebnis veröffentlichen wir auf dem Relution Server unter folgender Url:

```html
https://{YOUR_SERVER}/{YOUR_USER_ORGANIZATION}/{YOUR_APP_NAME}
```

Schritt 2 ist erreichbar unter:
```bash
git checkout -f step-2
```

### 3. Relution SDK installieren / initialisieren

Als nächstes installieren wir das Relution SDK über npm mit folgendem Befehl:

```bash 
> relution-sample-auth/client: npm i -S https://github.com/relution-io/relution-sdk
```

Wir öffnen nun in unserem Code Editor die Datei ``` client/app/app.ts ``` , 

die folgendermaßen aussehen sollte:
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
Nun müssen wir erst einmal die Relution Klassen initialisieren, hierzu müssen wir das Relution-SDK Paket importieren.

```javascript
import * as Relution from 'relution-sdk';
```

Fügen Sie in Ihrem Konstruktor der Klasse 'MyApp' die Methode Relution.init hinzu.
```javascript
Relution.init({
  serverUrl: '{{YOUR_SERVER_URL}}',
  application: '{{YOUR_APPLICATION_NAME}}'
})
.then((info) => {
  console.log('Relution is ready');
});
```
Die Server Url entspricht dem Aufruf für den Relution Server ohne Organisation und ohne Applikationsnamen. 

Den Applikationsnamen finden wir in der relution.hjson im sogenannten 'Root' Verzeichnis.

Die Datei app.ts sollte nun folgendermaßen aussehen: 
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
In der Browser Konsole sollte eine Ausgabe 
```Relution is ready```
erscheinen, sowie eine Information über den genutzten Browser.

Schritt 3 ist erreichbar unter:
```bash
git checkout -f step-3
```

### 4. Login
Für den Login benötigen wir eine Komponente. Diese können wir mit der 'ionic-cli' generieren:
```bash
> relution-sample-auth/client:  ionic g page login
√ Create app/pages/login/login.html
√ Create app/pages/login/login.scss
√ Create app/pages/login/login.ts

Don't forget to add an import for login.scss in app/themes/app.core.scss:

  @import "../pages/login/login.scss";
```
Um die Login-Seite aufrufen zu können, importieren wir die Seite in die Datei 'app.ts' und legen diese als 'rootPage' fest:
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

Ok, nun öffnen wir die Datei 'app/pages/login/login.ts'
und erstellen eine Klasse mit dem Namen 'LoginModel'
```javascript
import * as Relution from 'relution-sdk';
class LoginModel implements Relution.security.Credentials {
  constructor(public userName = '', public password = '') { }
}
```

und fügen diese der LoginPage hinzu:

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
Jetzt haben wir ein LoginModel mit dem wir uns ein Formular erstellen können. Also öffnen wir die Datei 'login.html'  und fügen folgenden HTML der Datei ``` <ion-content> ``` hinzu:
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
Als Ergebnis sollten Sie nun ein Formular sehen das zwei Eingabefelder besitzt. Eines für den Benutzernamen und eines für das Passwort. Nun müssen die Daten noch an den Relution Server weitergeleitet werden. Hierfür ergänzen wir mit einer Methode 'onSubmit' die Datei 'LoginPage':

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
Nun können wir das Formular ausfüllen und an den Relution Server weiterleiten.
Hier die volllständige Implementierung der Klasse 'Loginpage':
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
Schritt 4 ist erreichbar unter:
```bash
git checkout -f step-4
```

### 5. Antwort (Response) verarbeiten
Nach dem erfolgreichen Login existieren mehrere Optionen um an die Benutzerdaten zu kommen.
Es gibt Benutzer (User), Organisation (Organization) und Autorisierung (Authorization).

####User:
```javascript
const user:Relution.security.User = Relution.security.getCurrentUser();
```
gibt die Benutzernformation zurück
```json
{
  "type": "USER",
  "uuid": "5AB2ED9F-CEB1-42B2-8688-03E144F89608",
  "version": 11461,
  "aclEntries": [
    "2A5E21AF-9175-4605-9916-B8CA89833E1C:rw",
    "user.anonymous:r"
  ],
  "name": "pascal",
  "salutation": "mr",
  "givenName": "Pascal",
  "surname": "Brewing",
  "organizationUuid": "DB461B98-4143-4509-B662-1417C1793F38",
  "email": "p.brewing@mwaysolutions.com",
  "lastLoggedTime": "2016-07-22T09:32:03.747Z",
  "passwordExpires": "2017-04-14T09:07:41.000Z",
  "locked": false,
  "activated": true,
  "effectivePermissions": "*",
  "sysRoles": [],
  "roles": [
    "5BD9D9F4-A56C-4417-8760-C167941D4389",
    "2A5E21AF-9175-4605-9916-B8CA89833E1C"
  ],
  "readonly": false,
  "rolesObjects": [
    {
      "uuid": "2A5E21AF-9175-4605-9916-B8CA89833E1C",
      "type": "GROUP",
      "name": "MWAY",
      "groupType": "GROUP",
      "systemPermission": false
    },
    {
      "uuid": "5BD9D9F4-A56C-4417-8760-C167941D4389",
      "type": "GROUP",
      "name": "DEVELOPERS",
      "groupType": "SYSTEM_GROUP",
      "systemPermission": false
    }
  ]
}
```

####Organization:
```javascript
const orga:Relution.security.Organization = Relution.security.getCurrentOrganization();
```
und stellt folgende Informationen bereit:
```json
{
  "uuid": "DB461B98-4143-4509-B662-1417C1793F38",
  "aclEntries": [
    "2A5E21AF-9175-4605-9916-B8CA89833E1C:rw"
  ],
  "name": "mway",
  "uniqueName": "mway",
  "billingSettings": {
    "currency": "EUR"
  },
  "passwordPolicy": {
    "allowSimplePassword": false,
    "minimumPasswordLength": 8,
    "minimumNumbersOfLowerCaseLetters": 0,
    "minimumNumbersOfUpperCaseLetters": 0,
    "minimumNumbersOfDigits": 0,
    "requiredNumbersOfSymbols": 0,
    "maximumPasswordAge": 0
  },
  "assetPath": "/organizations/mway",
  "reportLocaleString": "en_US",
  "version": 2,
  "effectivePermissions": "*",
  "createdDate": "2015-10-27T12:59:30.000Z",
  "modifiedDate": "2015-10-27T12:59:34.000Z",
  "propertyMap": {},
  "createdUser": "052DE9AB-D770-4D37-AA46-9A31F0E0D8D1",
  "modifiedUser": "052DE9AB-D770-4D37-AA46-9A31F0E0D8D1",
  "licenseOrganizationUuid": "E54E3DB5-49C0-4E6E-A510-97A1448CE65C",
  "licenseModelUuid": "30E5CBB0-31EB-11E5-A2CB-0800200C9A66",
  "licenseModelName": "Enterprise",
  "licenseSignature": "MC0CFQCVw/ZYwRBdGdv9N2tR5tvAsAMz7QIUNXaLffW/9rBpHuaa1wa3lhPpcgE=",
  "licenseHandshakeDate": 1469109517000,
  "defaultRoles": [
    "2A5E21AF-9175-4605-9916-B8CA89833E1C"
  ]
}
```

####Authorization:

```javascript
const authorization:Relution.security.Authorization = Relution.security.getCurrentAuthorization();
```
und stellt folgende Daten zu Verfügung:
```json
{
  "name": "5AB2ED9F-CEB1-42B2-8688-03E144F89608",
  "roles": [
   "APPLICATION_CREATOR",
    "APPLICATION_EDITOR",
    "APPLICATION_USER",
    ...
  ]
}
```
Schritt 5 ist erreichbar unter:
```bash
git checkout -f step-5
```
###6. Logout

Um den Benutzer wieder abzumelden ist folgende Methode verfügbar:
```javascript
Relution.web.logout()
.then(() => {
	console.log('iam logged out');
});
```
Hinweis: der Rückgabewert dieser Methode ist ein Promise

Hier ein Beispiel in der Benutzerseite:
```javascript
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
```
```html
<ion-header>
  <ion-navbar>
    <ion-title>User</ion-title>
    <ion-buttons end>
      <button (click)="logout()">
        <ion-icon name="log-out" light></ion-icon>
      </button>
    </ion-buttons>
  </ion-navbar>
</ion-header>
```













