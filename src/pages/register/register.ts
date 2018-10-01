import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { NgForm } from "@angular/forms";
import firebase from "firebase";
import { CatergoriesPage } from '../catergories/catergories';
import { ProfilePage } from '../profile/profile';
import { DatabaseProvider } from '../../providers/database/database';
import { LoginPage } from '../login/login';
/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  role: any;
  registrationObj;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public db: DatabaseProvider,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController
  ) {}

  ngOnInit(){
    if(this.navParams.get('role')){
      this.role = this.navParams.get('role');
      console.log(this.role);
    }else{
      console.log('nothing here')
    }
  }

  register(form: NgForm) {
    const loading = this.loadingCtrl.create({
      content: `Registering ${form.value.email}...`
    });
    loading.present();

    this.db.registerUser(form.value.email, form.value.password).then(data => {
      
      
      let userID = firebase.auth().currentUser.uid;
      
      
        this.registrationObj = {
          fullname: form.value.fullname,
          password: form.value.password,
          email: form.value.email,
          role:form.value.role,
          genre:"No Genre"
      
      }
    

      firebase
      .database()
      .ref("Pic/" + userID)
      .set({
        url: "http://www.dealnetcapital.com/files/2014/10/blank-profile.png"
      });
      firebase.database().ref("Registration/" + userID).set(this.registrationObj);
      loading.dismiss();
      const alert = this.alertCtrl.create({
        title: 'Success!',
        subTitle: `${form.value.email} has successfully been registered!`,
        buttons: [{
          text: 'Okay',
          handler: ()=>{
            if(this.role=="Dj")
              //where we are navigating to
            {  this.navCtrl.push(ProfilePage);

          }else{
            this.navCtrl.push(CatergoriesPage)
          }
        
          }
        }]
      })
      alert.present();
    }).catch((error)=>{
      console.log(error);
      loading.dismiss();
      //check if the email already exists
      if(error.code == 'auth/email-already-in-use'){
        this.navCtrl.push(LoginPage);
      }
      const alert = this.alertCtrl.create({
        title: error.code,
        subTitle: error.message,
        buttons: [{
          text: 'Okay',
          handler: ()=>{
          }
        }]
      })
      alert.present();
    })
  }
}
