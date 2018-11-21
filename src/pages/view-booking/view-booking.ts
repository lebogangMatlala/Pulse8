import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { ChatroomPage } from '../chatroom/chatroom';

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
  usersKey;

  constructor(public navCtrl: NavController, public navParams: NavParams, private view: ViewController) {
  
  }

  

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewBookingPage');

    this.bookings = this.navParams.get('bookingDetails');
   console.log(this.bookings);

   this.fanName=this.bookings.fanName;
   this.fanEmail=this.bookings.fanEmail;
   this.fanPic=this.bookings.picture;
  // this.fanMsg=this.bookings.fanMsg;
  this.fanDate=this.bookings.fanDate;
  this.fanTime=this.bookings.fanTime;
  this.id=this.bookings.id;
  this.key=this.bookings.key;
  this.city = this.bookings.city;
  this.usersKey=this.bookings.userskey;
  this.fanMsg="Would like to chat with you, please respond";

  console.log("users key ")
   console.log(this.usersKey);



  }

  back(){
    this.view.dismiss();
  }

  chatroom(){
      console.log(this.usersKey);

     this.navCtrl.push(ChatroomPage,{theuserkey:this.usersKey})
      
  }


}
