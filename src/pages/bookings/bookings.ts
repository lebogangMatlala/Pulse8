import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase';
import { DatabaseProvider } from '../../providers/database/database';
/**
 * Generated class for the BookingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-bookings',
  templateUrl: 'bookings.html',
})
export class BookingsPage {

  djKey;

  name;
  email;


  djName;
  djEmail;
  djBio;
  djGenre;
  djStagename;

  massage;

  constructor(public navCtrl: NavController, public navParams: NavParams,public db:DatabaseProvider) {
    this.djKey=this.navParams.get("objBooking");
    console.log(this.djKey);
  }

  ionViewDidLoad() {

    console.log('ionViewDidLoad BookingsPage');


 firebase.auth().onAuthStateChanged((user)=> {
      if (user) {
        console.log("User has signed in");
        let userKey=firebase.auth().currentUser.uid;
        console.log(userKey);
        
        firebase.database().ref('Registration/' +userKey).on('value', (data: any) => {
 
          let userDetails = data.val();
          console.log(userDetails);

          if(userDetails!= null && userDetails!="")
          {
            this.name=userDetails.fullname;
            this.email=userDetails.email;
          }
          else{
            console.log("user not found")
          }

     
        });

        
      }
      else{
        console.log("User has signed out");
      }
    });

   //massage for the dj

   this.massage="I would like to book you for an event.Please respond to my email";
    
    ///Djs details
    firebase.database().ref('Registration/' +this.djKey).on('value', (data: any) => {
 
      let djDetails = data.val();
      console.log(djDetails);

      if(djDetails!=null && djDetails!="")
      {

        this.djName=djDetails.fullname;
        this.djEmail=djDetails.email;
        this.djStagename=djDetails.stagename;
        this.djBio = djDetails.bio;
      }else{
        console.log("User has signed out");

      }
 
    });

    } 
    
}
