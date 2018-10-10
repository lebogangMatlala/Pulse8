import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import firebase from 'firebase';
import { HomePage } from '../pages/home/home';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    firebase.initializeApp({
      apiKey: "AIzaSyDHRAF0bth4sm4p4xTTBzjqc3RmdMNLcY4",
      authDomain: "puls8-41496.firebaseapp.com",
      databaseURL: "https://puls8-41496.firebaseio.com",
      projectId: "puls8-41496",
      storageBucket: "puls8-41496.appspot.com",
      messagingSenderId: "110966517847"
    })
    
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

