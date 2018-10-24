import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { NgForm } from "@angular/forms";
import firebase from "firebase";
import { CatergoriesPage } from '../catergories/catergories';
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

  url= "../../assets/imgs/user.png";
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
      content: `Registering ${form.value.email}...`,
      duration: 3000

    });
    loading.present();

    this.db.registerUser(form.value.email, form.value.password).then(data => {
      let userID = firebase.auth().currentUser.uid;
        this.registrationObj = {
          fullname: form.value.fullname,
          password: form.value.password,
          email: form.value.email,
          role:'Audience',
          genre:"No Genre"
      
      }
    
      firebase.database().ref("Registration/" + userID).set(this.registrationObj).then(()=>{
        
        firebase
        .database()
        .ref("Pic/" + userID)
        .set({
          url: this.url
        }).then(()=>{
          this.navCtrl.setRoot(CatergoriesPage);
        })
        
      });
      loading.dismiss();
      
    }).catch((error)=>{
      console.log(error);
      loading.dismiss();
      //check if the email already exists
      if(error.code == 'auth/email-already-in-use'){
        this.navCtrl.push(LoginPage);
      }
    })
  }
}