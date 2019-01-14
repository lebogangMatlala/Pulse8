import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';
import firebase from "firebase";
import { NgForm } from "@angular/forms";
import { CatergoriesPage } from '../catergories/catergories';
import { RegisterPage } from '../register/register';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  email;
  password;
  userID;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    private db: DatabaseProvider,
    public loadingCtrl: LoadingController
  ) {

    this.userID=this.navParams.get("objBooking");
    console.log(this.userID);
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad LoginPage");

    
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
     
                this.navCtrl.setRoot(CatergoriesPage);
          
      })
      .catch(error => {
        loading.dismiss();
        const alert = this.alertCtrl.create({
          title: 'Caution',
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
      title: "Reser Password",
      message: "Enter your email to reset your password",
      cssClass: '.background',
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
           
            this.navCtrl.push(LoginPage);
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
    this.navCtrl.push(RegisterPage);
  }
}
