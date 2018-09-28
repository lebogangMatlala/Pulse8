import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { StartPage } from '../start/start';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController,) {
    let timer = setInterval(()=>{
      this.navCtrl.setRoot(StartPage);clearInterval(timer)
    }, 5000);
  }

  }


