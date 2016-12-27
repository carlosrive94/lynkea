import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthData } from '../../providers/auth-data';
import { HomePage } from '../home/home';
import { SignupPage } from '../signup/signup';
import { EmailValidator } from '../../validators/email';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

	constructor(public navCtrl: NavController, private authData: AuthData) {}
	
	signInWithFacebook(): void {
		this.authData.signInWithFacebook()
		  .then(() => this.onSignInSuccess());
	}
	
	private onSignInSuccess(): void {
		console.log("Facebook display name ",this.authData.displayName());
	}
	
	createAccount(){
		this.navCtrl.push(SignupPage);
	}

}
