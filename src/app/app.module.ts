import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { DatabaseProvider } from '../providers/database/database';
import { EditPage } from '../pages/edit/edit';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { ProfilePage } from '../pages/profile/profile';
import { StartPage } from '../pages/start/start';
import { ViewProfilePage } from '../pages/view-profile/view-profile';
import { UploadPage } from '../pages/upload/upload';
import { IdentityPage } from '../pages/identity/identity';
import { CatergoriesPage } from '../pages/catergories/catergories';
import { HttpClientModule } from '../../node_modules/@angular/common/http';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    EditPage,
LoginPage,
RegisterPage,
ProfilePage,
StartPage,
ViewProfilePage,
UploadPage,
IdentityPage,
CatergoriesPage

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    EditPage,
LoginPage,
RegisterPage,
ProfilePage,
StartPage,
ViewProfilePage,
UploadPage,
IdentityPage,
CatergoriesPage

  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DatabaseProvider
  ]
})
export class AppModule {}
