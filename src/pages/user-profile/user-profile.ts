import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import firebase from 'firebase';
import { CatergoriesPage } from '../catergories/catergories';
import { EditUserProfilePage } from '../edit-user-profile/edit-user-profile';
import { EditPage } from '../edit/edit';
import { LoginPage } from '../login/login';
import { InstructionPage } from '../instruction/instruction';
/**
 * Generated class for the UserProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-profile',
  templateUrl: 'user-profile.html',
})
export class UserProfilePage {

  profile="infor";

  id;
  pic;
  bio;
  fullname;
  email;
  gender;
  city;
  condition;





  constructor(public navCtrl: NavController, public navParams: NavParams,public modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserProfilePage');


    firebase.auth().onAuthStateChanged((user)=> {
      if (user) {

        this.condition=true;

      this.id = firebase.auth().currentUser.uid;

        firebase.database().ref('Registration/' + this.id).on('value', (data: any) => {

          let userDetails = data.val();
          console.log('userProfile');
          
          console.log(userDetails.gender);
          
         
          if (userDetails != null && userDetails != '') {

              this.bio=userDetails.bio;
             this.fullname=userDetails.fullname;
             this.email=userDetails.email;
             this.city=userDetails.city;
             this.gender=userDetails.gender;


            firebase.database().ref('Pic/' + this.id).on('value', (data) => {
              var infor = data.val();
              if(infor != null && infor != ""){
                this.pic = infor.url;
              }else{
                console.log("no picture");
                
              }
              
              //  console.log("pciture"+infor);

            }, (error) => {

              console.log(error.message);


            });
          }
          else {
           
            console.log('User has not sign in');
          }
        });

      }
      else{
        this.condition=false;
        console.log('User has not sign in');
      }
  });

}

back(){
  this.navCtrl.push(CatergoriesPage);
}


edit(){
  this.navCtrl.push(EditUserProfilePage);
}

changeRole()
{
  
    const modal = this.modalCtrl.create(InstructionPage);
    modal.present();
}


logout() {


  if (this.condition == true) {
    firebase.auth().signOut().then(() => {
      // Sign-out successful.
      console.log(" Sign-out successful");
      this.navCtrl.push(LoginPage);
    }).catch(function (error) {
      // An error happened.
      console.log(error);
    });
  }
  else {
    this.navCtrl.push(CatergoriesPage);
  }


}

}
