import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Country } from 'src/app/common/country';
import { State } from 'src/app/common/state';
import { CartService } from 'src/app/service/cart.service';
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
    constructor(private formBuilder: FormBuilder, public cartService: CartService, private formSvc:FormService) {

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
                email: new FormControl('',
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
        }
        console.log("handle submit event");
        console.log(this.checkoutFormGroup?.get('customer')?.value);
        console.log(this.checkoutFormGroup?.get('customer')?.value.email);
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
