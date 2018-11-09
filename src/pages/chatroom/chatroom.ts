import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase';

/**
 * Generated class for the ChatroomPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chatroom',
  templateUrl: 'chatroom.html',
})
export class ChatroomPage {

  details;
  key;
  userkey;
  message;
  currentid;
display;
  today = new Date() ;

   
  msguserid;
  msgusername;
  arrMssg=[];
  djkeys;


  



  constructor(public navCtrl: NavController, public navParams: NavParams) {

  
    

    this.currentid = firebase.auth().currentUser.uid;

    this.details=navParams.get('obj');
    this.key=navParams.get('objk');
    this.userkey =navParams.get('usersKey');
    if(this.key != this.userkey){

    
    }
    


    console.log(this.details);
    console.log(this.userkey);
    ////current userid

    firebase.database().ref("chatroom/" + this.key ).on('value',data=>{
     // console.log(data.val());
    })
    

    firebase.database().ref("messages/" + this.key ).on('value',data=>{
      console.log(data.val());
      let msgInfo =data.val();

      var keys = Object.keys(msgInfo);
      
      for(let i = 0; i< keys.length;++i){
        let k = keys[i];

        this.msguserid=msgInfo[k].uid

        firebase.database().ref('Registration/' +this.msguserid).on('value', (data: any) => {
          var infor = data.val();
          this.msgusername = infor.fullname;
          console.log("user name  //////" + this.msgusername);
        })

        let objc = { 
          message: msgInfo[k].message,
          time:msgInfo[k].time,
          name:this.msgusername
                  }
                  console.log("this is the object")
                  console.log(objc);
                  
            this.arrMssg.push(objc);
       

      }

    })

  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatroomPage');
  }
  send(){
    this.arrMssg=[];
    let dateObj = new Date
    let time = dateObj.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1")
    firebase.database().ref('messages/'+ this.key).push({
      message:this.message,
      uid:this.currentid,
      time:time
    })
   
  }

}
