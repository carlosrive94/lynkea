import {FirebaseObjectObservable, FirebaseListObservable} from "angularfire2";
export class Lyst {
  info: FirebaseObjectObservable<any>;
  lynks: FirebaseListObservable<any>;

  constructor() {
  }
}
