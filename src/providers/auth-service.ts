import {Injectable} from "@angular/core";
import {DatabaseService} from "./database-service";
import {AuthProviders, FirebaseAuth, FirebaseAuthState, AuthMethods} from "angularfire2";

@Injectable()
export class AuthService {
  private authState: FirebaseAuthState;

  constructor(public auth$: FirebaseAuth, private databaseService: DatabaseService) {
    this.authState = auth$.getAuth();
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
      this.databaseService.storeUser(this.authState.facebook);
    });
  }

  signOut(): void {
    this.auth$.logout();
  }

}
