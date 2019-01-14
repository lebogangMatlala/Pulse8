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
import { BookingsPage } from '../pages/bookings/bookings';
import { EmailComposer } from '@ionic-native/email-composer';
import { SigninPage } from '../pages/signin/signin';
import { ViewBookingPage } from '../pages/view-booking/view-booking';
import { UserProfilePage } from '../pages/user-profile/user-profile';
import { EditUserProfilePage } from '../pages/edit-user-profile/edit-user-profile';
import { InstructionPage } from '../pages/instruction/instruction';
import { ChatboxComponent } from '../components/chatbox/chatbox';
import { ChatroomPage } from '../pages/chatroom/chatroom';
import { ScreenOrientation } from '@ionic-native/screen-orientation';

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
    CatergoriesPage,
    BookingsPage,
    SigninPage,
    ViewBookingPage,
    UserProfilePage,
    EditUserProfilePage,
    InstructionPage,
    ChatboxComponent,
    ChatroomPage
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
    CatergoriesPage,
    BookingsPage,
     SigninPage,
    ViewBookingPage,
    UserProfilePage,
    EditUserProfilePage,
    InstructionPage,
    ChatboxComponent,
    ChatroomPage

  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    EmailComposer,
    DatabaseProvider,
    ScreenOrientation
  ]
})
export class AppModule { }
