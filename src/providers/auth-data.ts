import { Injectable } from '@angular/core';
import { AuthProviders, FirebaseAuth, FirebaseAuthState, AuthMethods } from 'angularfire2';

@Injectable()
export class AuthData {
  private authState: FirebaseAuthState;
  
  constructor(public auth$: FirebaseAuth) {
    this.authState = auth$.getAuth();
    auth$.subscribe((state: FirebaseAuthState) => {
      this.authState = state;
    });
  }
  
  get authenticated(): boolean {
    return this.authState !== null;
  }
  
  signInWithFacebook(): firebase.Promise<FirebaseAuthState> {
    return this.auth$.login({
      provider: AuthProviders.Facebook,
      method: AuthMethods.Popup
    });
  }
  
  signOut(): void {
    this.auth$.logout();
  }

  displayName(): string {
    if (this.authState != null) {
      return this.authState.facebook.displayName;
    } else {
      return '';
    }
  }
/*
  fireAuth: any;

  constructor(public af: AngularFire) {
    af.auth.subscribe( user => {
      if (user) { this.fireAuth = user.auth; }
    });
  }

  loginUser(newEmail: string, newPassword: string): any {
    return this.af.auth.login({
      email: newEmail,
      password: newPassword
    });
  }

  resetPassword(email: string): any {
    return firebase.auth().sendPasswordResetEmail(email);
  }

  logoutUser(): any {
    this.af.auth.logout();
  }

  signupUser(newEmail: string, newPassword: string): any {
    return this.af.auth.createUser({ 
      email: newEmail, 
      password: newPassword 
    });
  }*/

}
