import { Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductService } from './service/product.service';
import { Router, RouterModule, Routes } from '@angular/router';
import { ProductCategoryMenuComponent } from './components/product-category-menu/product-category-menu.component';
import { SearchComponent } from './components/search/search.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CartStatusComponent } from './components/cart-status/cart-status.component';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { LoginStatusComponent } from './components/login-status/login-status.component';
import {
    OktaAuthModule,
    OktaCallbackComponent,
    OKTA_CONFIG,
    OktaAuthGuard
} from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';
import myAppConfig from './config/my-app-config';
import { MembersPageComponent } from './components/members-page/members-page.component';
const oktaConfig = myAppConfig.oidc;
const oktaAuth = new OktaAuth(oktaConfig);
function sendToLoginPage(oktaAuth: OktaAuth, injector: Injector) {
    const router = injector.get(Router);

    router.navigate(['/login']);

}
const routes: Routes = [
    { path: 'category/:id', component: ProductListComponent },
    { path: 'category', component: ProductListComponent },
    { path: 'products', component: ProductListComponent },
    { path: 'search/:keyword', component: ProductListComponent },
    { path: 'products/:id', component: ProductDetailsComponent },
    { path: 'cartDetail', component: CartDetailsComponent },
    { path: 'checkout', component: CheckoutComponent },
    { path: 'login/callback', component: OktaCallbackComponent },
    { path: 'login', component: LoginComponent },
    { path: 'members', component: MembersPageComponent, canActivate: [OktaAuthGuard], data: { onAuthRequired: sendToLoginPage } },
    { path: '', redirectTo: '/products', pathMatch: 'full' },
    { path: '**', redirectTo: '/products', pathMatch: 'full' }
]
@NgModule({
    declarations: [
        AppComponent,
        ProductListComponent,
        ProductCategoryMenuComponent,
        SearchComponent,
        ProductDetailsComponent,
        CartStatusComponent,
        CartDetailsComponent,
        CheckoutComponent,
        LoginComponent,
        LogoutComponent,
        LoginStatusComponent,
        MembersPageComponent

    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        RouterModule.forRoot(routes),
        NgbModule,
        ReactiveFormsModule,
        OktaAuthModule
    ],
    providers: [ProductService, { provide: OKTA_CONFIG, useValue: { oktaAuth } }],
    bootstrap: [AppComponent]
})
export class AppModule { }
