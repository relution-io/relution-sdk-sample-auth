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
