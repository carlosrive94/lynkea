import {NgModule, ErrorHandler} from "@angular/core";
import {IonicApp, IonicModule, IonicErrorHandler} from "ionic-angular";
import {MyApp} from "./app.component";
// Importing Pages
import {HomePage} from "../pages/home/home";
// Importing Providers
import {AuthService} from "../providers/auth-service";
//Importing components
import {LynkDetailComponent} from "../components/lynk-detail.component";
// Importing AF2 Module
import {AngularFireModule} from "angularfire2";

// AF2 Settings
const firebaseConfig = {
  apiKey: "AIzaSyAojUKRBIzZnQGw0ntTC-I6tY9hIPRkSzk",
  authDomain: "lynkea-d0040.firebaseapp.com",
  databaseURL: "https://lynkea-d0040.firebaseio.com",
  storageBucket: "lynkea-d0040.appspot.com",
  messagingSenderId: "964830719483"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LynkDetailComponent
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthService
  ]
})
export class AppModule {
}
