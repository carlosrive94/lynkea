import {Injectable} from "@angular/core";
import {AngularFire, FirebaseObjectObservable, FirebaseListObservable} from "angularfire2";

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

  getLyst(lystKey: string): FirebaseObjectObservable<any> {
    return this.af.database.object('/lysts/' + lystKey);
  }

  getUserLysts(uid: string): FirebaseListObservable<any> {
    return this.af.database.list('/lysts/', {
      query: {
        orderByChild: 'uid',
        equalTo: uid
      }
    });
  }

  getLystLynks(lystKey: string): FirebaseListObservable<any> {
    return this.af.database.list('/lynks/', {
      query: {
        orderByChild: 'lystKey',
        equalTo: lystKey
      }
    });
  }

  addLynk(uid: string, lystKey: string, lynkName: string, lynkUrl: string) {
    const lyst = this.af.database.list('/lynks/');
    lyst.push({name: lynkName, url: lynkUrl, postedBy: uid, lystKey: lystKey});
  }

  addLyst(uid: string, lystName: string) {
    const lysts = this.af.database.list('/lysts/');
    lysts.push({uid: uid, name: lystName});
  }

  removeLyst(lystKey: string) {
    const lyst = this.af.database.object('/lysts/' + lystKey);
    lyst.remove();
  }
}
