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
    return this.af.database.list('/users/' + uid + '/lysts', {preserveSnapshot: true});
  }

  getLyst(lystKey: string): Lyst {
    let lyst = new Lyst();
    lyst.info = this.getLystInfo(lystKey);
    lyst.lynks = this.getLystLynks(lystKey);
    return lyst;
  }

  getLystInfo(lystKey: string): FirebaseObjectObservable<any> {
    return this.af.database.object('/lysts/' + lystKey);
  }

  getLystLynks(lystKey: string): FirebaseListObservable<any> {
    return this.af.database.list('/lysts/' + lystKey + '/lynks');
  }

  addLynk(uid: string, lystKey: string, lynkName: string, lynkUrl: string) {
    const lyst = this.af.database.list('/lysts/' + lystKey + '/lynks');
    lyst.push({name: lynkName, url: lynkUrl, postedBy: uid});
  }

  addLyst(uid: string, lystName: string) {
    const lysts = this.af.database.list('/lysts/');
    const promise = lysts.push({owner: uid, name: lystName});
    promise.then(data => {
      this.addLystToUser(uid, data.key);
    });
  }

  private addLystToUser(uid: string, lystKey: string) {
    const userLysts = this.af.database.list('/users/' + uid + '/lysts/');
    userLysts.push({lystKey: lystKey});
  }
}
