import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ViewBookingPage } from './view-booking';

@NgModule({
  declarations: [
    ViewBookingPage,
  ],
  imports: [
    IonicPageModule.forChild(ViewBookingPage),
  ],
})
export class ViewBookingPageModule {}
