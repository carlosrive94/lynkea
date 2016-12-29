import {Component} from "@angular/core";
import {NavController, NavParams} from "ionic-angular";
import {User} from "../../components/user";

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class Profile {

  user: User;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.user = navParams.get('userProfile');
  }

}
