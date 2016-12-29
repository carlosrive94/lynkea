import {Component} from "@angular/core";
import {NavController} from "ionic-angular";
import {AuthService} from "../../providers/auth-service";
import {Lynk} from "../../components/lynk";
import {Profile} from "../profile/profile";


const LYNKS: Lynk[] = [{id: 1, link: 'asdsa'}, {id: 2, link: 'qqwqw'}]

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  lynks = LYNKS;

  constructor(public navCtrl: NavController, private authService: AuthService) {
  }

  logout(): void {
    this.authService.signOut();
  }

  authenticated(): boolean {
    return this.authService.authenticated;
  }

  signIn(provider): void {
    if (provider == "Facebook") this.authService.signInWithFacebook();
    if (provider == "Google") this.authService.signInWithGoogle();
  }

  myProfile(): void {
    this.navCtrl.push(Profile, {userProfile: this.authService.currentUser});
  }

}
