import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { ProfilePage } from '../profile/profile';
import { DatabaseProvider } from '../../providers/database/database';
import firebase from "firebase";
import { NgForm } from '../../../node_modules/@angular/forms';
import { CatergoriesPage } from '../catergories/catergories';
/**
 * Generated class for the EditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit',
  templateUrl: 'edit.html',
})
export class EditPage {

  arrProfile = new Array();

  fullname;
  email;
  pic;
  genre;
  bio;
  stagename;
  g;
  role;
  city;
  payment;
  price;
  rate;
  gender;
  id;
  url= "../../assets/imgs/user.png";



  profileObj = {};
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public db: DatabaseProvider,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController
  ) {

    console.log(this.genre,
      this.bio,
      this.stagename)
  }

  ionViewDidLoad() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log("User has sign in");
        this.id = firebase.auth().currentUser.uid;

        firebase
          .database()
          .ref("Pic/" + this.id)
          .on(
            "value",
            data => {
              let infor = data.val();
              if (infor != null && infor != "") {
                this.pic = infor.url;
              } else {
                console.log("no picture");

              }
            },
            error => {
              console.log(error.message);
            }
          );

        console.log( this.id);

        firebase
          .database()
          .ref("Registration/" +  this.id)
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
                stagename: userDetails.stagename,
                genre: userDetails.genre,
                city: userDetails.city,
                price: userDetails.price,
                gender: userDetails.gender,
                payment: userDetails.payment


              };

              this.arrProfile.push(obj);

              this.fullname = obj.fullname;
              this.email = obj.email;
              this.bio = obj.bio;
              this.stagename = obj.stagename;
              this.genre = obj.genre;
              this.city = obj.city;
              this.price = obj.price;
              this.gender = obj.gender;
              this.payment = obj.payment;

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
        function (snapshot) { },
        function (error) {
          // Handle unsuccessful uploads
          alert("error !!1");
        },
        function () {
          // Handle successful uploads on complete

          uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
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
            loader.dismiss();
          });
        }
      );

      //});


    }
  }
  back() {
    // this.navCtrl.pop();
  }

  input(event) {

    this.genre = event.target.value
  }
  submit(form: NgForm) {

    this.price = form.value.price;

    form.value.payment;


    if (this.price <= 5000) {
      console.log(this.rate);




      console.log(form.value.fullname + " " + form.value.email);
      console.log(form.value.bio + " " + this.genre + " " + form.value.stagename);

      this.fullname = form.value.fullname;
      this.email = form.value.email;
      this.stagename = form.value.stagename;
      this.bio = form.value.bio;
      this.city = form.value.city;
      this.price = form.value.price;
      this.gender = form.value.gender;
      this.payment = form.value.payment;

      this.role = "Dj"

      /*  if(this.fullname!=null && this.fullname!=""&& this.email!=null && this.email!="" && this.stagename!=null && this.stagename!="" &&this.bio!=null && this.bio!="" &&this.city!=null && this.city!="")
       {
          
       }
       else{
         this.role="Audience"
       } */


      let obj = {
        fullname: form.value.fullname,
        email: form.value.email,
        stagename: form.value.stagename,
        bio: form.value.bio,
        city: form.value.city,
        genre: this.genre,
        role: "Dj",
        price: this.price,
        gender: this.gender,
        payment: this.payment

      };

      this.arrProfile.push(obj);

      let userID = firebase.auth().currentUser.uid;


      this.db.update(userID, obj);

      //firebase.database().ref('Registration/'+userID).update(obj);

      let user = firebase.auth().currentUser;
      const loader = this.loadingCtrl.create({
        content: "Please wait...",
      });
      loader.present();
      user.updateEmail(obj.email)
        .then(() => {
          // Update successful.

          loader.dismiss();
          this.navCtrl.setRoot(CatergoriesPage);
        })
        .catch(function (error) {
          // An error happened.
          console.log(error);
        });
    }
    else {

      const prompt = this.alertCtrl.create({
        title: 'Caution',
        message: "The amount you have entered cannot be greater than R5000.00",
        buttons: [
          {
            text: 'OK',
            handler: data => {

              console.log('price');
              console.log(form.value.price);
              form.value.price = 0;
              console.log(form.value.price);
            }
          },
        ]
      });
      prompt.present();

      form.value.price = 0;
    }
  }
 
  remove(){
    this.url= "../../assets/imgs/user.png";
    firebase
    .database()
    .ref("Pic/" + this.id)
    .set({
      url: this.url
    })
  }



}
