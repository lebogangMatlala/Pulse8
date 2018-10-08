import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { UploadPage } from '../upload/upload';
import { EditPage } from '../edit/edit';
import firebase from 'firebase';
import { CatergoriesPage } from '../catergories/catergories';
import { DatabaseProvider } from '../../providers/database/database';
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
  bookingArr =[];
  inforArray=[];
  genre;
  count=1;
  date = new Date();
  profile ="infor";

  artistName;
  

  constructor(public navCtrl: NavController, public navParams: NavParams,public actionSheetCtrl: ActionSheetController,public db:DatabaseProvider) {


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
            this.genreArr.push(genreobj);
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
                    trackLink:inforArt[k].trackLink,
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

        //retrieve booking information

        this.db.retrieveBooking(id).on('value', (data) => {
              var bookingInfor = data.val();
             
              console.log(bookingInfor);


            if( bookingInfor!=null && bookingInfor!="")
            {
              var keys: any = Object.keys(bookingInfor);

              console.log(bookingInfor);
            
              this.bookingArr=[];
              for (var i = 0; i < keys.length; i++) {
                
                var k = keys[i];
                
              let objBook = {
                fanName: bookingInfor[k].name,
                fanEmail: bookingInfor[k].email,
                
                key: k,
                count:this.count++
                
              }

                this.bookingArr.push(objBook);
                this.bookingArr.reverse();

                
                console.log(this.bookingArr);
              }
              this.massage=""
            }
            else{
              this.massage="No Track Uploaded Yet"
            }



      
            }, (error) => {
      
              console.log(error.message);
      
      
            });

            //retrieve profile information

            this.db.retrieveInformation(id).on('value', (data) => {
              var userInfor = data.val();
              console.log("helo bbs");
              console.log(userInfor);


            if( userInfor!=null && userInfor!="")
            {
              var keys: any = Object.keys(userInfor);

              console.log(userInfor);
            
              this.inforArray=[];
            
                
              let objInfo= {
                stagename: userInfor.stagename,
                bio: userInfor.bio,
                email: userInfor.email,
                
              }

            this.inforArray.push(objInfo);

            console.log("helo bbs");
              console.log(this.inforArray);
              this.massage=""
            }
            else{
              this.massage="User information"
            }



      
            }, (error) => {
      
              console.log(error.message);
      
      
            });
     
 
      }
      else{
        console.log('User has not sign in');
 
        
      }
    });
  }

  back(){
    this.navCtrl.push(CatergoriesPage);
  }


  

  edit()
  {
    this.navCtrl.push(EditPage);
  }

  upload()
  {
    this.navCtrl.push(UploadPage);
  }
  // click(i)
  // {
  //   this.navCtrl.push('PlayerPage',{obj:i});
  // }
}
