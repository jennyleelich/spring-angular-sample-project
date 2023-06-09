import { Component, Inject, OnInit } from '@angular/core';
import { OKTA_AUTH, OktaAuthStateService } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-login-status',
  templateUrl: './login-status.component.html',
  styleUrls: ['./login-status.component.scss']
})
export class LoginStatusComponent implements OnInit {
	storage: Storage = sessionStorage;
	isAuthenticated: boolean | undefined = false;
	userFullName: string = '';
	constructor(private oktaAuthService: OktaAuthStateService,private cartService: CartService,
		@Inject(OKTA_AUTH) private oktaAuth: OktaAuth) {

	}
	ngOnInit(): void {
		// Subscribe to authentication state changes
		this.oktaAuthService.authState$.subscribe(result => {
			this.isAuthenticated = result.isAuthenticated;
			this.getUserDetails();
		})
		
	}
	getUserDetails() {
		if (this.isAuthenticated) {
			//Fetch the logged in User details 
			this.oktaAuth.getUser().then(res => {
				this.userFullName = res.name as string;

				const theEmail = res.email;

				this.storage.setItem('userEmail', JSON.stringify(theEmail));
			})
		}
	}

	logout() {
		// Terminates the session with Okta and removes current tokens
		this.oktaAuth.signOut();
		sessionStorage.clear();
		this.cartService.totalPriceValue = 0;
		this.cartService.totalQuantityValue = 0;
		this.cartService.cartItems = [];
	}

}
