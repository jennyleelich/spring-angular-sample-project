import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Country } from 'src/app/common/country';
import { Order } from 'src/app/common/order';
import { OrderItem } from 'src/app/common/order-item';
import { Purchase } from 'src/app/common/purchase';
import { State } from 'src/app/common/state';
import { CartService } from 'src/app/service/cart.service';
import { CheckoutService } from 'src/app/service/checkout.service';
import { FormService } from 'src/app/service/form.service';
import { FormValidators } from 'src/app/validators/form-validators';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit{
    checkoutFormGroup: FormGroup | undefined;
    creditCardYears: number[] = [];
    creditCardMonths: number[] = [];
    countryList: Country[]= [];
    shippingStateList: State[]=[];
    billingStateList: State[]=[];
    constructor(private formBuilder: FormBuilder, 
        public cartService: CartService, 
        private formSvc:FormService,
        private checkoutSvc: CheckoutService,
        private router: Router) {

    }
    get firstName() {
        return this.checkoutFormGroup?.get('customer.firstName');
    }
    get lastName() {
        return this.checkoutFormGroup?.get('customer.lastName');
    }
    get email() {
        return this.checkoutFormGroup?.get('customer.email');
    }

    get blStreet() {
        return this.checkoutFormGroup?.get('billingAddress.street');
    }
    get blCity() {
        return this.checkoutFormGroup?.get('billingAddress.city');
    }
    get blState() {
        return this.checkoutFormGroup?.get('billingAddress.state');
    }
    get blCountry() {
        return this.checkoutFormGroup?.get('billingAddress.country');
    }
    get blZipCode() {
        return this.checkoutFormGroup?.get('billingAddress.zipCode');
    }
    get saStreet() {
        return this.checkoutFormGroup?.get('shippingAddress.street');
    }
    get saCity() {
        return this.checkoutFormGroup?.get('shippingAddress.city');
    }
    get saState() {
        return this.checkoutFormGroup?.get('shippingAddress.state');
    }
    get saCountry() {
        return this.checkoutFormGroup?.get('shippingAddress.country');
    }
    get saZipCode() {
        return this.checkoutFormGroup?.get('shippingAddress.zipCode');
    }
    get cardType() {
        return this.checkoutFormGroup?.get('creditCard.cardType');
    }
     get nameOnCard() {
        return this.checkoutFormGroup?.get('creditCard.nameOnCard');
    } 
    get cardNumber() {
        return this.checkoutFormGroup?.get('creditCard.cardNumber');
    } 
    get securityCode() {
        return this.checkoutFormGroup?.get('creditCard.securityCode');
    } 
    get expirationMonth() {
        return this.checkoutFormGroup?.get('creditCard.expirationMonth');
    } 
    get expirationYear() {
        return this.checkoutFormGroup?.get('creditCard.expirationYear');
    }
    ngOnInit(): void {
        this.checkoutFormGroup = this.formBuilder.group({
            customer: this.formBuilder.group({
                firstName: new FormControl('', [Validators.required, Validators.minLength(2), FormValidators.notOnlyWhitespace]),
                lastName: new FormControl('', [Validators.required, Validators.minLength(2), FormValidators.notOnlyWhitespace]),
                email: new FormControl(JSON.parse(sessionStorage.getItem('userEmail')!),
                [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')])
            }),
            shippingAddress: this.formBuilder.group({
                street: new FormControl('', [Validators.required, Validators.minLength(2), FormValidators.notOnlyWhitespace]),
                city: new FormControl('', [Validators.required, Validators.minLength(2), FormValidators.notOnlyWhitespace]),
                country:new FormControl('', [Validators.required]),
                state:new FormControl('', [Validators.required]),
                zipCode:new FormControl('', [Validators.required, Validators.minLength(2), FormValidators.notOnlyWhitespace])
            }),
            billingAddress: this.formBuilder.group({
                street: new FormControl('', [Validators.required, Validators.minLength(2), FormValidators.notOnlyWhitespace]),
                city: new FormControl('', [Validators.required, Validators.minLength(2), FormValidators.notOnlyWhitespace]),
                country:new FormControl('', [Validators.required]),
                state:new FormControl('', [Validators.required]),
                zipCode:new FormControl('', [Validators.required, Validators.minLength(2), FormValidators.notOnlyWhitespace])
            }),
            creditCard: this.formBuilder.group({
                cardType: new FormControl('', [Validators.required]),
                nameOnCard: new FormControl('', [Validators.required, Validators.minLength(2), FormValidators.notOnlyWhitespace]),
                cardNumber:new FormControl('', [Validators.required, Validators.pattern('[0-9]{16}')]),
                securityCode:new FormControl('', [Validators.required, Validators.pattern('[0-9]{3}')]),
                expirationMonth:[''],
                expirationYear: ['']
            }),
            
        })
        const startMonth: number = 1;
        this.formSvc.getCreditCardMonths(startMonth).subscribe((data)=> {
            this.creditCardMonths = data;
        })
        this.formSvc.getCreditCardYears().subscribe((data)=> {
            this.creditCardYears = data;
        })
        this.formSvc.getCountries().subscribe(data => {
            this.countryList = data;
        })
    }

    onSubmit() {
        if (this.checkoutFormGroup?.invalid) {
            this.checkoutFormGroup.markAllAsTouched();
            return;
        }

        // setup and get order
        let order = new Order();
        order.totalPrice = this.cartService.totalPriceValue;
        order.totalQuantity = this.cartService.totalQuantityValue;

        // get cart items
        const cartItems = this.cartService.cartItems;

        // create orderItems from cartItems
        let orderItems: OrderItem[] = [];
        orderItems = cartItems.map(tempCartItem => new OrderItem(tempCartItem));

        // setup purchase
        let purchase = new Purchase();
        // populate purchase -customer
        purchase.customer = this.checkoutFormGroup?.controls['customer'].value;
        // populate purchase - shipping address
        purchase.shippingAddress = this.checkoutFormGroup?.controls['shippingAddress'].value;
        const shippingState: State = JSON.parse(JSON.stringify(purchase.shippingAddress?.state));
        const shippingCountry: Country = JSON.parse(JSON.stringify(purchase.shippingAddress?.country));
        if (purchase.shippingAddress) { purchase.shippingAddress.state = shippingState.name;}
        if (purchase.shippingAddress) { purchase.shippingAddress.country = shippingCountry.name;}
        // populate purchase - billing address
        purchase.billingAddress = this.checkoutFormGroup?.controls['billingAddress'].value;
        const billingState: State = JSON.parse(JSON.stringify(purchase.billingAddress?.state));
        const billingCountry: Country = JSON.parse(JSON.stringify(purchase.billingAddress?.country));
        if (purchase.billingAddress) { purchase.billingAddress.state = billingState.name;}
        if (purchase.billingAddress) { purchase.billingAddress.country = billingCountry.name;}
        // populate purchase - order and orderitems
        purchase.order = order;
        purchase.orderItems = orderItems;

        this.checkoutSvc.placeOrder(purchase).subscribe({ 
            next: response => {
                alert(`your order has been received, tracking number: ${response.orderTrackingNumber}`)
                this.resetCart();
            },
             error: err => {
                alert(` there was an error: ${err.message}`)
             }
        })
    }
    resetCart() {
        // reset cart data
        this.cartService.cartItems = [];
        this.cartService.totalPriceValue = 0;
        this.cartService.totalQuantityValue = 0;
        this.cartService.totalPrice.next(0);
        this.cartService.totalQuantity.next(0);
        // reset the form
        this.checkoutFormGroup?.reset();
        // nav back to products page
        this.router.navigateByUrl("/products");
    }

    copyShippingAddressToBillingAddress(event: any) {
        if(event.target.checked) {
            this.checkoutFormGroup?.controls['billingAddress'].setValue(this.checkoutFormGroup.controls['shippingAddress'].value);
            this.billingStateList = [...this.shippingStateList];
        } else {
            this.checkoutFormGroup?.controls['billingAddress'].reset();
            this.billingStateList = [];
        }
    }

    updateStates(formGroupName: string) {
       const formGroup = this.checkoutFormGroup?.get(formGroupName);
       const countryCode = formGroup?.value.country.code; // because we use ngValue to bind coutry object to value
       this.formSvc.getStateByCountryCode(countryCode).subscribe(data => {
        if(formGroupName === 'shippingAddress') {
            this.shippingStateList = data;
        } else {
            this.billingStateList = data;
        }
        formGroup?.get('state')?.setValue(data[0]);
       })
    }
}
