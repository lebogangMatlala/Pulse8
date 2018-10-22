import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { ProfilePage } from '../profile/profile';
import firebase from 'firebase';

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
export class ViewBookingPage{
  bookings;
  fanName;
  fanEmail;
  fanPic;
  fanMsg;
  fanDate;
  fanTime;
  id;
  key;
  city;

  constructor(public navCtrl: NavController, public navParams: NavParams, private view: ViewController) {
  
  }

  

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewBookingPage');

    this.bookings = this.navParams.get('bookingDetails');
   console.log(this.bookings);

   this.fanName=this.bookings.fanName;
   this.fanEmail=this.bookings.fanEmail;
   this.fanPic=this.bookings.picture;
  this.fanMsg=this.bookings.fanMsg;
  this.fanDate=this.bookings.fanDate;
  this.fanTime=this.bookings.fanTime;
  this.id=this.bookings.id;
  this.key=this.bookings.key;
  this.city = this.bookings.city;


   console.log(this.city);



  }

  back(){
    this.view.dismiss();
  }


}
