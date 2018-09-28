import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { IdentityPage } from '../identity/identity';
import { CatergoriesPage } from '../catergories/catergories';

/**
 * Generated class for the StartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-start',
  templateUrl: 'start.html',
})
export class StartPage {

  file: string = '../../assets/Master_Cheng_Fu_-_Umcimbi_ft_Lelo_Kamau.mp3';
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  
  }

  nextPage() {
    this.navCtrl.push(CatergoriesPage);
  }

  register()
  {
    this.navCtrl.push(IdentityPage);
  }

  ionViewDidEnter() {


  }
}
