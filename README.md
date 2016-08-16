#Relution Login Sample
The following dependencies are needed:
- [node >= 4.4](https://nodejs.org/en/)
- [typescript](http://www.typescriptlang.org/)
- [ionic-cli](http://ionicframework.com/docs/v2/getting-started/installation/)
- [relution-cli](https://github.com/relution-io/relution-cli)

###1. Create a new Project

Create an empty folder on your terminal:
```bash
>: mkdir relution-sample-auth
```

now change to your folder and create a empty project following this instruction [Guide]().

> Notice you have to deploy your project into the Relution server.

Checkout Step 1:
```bash
git checkout -f step-1
```
###2. Create a Client App
If you have installed the 'ionic-cli' then you can generate a client app with the following command: 

```bash
> relution-sample-auth: ionic start client --v2 --ts
```
Now we have to change the relution configuration. Please open the 'relution.hjson' from your root folder and change the client part from 'www' into 'client/www'.

Also add some rules in your '.relutionignore' file:

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
now change into the 'client' folder and start the client app
```bash
> relution-sample-auth: cd client
> relution-sample-auth/client: ionic serve
```
the ouput looks something like this :
```bash
[14:26:23] Starting 'clean'...
[14:26:23] Finished 'clean' after 10 ms
[14:26:23] Starting 'watch'...
[14:26:23] Starting 'sass'...

√ Running dev server:  http://localhost:8100
````
open your default browser with http://localhost:8100' and you can see your app.

Checkout Step 2:
```bash
git checkout -f step-2
```

###3. Getting your Relution-SDK

Please install the Relution-SDK over npm with the following command
```bash
> relution-sample-auth/client: npm i -S https://github.com/relution-io/relution-sdk
```

Now open the file ``` client/app/app.ts ```, it looks like this:

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

First we have to import the Relution package with one line of code:
```javascript
import * as Relution from 'relution-sdk';
```
after then we have to 'init' the Relution-SDK so add following line of code in to your constructor from the 'MyApp' Component:
```javascript
Relution.init({
  serverUrl: '{{YOUR_SERVER_URL}}',
  application: '{{YOUR_APPLICATION_NAME}}'
})
.then((info) => {
  console.log('Relution is ready');
});
```
You have only to add the host from your Relution server on the server URL and the application name.

> If you don`t no where you get the application name this information is available in the 'relution.hjson' from your root folder

At the end, your 'app.ts' looks like this:
```javascript
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

```
and if the init is successfully the browser console print out 'Relution is ready'.

Step 3 is available:
```bash
git checkout -f step-3
```

### 4. Login

We need an component for the login, we can generate it with the 'ionic-cli':

```bash
> relution-sample-auth/client:  ionic g page login
√ Create app/pages/login/login.html
√ Create app/pages/login/login.scss
√ Create app/pages/login/login.ts

Don't forget to add an import for login.scss in app/themes/app.core.scss:

  @import "../pages/login/login.scss";
```
Now we have to change the start entry point of our app in the 'client/app/app.ts', change the 'rootPage':

```javascript
import {LoginPage} from './pages/login/login';


@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>'
})
export class MyApp {

  private rootPage: any;

  constructor(private platform: Platform) {
    this.rootPage = LoginPage;
   ...

ionicBootstrap(MyApp);
```
Next, let us check our LoginPage open 'app/pages/login/login.ts' in your IDE and add the credentials object:

```javascript
import * as Relution from 'relution-sdk';
export class LoginPage {
	public credentials = {userName: '', password: ''}
	constructor(private nav: NavController) {}
    ...
```
and add the following html into ```'<ion-content>'``` on the file 'app/pages/login/login.html'

```html
<ion-list>
    <form>
      <ion-item>
        <ion-label fixed>Username</ion-label>
        <ion-input type="text" [(ngModel)]="credentials.userName" required></ion-input>
      </ion-item>
      <ion-item>
        <ion-label fixed>Password</ion-label>
        <ion-input type="password" [(ngModel)]="credentials.password" required></ion-input>
      </ion-item>
      <button type="submit" fab fab-right on-click="onSubmit()">
        <ion-icon ios="ios-checkmark-circle-outline" md="md-checkmark-circle-outline"></ion-icon>
      </button>
    </form>
</ion-list>
```

The result will show the LoginPage with the credentials form. Ok now we can login the user on the Relution server for this we will need a new method i called it 'onSubmit':

```javascript
onSubmit() {
    console.log(this.credentials);
    Relution.web.login(
      {
        userName: this.credentials.userName,
        password: this.credentials.password
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

Now when you clicked on the login button you are still logged in.
Full code example from the LoginPage:

```javascript
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
    return Relution.web.login(
      {
        userName: this.credentials.userName,
        password: this.credentials.password
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

```

Checkout Step 4:
```bash
git checkout -f step-4
```

### 5. Check the Response

After the successfully Login we have some Options to get the Information. Available are User, Organization and Authorization Informations.

####User:
```javascript
const user:Relution.security.User = Relution.security.getCurrentUser();
```
returns the following json:
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
If want read more about security & roles you find it[here](https://relution-io.github.io/relution-sdk/interfaces/_security_roles_.user.html).

####Organization:
```javascript
const orga:Relution.security.Organization = Relution.security.getCurrentOrganization();
```
return the following json Object:
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
[read more](https://relution-io.github.io/relution-sdk/interfaces/_security_roles_.organization.html).

####Authorization:

```javascript
const authorization:Relution.security.Authorization = Relution.security.getCurrentAuthorization();
```
return something like this:
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
[read more](https://relution-io.github.io/relution-sdk/interfaces/_security_auth_.authorization.html).

#### Components (Pages)
Check the components from 'client/app/pages' folder:
```javascript
// app/pages/user/user.ts
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
    console.log(JSON.stringify(this.user, null, 2));
  }
}

// app/pages/organization/organization.ts
import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import * as Relution from 'relution-sdk';

@Component({
  templateUrl: 'build/pages/organization/organization.html'
})
export class OrganizationPage {
  public organization: Relution.security.Organization;
  constructor(private navCtrl: NavController) {
    this.organization = Relution.security.getCurrentOrganization();
    console.log(JSON.stringify(this.organization, null, 2));
  }
}

// app/pages/authorization/authorization.ts
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

```
Checkout Step 5:
```bash
git checkout -f step-5
```

###6. Logout
To logout the user following method is available:

```javascript
Relution.web.logout()
.then(() => {
	console.log('iam logged out');
});
```

example from 'client/app/pages/user/user.ts'

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
    // logged the user out
    Relution.web.logout()
    .then(() => {
    	// go back to the loginpage
      this.navCtrl.setRoot(LoginPage).then(() => {
        loading.dismiss();
      });
    })
    .catch((e: Relution.web.HttpError) => {
      // not logged out
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
for usage add a button on file 'client/app/pages/user/user.html':

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

If the logout is successfully the code move the nav state to the method 'LoginPage'. On error it will shown you an alert message with the error stack.

