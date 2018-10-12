import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, ToastController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { DatabaseProvider } from '../../providers/database/database';
import firebase from "firebase";
import { NgForm } from '../../../node_modules/@angular/forms';
import { BookingsPage } from '../bookings/bookings';
import { RegisterPage } from '../register/register';
import { CatergoriesPage } from '../catergories/catergories';
/**
 * Generated class for the SigninPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {

  email;
  password;
  userID;
  key;
  djKey;
  


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    private db: DatabaseProvider,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController
  ) {

    this.djKey=this.navParams.get("objBooking");
    console.log(this.userID);
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad SignIn");

  }

  login(form: NgForm) {


      const loading = this.loadingCtrl.create({
      content: `Logging in ${form.value.email}...`
    });
    loading.present();
    this.db
      .login(form.value.email, form.value.password)
      .then(data => {
        let userID = firebase.auth().currentUser.uid;
        loading.dismiss();
     
        let djKey=this.key;

        if(userID == this.djKey){
          const toast = this.toastCtrl.create({
            message: 'You cannot Request Booking for yourself',
            duration: 3000
          });
          toast.present();
          this.navCtrl.push(CatergoriesPage);
  
  
        }else{
          let djKey=this.key;
          this.navCtrl.push(BookingsPage,{objBooking:this.djKey});
        }
            
          
      })
      .catch(error => {
        loading.dismiss();
        const alert = this.alertCtrl.create({
          title: "Caution",
          subTitle: error.message,
          buttons: [
            {
              text: "Ok",
              handler: () => {
              }
            }
          ]
        });
        alert.present();
      });
   
    

    
   
  }

  resetPassword() {
    const prompt = this.alertCtrl.create({
      title: "Reset Password",
      message: "Enter your email to reset your password",
      inputs: [
        {
          name: "email",
          placeholder: "Example@gmail.com"
        }
      ],
      buttons: [
        {
          text: "Cancel",
          handler: data => {
            console.log("Cancel clicked");
          
            this.navCtrl.setRoot(LoginPage);
          }
        },
        {
          text: "Save",
          handler: data => {
            this.db.resetPassword(data.email).then(
              () => {
                const alert = this.alertCtrl.create({
                  title: "Caution",
                  message: "your request is been proccessed check your email ",
                  buttons: ["OK"]
                });
                alert.present();
              },
              error => {
                const alert = this.alertCtrl.create({
                  title: "Caution",
                  message: error.message,
                  buttons: ["OK"]
                });
                alert.present();
              }
            );
            console.log("Saved clicked");
          }
        }
      ]
    });
    prompt.present();
  }

  signup() {
    this.navCtrl.setRoot(RegisterPage);
  }
}
