import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, AlertController, ModalController } from 'ionic-angular';
import { UploadPage } from '../upload/upload';
import { EditPage } from '../edit/edit';
import firebase from 'firebase';
import { CatergoriesPage } from '../catergories/catergories';
import { DatabaseProvider } from '../../providers/database/database';
import { LoginPage } from '../login/login';
import { ViewProfilePage } from '../view-profile/view-profile';
import { ViewBookingPage } from '../view-booking/view-booking';
/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  fullname;
  email;
  surname;
  pic;
  track;
  massage;
  trackarray = [];
  arrayP = [];
  genreArr = [];
  bookingArr = [];
  inforArray = [];
  genre;
  count = 1;
  date = new Date();
  profile = "infor";
  id;
  artistName;

  condition;


  displayMsg = " would like to book you for an event.Please respond to the email sent on ";


  constructor(private modalCtrl: ModalController, public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public db: DatabaseProvider) {


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');

    //let key = this.navParams.get("keyobj");


    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log('User has sign in');
        this.condition = true;

        this.id = firebase.auth().currentUser.uid;

        console.log(this.id);

        firebase.database().ref('Registration/' + this.id).on('value', (data: any) => {

          let userDetails = data.val();
          this.genre = userDetails.genre;

          if (this.genre != null) {

            // console.log( userDetails.genre)
            for (let a = 0; a < this.genre.length; a++) {
              let genreobj = {
                genre: this.genre[a]
              }
              //  console.log(userDetails[a].Role)
              this.genreArr.push(genreobj);
              console.log(this.genreArr);
            }
            
          } else {
            console.log("no")
          }

          if (userDetails != null && userDetails != '') {
            firebase.database().ref('Pic/' + this.id).on('value', (data) => {
              var infor = data.val();
              this.pic = infor.url;
              //  console.log("pciture"+infor);

            }, (error) => {

              console.log(error.message);


            });

            ///track
            firebase.database().ref('track/' + this.id).on('value', (data) => {
              var infor = data.val();


              //////////
              if (infor != null && infor != "") {
                //   console.log(infor);
                var tracks = infor.url;

                var keys: any = Object.keys(infor);

                // console.log(infor);

                this.arrayP = [];
                for (var i = 0; i < keys.length; i++) {
                  var k = keys[i];

                  let objtrack = {
                    url: infor[k].url,
                    key: k

                  }
                  this.arrayP.push(objtrack);

                  // console.log(this.arrayP);
                }
              }
              else if (infor == null && infor == "") {
                this.massage = "No track uploaded Yet";
              }
              else {
                this.massage = "Error";
              }


              //console.log("track" );
            }, (error) => {

              console.log(error.message);
            });

            //artist

            firebase.database().ref('artists/' + this.id).on('value', (data) => {
              var inforArt = data.val();

              if (inforArt != null && inforArt != "") {
                var keys: any = Object.keys(inforArt);

                // console.log(inforArt);

                this.trackarray = [];
                for (var i = 0; i < keys.length; i++) {

                  var k = keys[i];

                  let objart = {
                    artistName: inforArt[k].artistName,
                    trackName: inforArt[k].trackName,
                    trackLink: inforArt[k].trackLink,
                    key: k,
                    count: this.count++
                  }

                  this.artistName = objart.artistName;

                  this.trackarray.push(objart);

                  console.log(this.trackarray);
                }
                this.massage = ""
              }
              else {
                this.massage = "No Track Uploaded Yet"
              }
            });

            let obj = {
              id: this.id,
              fullname: userDetails.fullname,
              email: userDetails.email,
              surname: userDetails.surname
            }

            this.fullname = obj.fullname;

          }

        })

        this.db.retrieveBooking(this.id).on('value', (data) => {
          var bookingInfor = data.val();
          

          console.log(bookingInfor);


          if (bookingInfor != null && bookingInfor != "") {
            var keys: any = Object.keys(bookingInfor);
            console.log("helo killer man");
            console.log(this.id);

            this.bookingArr = [];
            for (var i = 0; i < keys.length; i++) {

              var k = keys[i];

              let objBook = {
                fanName: bookingInfor[k].name,
                fanEmail: bookingInfor[k].email,
                time: bookingInfor[k].time,
                date: bookingInfor[k].date,
                userKey:bookingInfor[k].key,
                msg: this.displayMsg,

                key: k,
                count: this.count++

              }
              this.bookingArr.reverse();
              this.bookingArr.push(objBook);
              this.bookingArr.reverse();

              console.log(this.bookingArr);
            }
            this.massage = ""
          }
          else {
            this.massage = "No Track Uploaded Yet"
          }
        }, (error) => {
          console.log(error.message);
        });

        this.db.retrieveInformation(this.id).on('value', (data) => {
          var userInfor = data.val();
          console.log("helo bbs");
          console.log(userInfor);

          if (userInfor != null && userInfor != "") {
            var keys: any = Object.keys(userInfor);

            console.log(userInfor);

            this.inforArray = [];
            let objInfo = {
              stagename: userInfor.stagename,
              bio: userInfor.bio,
              email: userInfor.email,
              city: userInfor.city
            }
            console.log(`this is the empty stage name: ${objInfo.stagename}`);
            this.inforArray.push(objInfo);

            console.log("helo bbs");
            console.log(this.inforArray);
            this.massage = ""
          }
          else {
            this.massage = "User information"
          }

        }, (error) => {
          console.log(error.message);
        });
      }
      else {
        this.condition = false;
        console.log('User has not sign in');
      }
    });
  }

  back() {
    this.navCtrl.push(CatergoriesPage);
  }

  viewBooking(a) {
    let fanName = this.bookingArr[a].fanName;
    let fanEmail = this.bookingArr[a].fanEmail;
    let fanMsg = this.bookingArr[a].msg;
    let fanDate = this.bookingArr[a].date;
    let fanTime = this.bookingArr[a].time;
    let key = this.bookingArr[a].userKey;
    let keyid =this.bookingArr[a].key;

    console.log(key);
    console.log("array");
    console.log(this.bookingArr);


    const alert = this.alertCtrl.create({
      subTitle: fanName + '' + fanMsg + " " + fanDate + " " + fanTime + " Email :" + fanEmail,
      buttons: [
        {
          text: 'View',
          handler: data => {
            console.log('Cancel clicked');

           let obj={
              userskey:key,
              condition:true
            }
            this.navCtrl.push(ViewProfilePage,{objKey:obj});

          }
        },
        {
          text: 'Delete',
          handler: data => {
            console.log('Delete clicked');
            firebase.database().ref('Bookings/' + this.id).child(keyid).remove().then(() => {
              this.navCtrl.push(ProfilePage);
            });
          }
        }
      ]
    });
    alert.present();

    const modal = this.modalCtrl.create(ViewBookingPage, { stuff: 'passing stuff here'
    });
    modal.present();
  }

  deleteTrack(i) {


    let key = this.trackarray[i].key;

    console.log(key);

    const alert = this.alertCtrl.create({
      subTitle: " Do you really want to delete your track",
      buttons: [
        {
          text: 'No',
          handler: data => {
            console.log('No clicked');




          }
        },
        {
          text: 'Yes',
          handler: data => {
            console.log('Yes clicked');
            firebase.database().ref('artists/' + this.id).child(key).remove();
            this.navCtrl.push(ProfilePage);
          }
        }
      ]
    });
    alert.present();


  }


  edit() {
    this.navCtrl.push(EditPage);
  }

  upload() {
    this.navCtrl.push(UploadPage);
  }
  // click(i)
  // {
  //   this.navCtrl.push('PlayerPage',{obj:i});
  // }

  logout() {


    if (this.condition == true) {
      firebase.auth().signOut().then(() => {
        // Sign-out successful.
        console.log(" Sign-out successful");
        this.navCtrl.setRoot(LoginPage);
      }).catch(function (error) {
        // An error happened.
        console.log(error);
      });
    }
    else {
      this.navCtrl.setRoot(CatergoriesPage);
    }


  }

  openLink(link: string){
    window.open(link);
    console.log(link);
  }
}
