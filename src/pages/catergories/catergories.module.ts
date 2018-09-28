import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CatergoriesPage } from './catergories';

@NgModule({
  declarations: [
    CatergoriesPage,
  ],
  imports: [
    IonicPageModule.forChild(CatergoriesPage),
  ],
})
export class CatergoriesPageModule {}
