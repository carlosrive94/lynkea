import {Injectable} from "@angular/core";
import {DatabaseService} from "./database-service";
import {AuthProviders, FirebaseAuth, FirebaseAuthState, AuthMethods} from "angularfire2";

@Injectable()
export class AuthService {

  private authState: FirebaseAuthState;

  constructor(public auth$: FirebaseAuth, private databaseService: DatabaseService) {
    auth$.subscribe((state: FirebaseAuthState) => {
      this.authState = state;
    });
  }

  get authenticated(): boolean {
    return this.authState !== null;
  }

  getCurrentUid(): string {
    return this.authState.uid;
  }

  signInWithFacebook(): void {
    this.auth$.login({
      provider: AuthProviders.Facebook,
      method: AuthMethods.Popup
    }).then(() => {
      this.updateUser(this.authState.uid, this.authState.facebook);
    });
  }

  signInWithGoogle(): void {
    this.auth$.login({
      provider: AuthProviders.Google,
      method: AuthMethods.Popup
    }).then(() => {
      this.updateUser(this.authState.uid, this.authState.google);
    });
  }

  updateUser(uid: string, user: firebase.UserInfo): void {
    if (user.uid != null) {
      this.databaseService.storeUser(uid, user);
    }
  }

  signOut(): void {
    this.auth$.logout();
  }

}
