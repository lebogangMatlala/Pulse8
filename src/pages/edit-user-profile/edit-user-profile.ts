import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ModalController } from 'ionic-angular';
import { UserProfilePage } from '../user-profile/user-profile';
import firebase from "firebase";
import { DatabaseProvider } from '../../providers/database/database';
import { NgForm } from '../../../node_modules/@angular/forms';
/**
 * Generated class for the EditUserProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-user-profile',
  templateUrl: 'edit-user-profile.html',
})
export class EditUserProfilePage {

  arrProfile = new Array();

  fullname;
  email;
  pic;
  bio;
  role;
  city;
  gender;
  profileObj = {};

  constructor(public navCtrl: NavController, public navParams: NavParams,   public db: DatabaseProvider,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditUserProfilePage');
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log("User has sign in");
        let id = firebase.auth().currentUser.uid;

        firebase
          .database()
          .ref("Pic/" + id)
          .on(
            "value",
            data => {
              let infor = data.val();
              if(infor != null && infor != ""){
                this.pic = infor.url;
              }else{
                console.log("no picture");
                
              }
            },
            error => {
              console.log(error.message);
            }
          );

        console.log(id);

        firebase
          .database()
          .ref("Registration/" + id)
          .on("value", (data: any) => {
            let userDetails = data.val();

            console.log(userDetails);

            let userID = firebase.auth().currentUser.uid;

            console.log(userID);

            if (userDetails != null && userDetails != "") {
              let obj = {
                id: userID,
                fullname: userDetails.fullname,
                email: userDetails.email,
                bio: userDetails.bio,
                city:userDetails.city,
                gender:userDetails.gender,
              


              };

              this.arrProfile.push(obj);

              this.fullname = obj.fullname;
              this.email = obj.email;
              this.bio=obj.bio;
              this.city=obj.city;
              this.gender=obj.gender;
             

              console.log(this.fullname);
              console.log(obj);
            } else if (userDetails === null && userDetails === "") {
              console.log("User doesnt exist");
            }
          });

        this.arrProfile = [];
      } else {
        console.log("User has not sign in");
      }
    });
  }

  url = "http://www.dealnetcapital.com/files/2014/10/blank-profile.png";


  insertImage(event: any) {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (event: any) => {
        this.url = event.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
      console.log(event.target.files);
      let selectedfile = event.target.files[0];
      let filename = selectedfile.name;
      const loader = this.loadingCtrl.create({
        content: "Please wait...",
        duration: 6500
      });
      loader.present();

      let storageRef = firebase.storage().ref("profilepic/" + filename);

      let metadata = { contentType: "image/jpeg", size: 0.75 };
      let uploadTask = storageRef.put(selectedfile, metadata);

      this.profileObj = {
        filename: filename,
        metadata: metadata
      }
      uploadTask.on(
        "state_changed",
        function(snapshot) {},
        function(error) {
          // Handle unsuccessful uploads
          alert("error !!1");
        },
        function() {
          // Handle successful uploads on complete
         
          uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
            console.log("File available at", downloadURL);

            firebase.auth().onAuthStateChanged(user => {
              if (user) {
                console.log("User has sign in");
                let userID = firebase.auth().currentUser.uid;
                let obj = {
                  url: downloadURL
                };

                firebase
                  .database()
                  .ref("Pic/" + userID)
                  .set({
                    url: downloadURL
                  });

                console.log(userID);
              } else {
                console.log("User has not sign in");
              }
            });
          });
        }
      );

      //});


    }
  }

  back()
  {
    this.navCtrl.push(UserProfilePage);
  }

  submit(form: NgForm) {
    
   

  

    const loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 2500
    });
    loader.present();
  
 
    console.log(form.value.fullname + " " +form.value.email);
    console.log(form.value.bio+" " + " " +form.value.stagename);

    this.fullname=form.value.fullname ;
    this.email=form.value.email;
    this.bio=form.value.bio;
    this.city=form.value.city;
    this.gender=form.value.gender;
  

    // if(this.fullname!=null && this.fullname!=""&& this.email!=null && this.email!="" && this.bio!=null && this.bio!="" &&this.city!=null && this.city!="")
    // {
    //       this.role="Dj"
    // }
    // else{
    //   this.role="Audience"
    // }


    let obj = {
      fullname: form.value.fullname,
      email: form.value.email,
      bio: form.value.bio,
      city:form.value.city,
      gender:this.gender,
     

    };

    this.arrProfile.push(obj);

    let userID = firebase.auth().currentUser.uid;


    this.db.update(userID, obj);

    //firebase.database().ref('Registration/'+userID).update(obj);

    let user = firebase.auth().currentUser;
    user
      .updateEmail(obj.email)
      .then(() => {
        // Update successful.

      this.navCtrl.push(UserProfilePage);
      })
      .catch(function(error) {
        // An error happened.
        console.log(error);
      });
    }
    
}
