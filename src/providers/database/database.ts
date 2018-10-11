import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EmailComposer } from '@ionic-native/email-composer';

import firebase from 'firebase';
/*
  Generated class for the DatabaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/


@Injectable()
export class DatabaseProvider {


  arr=[];

  constructor(public http: HttpClient,private emailComposer: EmailComposer) {
    console.log('Hello DatabaseProvider Provider');
    
  }


retriveProfilePic(){
  return firebase.database().ref('Pic/');
}  

retriveProfilePicture(userId){
  return firebase.database().ref('Pic/'+ userId);
}


retrieveProfile(){

  return firebase.database().ref('Registration/');


}
createBookings(key){

  return firebase.database().ref('Bookings/' + key);
  }
  
  sendEmail(){
  
   return this.emailComposer.isAvailable();
  }






retrieveInformation(key){

  return firebase.database().ref('Registration/'+key);

}


retrieveTracks()
{
  return firebase.database().ref('track/')
}

  update(userID, obj) {
    firebase.database().ref('Registration/' + userID).update(obj);

  }

  registerUser(email, password) {
    return firebase.auth().createUserWithEmailAndPassword(email, password);

  }


  login(email: string, password: string) {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  getPlace() {
    let url = 'https://maps.googleapis.com/maps/api/place/textsearch/json?query=restaurants+in+Sydney&key=AIzaSyCaiFLiLXtxHiy2O3wp1C3B9QreRdk42cQ';

    return new Promise(resolve => {
      this.http.get(url).subscribe(data => {
        resolve(data);
        console.log(data);
      }, err => {
        console.log(err);
      });
    });
  }

  resetPassword(email: string) {

    return firebase.auth().sendPasswordResetEmail(email);


  }

  uploadTrack(filename, file) {
    let timestamp = Number(new Date());
    console.log(timestamp);
    //todo
    return firebase.storage().ref(`/tracks/${timestamp + filename.name}`).put(file);
  }

  retrieveSong(song) {
    return new Promise((accpt, rej) => {

      let storageRef = firebase.storage().ref();
      storageRef.child('/tracks/' + song).getDownloadURL().then(function (url) {
        accpt(url)
      })

    })

  }

  saveArtists(userID, obj) {
    return firebase.database().ref('artists/' + userID).push(obj);
  }

  retrieveBooking(key)
  {
    return firebase.database().ref('Bookings/'+key);
  }


  categories() {

    return [
      {
        genre: 'Deep House',
        picture: '../../assets/imgs/deep house.jpg'
      },
      {
        genre: 'Commercial House',
        picture: '../../assets/imgs/commercial.jpg'
      },
      {
        genre: 'Hip Hop',
        picture: '../../assets/imgs/hip hop.jpeg'
      },
      {
        genre: 'Kwaito',
        picture: '../../assets/imgs/kwaito.jpg'
      },
      {
        genre: 'R&B',
        picture: '../../assets/imgs/rnb.jpg'
      },
      {
        genre: 'Soul Music',
        picture: '../../assets/imgs/soul.jpg'
      },
      {
        genre: 'Various',
        picture: '../../assets/imgs/various.jpg'
      }
    ];
  }

  selectGenre(genre) {
    return new Promise((pass, fail) => {
      this.arr.length = 0;
      firebase.database().ref("Registration").on('value', (data: any) => {
        let register = data.val();
        console.log(register);
        var keys2: any = Object.keys(register);
        for (var i = 0; i < keys2.length; i++) {
          var k = keys2[i];
          if (genre == register[k].genre) {
            let obj = {
              name: register[k].fullname,
              genre: register[k].genre,
              key:k
            }
            this.arr.push(obj);
            console.log(this.arr);
          }


        }
      }), pass(this.arr);


    })
  }


}
