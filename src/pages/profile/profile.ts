import {Component} from "@angular/core";
import {NavParams, LoadingController, Loading, AlertController} from "ionic-angular";
import {DatabaseService} from "../../providers/database-service";
import {FirebaseObjectObservable} from "angularfire2";
import {Lyst} from "../../components/lynk-list";

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class Profile {
  public loading: Loading;
  uid: string;
  user: FirebaseObjectObservable<any>;
  lysts: Lyst[];

  constructor(public loadingCtrl: LoadingController, public alertCtrl: AlertController, public navParams: NavParams, private databaseService: DatabaseService) {
    this.showLoading();
    this.uid = navParams.get('uid');
    this.user = databaseService.getUser(this.uid);
    this.iterateLists();
  }

  private showLoading() {
    this.loading = this.loadingCtrl.create();
    this.loading.present();
  }

  private dismissLoading() {
    this.loading.dismiss();
  }

  private iterateLists(): void {
    this.lysts = [];
    this.databaseService.getLystsOfUser(this.uid).subscribe(_lysts => {
      _lysts.forEach(_lyst => {
        this.lysts.push(this.databaseService.getLyst(this.uid, _lyst.$key));
      });
      this.dismissLoading();
    });
  }

  public addLynk(listKey: string) {
    console.log(listKey);
    let prompt = this.alertCtrl.create({
      title: 'Add a Lynk',
      inputs: [
        {name: 'lynkName', placeholder: 'Name'},
        {name: 'url', placeholder: 'URL'}
      ],
      buttons: [
        {text: 'Cancel'},
        {
          text: 'Add',
          handler: data => {
            this.databaseService.addLynk(this.uid, listKey, data.lynkName, data.url);
          }
        }
      ]
    });
    prompt.present();

  }

  public addLyst() {
    let prompt = this.alertCtrl.create({
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
    });
    prompt.present();
  }
}
