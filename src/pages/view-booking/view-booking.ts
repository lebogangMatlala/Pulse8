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
export class ViewBookingPage implements OnInit{
  bookings;
  fanName;
  fanEmail;
  fanPic;
  fanMsg;
  fanDate;
  fanTime;
  id;
  key;

  constructor(public navCtrl: NavController, public navParams: NavParams, private view: ViewController) {
  
  }

  ngOnInit(){

  // this.fanPic=this.bookingDetails.fanName;
  // this.fanMsg=this.bookingDetails.fanName;
  // this.fanDate=this.bookingDetails.fanName;
  // this.fanTime=this.bookingDetails.fanName;
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
  this.key=this.bookings.keyid;



   console.log(this.fanPic);



  }

  back(){
    this.view.dismiss();
  }

  delete()
 {
   firebase.database().ref('Bookings/' + this.id).child(this.key).remove().then(()=>{
     this.navCtrl.push(ProfilePage);
   });

 }
}
