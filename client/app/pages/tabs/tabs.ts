import {Component} from '@angular/core';
import {UserPage} from '../user/user';
import {OrganizationPage} from '../organization/organization';
import {AuthorizationPage} from '../authorization/authorization';

@Component({
  templateUrl: 'build/pages/tabs/tabs.html'
})
export class TabsPage {

  private tab1Root: any;
  private tab2Root: any;
  private tab3Root: any;

  constructor() {
    this.tab1Root = UserPage;
    this.tab2Root = OrganizationPage;
    this.tab3Root = AuthorizationPage;
  }
}
