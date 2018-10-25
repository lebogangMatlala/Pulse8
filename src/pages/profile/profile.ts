import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, AlertController, ModalController, PopoverController } from 'ionic-angular';
import { UploadPage } from '../upload/upload';
import { EditPage } from '../edit/edit';
import firebase from 'firebase';
import { CatergoriesPage } from '../catergories/catergories';
import { DatabaseProvider } from '../../providers/database/database';
import { LoginPage } from '../login/login';
import { ViewBookingPage } from '../view-booking/view-booking';
import { UserProfilePage } from '../user-profile/user-profile';
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
  keyid;
  key;

  condition;
  picture;
  globalPic=[];
  role;

  displayMsg = " Would like to book you for an event,please respond to the email sent. ";


  constructor(private modalCtrl: ModalController, public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public db: DatabaseProvider, private popoverCtrl: PopoverController) {

  

  }

  ngOnInit() {

    this.pic="http://www.dealnetcapital.com/files/2014/10/blank-profile.png";
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
          this.role = userDetails.role;

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
              if(infor != null && infor != ""){
                this.pic = infor.url;
              }else{
                console.log("no picture");
                
              }
              
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

        //picture for the profile of the booked user
        

          console.log("lebo");

          console.log(this.globalPic);
          

        this.db.retrieveBooking(this.id).on('value', (data) => {
          var bookingInfor = data.val();
          
          
          console.log(bookingInfor);





          if (bookingInfor != null && bookingInfor != "") {
            var keys: any = Object.keys(bookingInfor);
            console.log("helo killer man");
            console.log(this.id);

            this.bookingArr = [];
            for (var i = 0; i < keys.length; i++) {

              // let picId= bookingInfor[k].userKey;
              // console.log("Lebogang")
              // console.log(picId);
              

              var k = keys[i];
              console.log("Lebogang");

              let key=bookingInfor[k].key;
              
              console.log(bookingInfor[k].key);

              
            this.db.retriveProfilePicture(key).on('value', (data) => {
              var infor = data.val();
              this.picture = infor.url;
            
              console.log("picture");
              console.log(this.picture);

              }, (error) => {

                console.log(error.message);


              });


              let objBook = {
                fanName: bookingInfor[k].name,
                fanEmail: bookingInfor[k].email,
                time: bookingInfor[k].time,
                date: bookingInfor[k].date,
                userKey:bookingInfor[k].key,
                msg: this.displayMsg,
               image:this.picture,

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
    let city = this.bookingArr[a].city;

    console.log(key);
    console.log("array");
    console.log(this.bookingArr);

    this.db.retriveProfilePicture(key).on('value', (data) => {
      var infor = data.val();
      this.picture = infor.url;
    
      console.log("picture");
      console.log(this.picture);

      }, (error) => {

        console.log(error.message);


      });

     



           let obj={
              userskey:key,
               fanName : this.bookingArr[a].fanName,
               fanEmail : this.bookingArr[a].fanEmail,
               fanMsg : this.bookingArr[a].msg,
               fanDate : this.bookingArr[a].date,
               fanTime : this.bookingArr[a].time,
               picture:this.picture,
               keyid:this.bookingArr[a].userKey,
               key:this.bookingArr[a].key,
               id:this.id,
               city:this.bookingArr[a].city,

            }
          


    const modalCtrl = this.modalCtrl.create(ViewBookingPage,{bookingDetails:obj});
    modalCtrl.present();
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

  openLink(link: string){
    window.open(link);
    console.log(link);
  }

  delete(a)
  {
    this.keyid=this.id,
    this.key=this.bookingArr[a].key,

    firebase.database().ref("Bookings/"+ this.keyid).child(this.key).remove().then(()=>{
      this.navCtrl.push(ProfilePage);
    });
   console.log("working current user " + this.keyid + " bookingID "+this.key);
 
  }
  // changes(){
  
  //         this.navCtrl.push(UserProfilePage);
  //         this.role = "Audience";

  //         let obj = {
  //           role:this.role
  //        }
  //         this.db.update(this.id,obj);
         
  // }
  // change(){
  //       console.log(this.id);

   

  //         let obj = {
  //            role:this.role
  //         }
  //         this.db.update(this.id,obj);

  //         if(this.role=='Audience')
  //         {

  //          // this.navCtrl.push(UserProfilePage);
  //         }
        

  //         console.log(this.role);
  


  // }
  
}
