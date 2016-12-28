import {Injectable} from "@angular/core";
import {AngularFire} from "angularfire2";

@Injectable()
export class DatabaseService {

  constructor(public af: AngularFire) {
  }

  storeUser(user: firebase.UserInfo) {
    if(user.uid != null) {
      const itemObservable = this.af.database.object('/users/' + user.uid);
      itemObservable.update(user);
    }
  }
}
