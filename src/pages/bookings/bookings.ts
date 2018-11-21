import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase';
import { DatabaseProvider } from '../../providers/database/database';
import { EmailComposer } from '@ionic-native/email-composer';
import { ToastController } from 'ionic-angular';
import { CatergoriesPage } from '../catergories/catergories';
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

condition;
  djName;
  djEmail;
  djBio;
  djGenre;
  djStagename;

  massage;
  userKey;

  constructor(public navCtrl: NavController, public navParams: NavParams,public db:DatabaseProvider,private emailComposer: EmailComposer,private toastCtrl: ToastController) {
    this.djKey=this.navParams.get("objBooking");
    console.log(this.djKey);
  }

  ionViewDidLoad() {

    console.log('ionViewDidLoad BookingsPage');


 firebase.auth().onAuthStateChanged((user)=> {
      if (user) {
        console.log("User has signed in");
        this.condition=true;
        let userKey=firebase.auth().currentUser.uid;
        console.log(userKey);
        
        firebase.database().ref('Registration/' +userKey).on('value', (data: any) => {
 
          let userDetails = data.val();
          console.log(userDetails);

          if(userDetails!= null && userDetails!="")
          {
            this.name=userDetails.fullname;
            this.email=userDetails.email;
            this.userKey=userKey;

          }
          else{
            console.log("user not found")
          }

     
        });

        
      }
      else{
        console.log("User has signed out");

        this.condition=true;
      }
    });

   //massage for the dj

   this.massage="I would like to book you for an event.Please respond to my chats as soon as possible.";
    
    ///Djs details
    firebase.database().ref('Registration/' + this.djKey).on('value', (data: any) => {
 
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


    console.log(this.condition);
    
    } 
    
    send(){

     
         
     /*  this.db.sendEmail().then((available: boolean) => {


       let email = {
         from:this.email,
         to:this.djEmail,
         attachments: [
        

         ],
         subject: 'Booking Request',
         body: this.massage,
         isHtml: true
       };
       this.emailComposer.open(email);



   });  */

   let dateObj = new Date
   let time = dateObj.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1")
   let date =dateObj.toDateString();
 
  this.db.createBookings(this.djKey).push({
    name: this.name,
    email:this.email,
    date:date,
    time:time,
    key:this.userKey
    

 
    }).then(()=>{

      this.db.createinbox(this.userKey).push({
        name: this.djName,
        email:this.djEmail,
        date:date,
        time:time,
        key:this.djKey
    

     
        })

        this.db.createchatroom(this.userKey).push({
          key:this.djKey
       
          })

      this.navCtrl.push(CatergoriesPage);

      const toast = this.toastCtrl.create({
        message: 'Please check your inbox',
        duration: 5000
      });
      toast.present();
   

    });
     
  
 
    console.log("booked")
    
  
    }
}
