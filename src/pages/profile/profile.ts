import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { UploadPage } from '../upload/upload';
import { EditPage } from '../edit/edit';
import firebase from 'firebase';
import { CatergoriesPage } from '../catergories/catergories';
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
  trackarray =[];
  arrayP =[];
  genreArr =[];
  genre;
  count=1;

  profile ="music";

  artistName;
  

  constructor(public navCtrl: NavController, public navParams: NavParams,public actionSheetCtrl: ActionSheetController) {


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
    
//let key = this.navParams.get("keyobj");


    firebase.auth().onAuthStateChanged((user)=> {
      if (user) {
        console.log('User has sign in');   
         
        var id =firebase.auth().currentUser.uid;

        console.log(id);
 
        firebase.database().ref('Registration/' + id).on('value', (data: any) => {
 
          let userDetails = data.val();
          this.genre =userDetails.genre;

          if(this.genre!=null){       

            // console.log( userDetails.genre)
             for (let a = 0; a < this.genre.length; a++){
               let genreobj={
                 genre:this.genre[a]
               }
          //  console.log(userDetails[a].Role)
            this. genreArr.push(genreobj);
               console.log(this. genreArr);}
 
            
          }else{
            console.log("no")
          }
        



 
          if(userDetails!=null && userDetails!='')
          {
            firebase.database().ref('Pic/' + id).on('value', (data) => {
              var infor = data.val();
              this.pic = infor.url;
            //  console.log("pciture"+infor);
      
            }, (error) => {
      
              console.log(error.message);
      
      
            });
      
///track
            firebase.database().ref('track/' + id).on('value', (data) => {
              var infor = data.val();

             
           //////////
                if( infor!=null && infor!="")
                {
                   //   console.log(infor);
                      var tracks = infor.url;

                      var keys: any = Object.keys(infor);

                     // console.log(infor);
                    
                      this.arrayP=[];
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
                else if( infor==null && infor=="")
                {
                  this.massage="No track uploaded Yet";
                }
                else{
                  this.massage="Error";
                }
              
              
              //console.log("track" );
            }, (error) => {
      
              console.log(error.message);
            });

             //artist

              firebase.database().ref('artists/' + id).on('value', (data)=>{
                var inforArt = data.val();

                if( inforArt!=null && inforArt!="")
                {
                  var keys: any = Object.keys(inforArt);

                 // console.log(inforArt);
                
                  this.trackarray=[];
                  for (var i = 0; i < keys.length; i++) {
                    
                    var k = keys[i];
                    
                  let objart = {
                    artistName: inforArt[k].artistName,
                    trackName: inforArt[k].trackName,
                    key: k,
                    count:this.count++
                    
                  }
       
                   this.artistName=objart.artistName;

                    this.trackarray.push(objart);

                    console.log(this.trackarray);
                  }
                  this.massage=""
                }
                else{
                  this.massage="No Track Uploaded Yet"
                }
              });

/////
            let obj = {
              id:id,
              fullname: userDetails.fullname,
              email:userDetails.email,
              surname:userDetails.surname
            
           
            }

            this.fullname=obj.fullname;

           
          // console.log(obj);
          }
         
     
        })
       
 
 
      }
      else{
        console.log('User has not sign in');
 
        // let alert = this.alertCtrl.create({
        //   title: 'User',
        //   message: 'Sign in to view your profile ',
        //   buttons: [
        //     {
        //       text: 'Cancel',
        //       role: 'cancel',
        //       handler: () => {
        //         console.log('Cancel clicked');
        //         this.navCtrl.setRoot(ViewPage);
        //       }
        //     },
        //     {
        //       text: 'Ok',
        //       handler: () => {
        //         console.log('Ok clicked');
        //         this.navCtrl.setRoot(SigninPage);
 
        //       }
        //     }
        //   ]
        // });
        // alert.present();
        
      }
    });
  }

  back(){
    this.navCtrl.push(CatergoriesPage);
  }


  edit()
  {

    const actionSheet = this.actionSheetCtrl.create({
     
      buttons: [
        {
          text: 'Edit Profile',
          role: 'Edit Profile',
          handler: () => {
            console.log('Edit Profile clicked');

            this.navCtrl.push(EditPage);
          }
        },{
          text: 'Upload Track',
          handler: () => {
            console.log('Upload Track clicked');
            this.navCtrl.push(UploadPage);
          }
        },{
          
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  // click(i)
  // {
  //   this.navCtrl.push('PlayerPage',{obj:i});
  // }
}
