import {Component} from "@angular/core";
import {NavParams, LoadingController, Loading} from "ionic-angular";
import {DatabaseService} from "../../providers/database-service";
import {FirebaseObjectObservable, FirebaseListObservable} from "angularfire2";

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class Profile {
  public loading: Loading;
  uid: string;
  user: FirebaseObjectObservable<any>;
  lists: FirebaseListObservable<any>[];

  constructor(public loadingCtrl: LoadingController, public navParams: NavParams, private databaseService: DatabaseService) {
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
    this.lists = [];
    this.databaseService.getLists(this.uid).subscribe(_lists => {
      _lists.forEach(_list => {
        this.lists.push(this.databaseService.getList(this.uid, _list.key));
      });
    }, err => console.log(err));
    this.dismissLoading();
  }
}
