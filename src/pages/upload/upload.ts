import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { NgForm } from '../../../node_modules/@angular/forms';
import { DatabaseProvider } from '../../providers/database/database';
import firebase from 'firebase';
import { ProfilePage } from '../profile/profile';
/**
 * Generated class for the UploadPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-upload',
  templateUrl: 'upload.html',
})
export class UploadPage {

  artName;
  trackName;
  trackLink;
  arrProfile = new Array();

  name;
  surname;
  selectedfile;
  filename;
  userID;
  arr=[];


  constructor(public navCtrl: NavController, public navParams: NavParams,public db:DatabaseProvider,public loadingCtrl: LoadingController,private toastCtrl: ToastController) {

    firebase.auth().onAuthStateChanged((user)=> {
      if (user) {
        console.log('User has sign in');
        var id =firebase.auth().currentUser.uid;

        console.log(id);
 
        firebase.database().ref('Registration/' +id).on('value', (data: any) => {
 
          var userDetails = data.val();
     
          console.log(userDetails);
    
          var userID =firebase.auth().currentUser.uid;
    
          console.log(userID);

          let stagename=userDetails.stagename;

          console.log(stagename);

          if(stagename!=null && stagename!="")
          {
              
          if(userDetails!=null && userDetails!='')
          {
            let obj = {
              id:userID,
              artistName: userDetails.stagename,
            }
           
            this.arrProfile.push(obj);

            this.artName=userDetails.stagename;
         
            //yes i did change
            //changes

            console.log(this.artName);
           console.log(obj);
          }
          else if(userDetails===null && userDetails===''){
            console.log('User doesnt exist')
          }
        }
        else{

          let toast = this.toastCtrl.create({
            message: 'Edit your profile First',
            duration: 3000,
            position: 'top'
          });
        
          toast.onDidDismiss(() => {
            console.log('Dismissed toast');
          });
        
          toast.present();

          this.navCtrl.setRoot(ProfilePage);
        }
 
         
     
        })
       
        this.arrProfile=[];
 
      }
      else{
        console.log('User has not sign in');
 
   
        
      }
    }); 
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad TrackUploadPage');


  }

  url ='http://www.dealnetcapital.com/files/2014/10/blank-profile.png';


  upload(event: any){
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (event: any) => {
        this.url = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
      console.log(event.target.files);
      this.selectedfile = event.target.files[0];
      this.filename = this.selectedfile.name;
    
 
  }
}
back(){
  this.navCtrl.push(ProfilePage);
}

  saveArtist(form: NgForm)
  {
    console.log(this.artName);

      let obj={
        artistName:this.artName,
        trackName:form.value.trackName,
        trackLink:form.value.trackLink
  
      }
      
    //   var storageRef = firebase.storage().ref('tracks/' + this.filename);
 
    //   var metadata = { contentType: 'audio/mp3', size: 0.75 }
    //   var uploadTask = storageRef.put(this.selectedfile, metadata);
 
    //  uploadTask.on('state_changed', function (snapshot) {
 
    //   }, function (error) {
    //     // Handle unsuccessful uploads
    //     console.log("error !!1");
    //   }, function () {
    //     // Handle successful uploads on complete
    //     console.log("successful !!1");


    //     uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
    //       console.log('File available at', downloadURL);
 
    //       firebase.auth().onAuthStateChanged((user) => {
    //         if (user) {
    //           console.log('User has sign in');
    //           let userID = firebase.auth().currentUser.uid;
            
    //           firebase.database().ref('track/' + userID).push({
    //             url: downloadURL,
    //           });
    //           console.log(userID)
 
    //         }
    //         else {
    //           console.log('User has not sign in');
    //         }
    //       });
 
    //     });
    //   });

      let loading = this.loadingCtrl.create({
        content: 'Please wait...',
        duration: 5000
        
      });
    
      loading.present();
    
      setTimeout(() => {
        var userId = firebase.auth().currentUser.uid;
        this.db.saveArtists(userId,obj).then(()=>{
        });

       this.navCtrl.setRoot(ProfilePage);

        
      }, 5000);

      let userID = firebase.auth().currentUser.uid;
       
      firebase
      .database()
      .ref("Registration/" + userID)
      .on("value", (data: any) => {
        let userDetails = data.val();

        console.log(userDetails);

      
        console.log(userID);

        if (userDetails != null && userDetails != "") {
          let obj = {
            id: userID,
            fullname: userDetails.fullname,
            email: userDetails.email,
            bio: userDetails.bio,
            stagename:userDetails.stagename,
            genre:userDetails.genre,
            role:"Dj"
          };

          this.arr.push(obj);

          console.log(userID);
          console.log(this.arr);
          console.log(obj);

          firebase.database().ref('Registration/' + userID).update(obj);
        } else if (userDetails === null && userDetails === "") {
          console.log("User doesnt exist");
        }
      });
     
      
  }

  click(i)
  {
    alert(i);
  }
}
