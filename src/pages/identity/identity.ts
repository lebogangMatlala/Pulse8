import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { RegisterPage } from '../register/register';

/**
 * Generated class for the IdentityPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-identity',
  templateUrl: 'identity.html',
})
export class IdentityPage {

  role: string;

  constructor(private navCtrl: NavController, private alertCtrl: AlertController) {

  }

  checkRole(role: string) {
    this.role = role;
  }

  nextPage() {

    if (this.role == 'Dj') {
      this.navCtrl.push(RegisterPage, { role: this.role });
    } else if (this.role == 'Audience') {
      this.navCtrl.push(RegisterPage, { role: this.role });
    }

  }
}
