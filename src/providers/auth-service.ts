import {Injectable} from "@angular/core";
import {DatabaseService} from "./database-service";
import {AuthProviders, FirebaseAuth, FirebaseAuthState, AuthMethods} from "angularfire2";
import {User} from "../components/user";

@Injectable()
export class AuthService {

  private authState: FirebaseAuthState;
  public currentUser: User;

  constructor(public auth$: FirebaseAuth, private databaseService: DatabaseService) {
    auth$.subscribe((state: FirebaseAuthState) => {
      this.authState = state;
    });
  }

  get authenticated(): boolean {
    return this.authState !== null;
  }

  signInWithFacebook(): void {
    this.auth$.login({
      provider: AuthProviders.Facebook,
      method: AuthMethods.Popup
    }).then(() => {
      this.updateUser(this.authState.facebook);
    });
  }

  signInWithGoogle(): void {
    this.auth$.login({
      provider: AuthProviders.Google,
      method: AuthMethods.Popup
    }).then(() => {
      this.updateUser(this.authState.google);
    });
  }

  updateUser(user: firebase.UserInfo): void {
    if (user.uid != null) {
      this.currentUser = user;
      this.databaseService.storeUser(user);
    }
  }

  signOut(): void {
    this.auth$.logout();
  }

}
