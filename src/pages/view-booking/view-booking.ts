import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the ViewBookingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-view-booking',
  templateUrl: 'view-booking.html',
})
export class ViewBookingPage implements OnInit{
  stuff;
  constructor(public navCtrl: NavController, public navParams: NavParams, private view: ViewController) {
  }

  ngOnInit(){
    this.stuff = this.navParams.get('stuff');
    console.log(this.stuff);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewBookingPage');
  }

  back(){
    this.view.dismiss();
  }
}
