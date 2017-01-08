import {Injectable} from "@angular/core";
import {AngularFire, FirebaseObjectObservable, FirebaseListObservable} from "angularfire2";
import {Lyst} from "../components/lynk-list";

@Injectable()
export class DatabaseService {

  constructor(public af: AngularFire) {
  }

  storeUser(uid: string, userInfo: firebase.UserInfo) {
    const user = this.af.database.object('/users/' + uid);
    user.update(userInfo);
  }

  getUser(uid: string): FirebaseObjectObservable<any> {
    return this.af.database.object('/users/' + uid);
  }

  getLystsOfUser(uid: string): FirebaseListObservable<any> {
    return this.af.database.list('/users/' + uid + '/lysts');
  }

  getLynkListsOfUser(uid: string): FirebaseListObservable<any> {
    return this.af.database.list('/users/' + uid + '/lysts', {preserveSnapshot: true});
  }

  getLyst(uid: string, key: string): Lyst {
    var lyst = new Lyst();
    lyst.info = this.af.database.object('/users/' + uid + '/lysts/' + key);
    lyst.lynks = this.af.database.list('/users/' + uid + '/lysts/' + key + '/lynks');
    return lyst;
  }

  addLynk(uid: string, lystKey: string, lynkName: string, lynkUrl: string) {
    const lyst = this.af.database.list('/users/' + uid + '/lysts/' + lystKey + '/lynks');
    lyst.push({name: lynkName, url: lynkUrl});
  }

  addLyst(uid: string, lystName: string) {
    const lyst = this.af.database.list('/users/' + uid + '/lysts/');
    lyst.push({name: lystName});
  }
}
