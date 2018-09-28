import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import firebase from 'firebase';
import { StartPage } from '../start/start';
import { ViewProfilePage } from '../view-profile/view-profile';
import { LoginPage } from '../login/login';
import { ProfilePage } from '../profile/profile';
import { DatabaseProvider } from '../../providers/database/database';
/**
 * Generated class for the CatergoriesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-catergories',
  templateUrl: 'catergories.html',
})
export class CatergoriesPage {

  obj = {
  }
  globalPic =[];
  globalDetails=[];
  globalTrack=[];
  role;
  keysProfile:any;
  keysPic:any;
  pic;
  track;
  condition;
  globalarr=[];
  picarray = [];
  profilearray=[]
  keys;
  categoriesArr;
  arrDj=[];
  arrSt=[];
  

  

  constructor(public navCtrl: NavController, public navParams: NavParams, public db: DatabaseProvider,public toastCtrl: ToastController) {
    this.categoriesArr= this.db.categories();

    let userID;

    ///picture
  this.categoriesArr = this.db.categories();
  console.log(this.categoriesArr);
    this.db.retriveProfilePic().on('value', (data) => {
      var infor = data.val();
      this.pic = infor.url;
      
      // console.log( infor);
       let keys = Object.keys(infor);

       for (var i = 0; i < keys.length; i++) {
       var k = keys[i];
      this.obj = {
            url: infor[k].url,
            key: k 
      }

      this.globalPic[i] = infor[k].url
             

     } 

      }, (error) => {

        console.log(error.message);


      });
//tracks




///Djs details
    this.db.retrieveProfile().on("value", (data) => {
       let profile = data.val();
       let key = Object.keys(profile);

    

    console.log(key);

    for(var i = 0; i <key.length; i++)
     {
        let k = key[i];
      let stagename = profile[k].stagename
      this.role=profile[k].Role;
      let genre = profile[k].genre;

      console.log(this.role + genre);
      if(this.role=="Dj"){
        if(genre!= null && stagename!=null){    
           console.log("dj" + k + stagename )
        let objDj ={
          role:this.role,
          stagename:stagename,
          genre:genre,
          url:this.globalPic[i],
          key:k
      }
      

     console.log(objDj);
    this.arrDj.push(objDj);
  }
  else{
    console.log("no stage name or genre"+k)  
  }
     
    }
      else{
        console.log("audience"+k)
      }
     
    }
  
   });



  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CategoriesPage');

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
     
        console.log("user has signed in")

        console.log(user.uid);
        this.condition=true;

        console.log(this.condition);
        
     } else {
      console.log("User has Logged out");
      this.condition=false;
   
      console.log(this.condition);
     }


  });

  }

 
 
  generateTopics() {
 
    this.arrDj=this.arrDj;
   
  }
 
  getItems(searchbar) {
    this.generateTopics();

    let val = searchbar.srcElement.value;

    if (!val) {
      
      return ;
    }

    this.arrDj= this.arrDj.filter((i) => {
      if(i.stagename && val) {
        if (i.stagename.toLowerCase().indexOf(val.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
      
    });

    console.log(val,this.arrDj.length);
    
  }

  viewProfile(i)
  {
      console.log(i);
      let keys  = this.arrDj[i].key;
      
      if(this.condition==true)
      {
        console.log("user has signed in")
        this.navCtrl.setRoot(ViewProfilePage,{keyobj:keys});
   
      }
      else{
        console.log("User has Logged out");
        this.navCtrl.setRoot(LoginPage);
      }
  }


  profilePage()
  {
    

    if(this.condition==true)
      {
        console.log("user has signed in")
        if(this.role=="Dj")
        {
          this.navCtrl.push(ProfilePage);
        }
         else{
          alert("not a dj")
            const toast = this.toastCtrl.create({
                  message: 'You cannot view ur Profile for now',
                  duration: 3000
                });
                toast.present();
              }
   
      }
      else{
        console.log("User has Logged out");
        this.navCtrl.setRoot(LoginPage);
      }


     
  }

  logout()
  {


    if(this.condition==true)
    {
      firebase.auth().signOut().then(() =>{
          // Sign-out successful.
          console.log(" Sign-out successful");
          this.navCtrl.setRoot(StartPage);
          }).catch(function(error) {
          // An error happened.
          console.log(error);
      });
    }
    else{
      this.navCtrl.setRoot(StartPage);
    }

 
   }



}
