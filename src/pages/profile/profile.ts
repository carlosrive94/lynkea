import {Component} from "@angular/core";
import {NavParams, AlertController, NavController} from "ionic-angular";
import {DatabaseService} from "../../providers/database-service";
import {FirebaseObjectObservable, FirebaseListObservable} from "angularfire2";
import {LystPage} from "../lyst/lyst";

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {
  uid: string;
  user: FirebaseObjectObservable<any>;
  lysts: FirebaseListObservable<any>;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public navParams: NavParams, private databaseService: DatabaseService) {
    this.uid = navParams.get('uid');
    this.user = databaseService.getUser(this.uid);
    this.lysts = databaseService.getUserLysts(this.uid);
  }

  public navigateToLyst(lystKey: string) {
    this.navCtrl.push(LystPage, {lystKey: lystKey});
  }

  public addLyst() {
    this.alertCtrl.create({
      title: 'Add a Lyst',
      inputs: [{name: 'lystName', placeholder: 'Lyst name'}],
      buttons: [
        {text: 'Cancel'},
        {
          text: 'Add',
          handler: data => {
            this.databaseService.addLyst(this.uid, data.lystName);
          }
        }
      ]
    }).present();
  }

  public removeLyst(lystKey: string) {
    console.log(lystKey);
    this.databaseService.removeLyst(lystKey);
  }
}
