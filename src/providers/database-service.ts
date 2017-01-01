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

  getLists(uid: string): FirebaseListObservable<any> {
    return this.af.database.list('/users/' + uid + '/lists', {preserveSnapshot: true});
  }

  getList(uid: string, key: string): FirebaseListObservable<any> {
    return this.af.database.list('/users/' + uid + '/lists/' + key);
  }
}
