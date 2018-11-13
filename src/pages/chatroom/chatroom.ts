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
  condition;


  
  messagestate = 'not sending' 


  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.arrMssg.length = 0;
    

    this.currentid = firebase.auth().currentUser.uid;

    this.details=navParams.get('obj');
    if(this.details == undefined){
      this.userkey = navParams.get('theuserkey');
  
      this.key = this.userkey;
 
      this.djkeys = this.currentid;
    }else{
      
    this.djkeys = this.details.userKey;
    this.key=navParams.get('objk');
    }
   
   
    
    


    //console.log(this.details);
    //console.log("the key "+this.key)
    //console.log(this.userkey);
    ////current userid

    firebase.database().ref("chatroom/" + this.key ).on('value',data=>{
     // console.log(data.val());
    })
    

   
    firebase.database().ref("messages/"+ this.key ).child(this.djkeys).on('value',data=>{
      this.arrMssg.length = 0;
      let msgInfo =data.val();

      let meskey = msgInfo.uid;
 


      if(msgInfo!= null)
      {

        var keys = Object.keys(msgInfo);
        console.log(msgInfo);
       for(let i = 0; i< keys.length;++i){
         let k = keys[i];
 
      this.msguserid=msgInfo[k].uid

//
      if(this.msguserid == this.currentid){
       this.condition="right";

      }else{
        this.condition="left";
      }
        
      console.log(this.condition);
      
         firebase.database().ref('Registration/' + this.msguserid).on('value', (data: any) => {
           var infor = data.val();

           if(infor!=null)
           {
              this.msgusername = infor.fullname;

            console.log("user name  //////" + this.msgusername);
           }else{

            console.log('no data');
           }
         
       })
      
        let objc = { 
           message: msgInfo[k].message,
           time:msgInfo[k].time,
           name:this.msgusername,
           condition: this.condition
                  }
                  console.log("this is the object")
                console.log(objc);
                   
            this.arrMssg.push(objc);
        
 
       } 

      }
      else{
        console.log('no data');
      }


     

    })

  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatroomPage');
  
  }
  onMessageAdded(message){
    this.arrMssg.length = 0;
    let dateObj = new Date
    let time = dateObj.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1")
    console.log("message user id")
    console.log(this.key)

    firebase.database().ref('messages/'+ this.key).child(this.djkeys).push({

      message:message,
      uid:this.currentid, 
      time:time
    })

    if(this.currentid == this.currentid ){
      console.log('user');
    }
   else{
    console.log('dj');
   }

  this.messagestate = 'not sending'
    
  }

  back(){
    this.navCtrl.pop();
  }

}
