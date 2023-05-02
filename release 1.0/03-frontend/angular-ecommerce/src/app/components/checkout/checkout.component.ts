import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Country } from 'src/app/common/country';
import { State } from 'src/app/common/state';
import { CartService } from 'src/app/service/cart.service';
import { FormService } from 'src/app/service/form.service';

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
    ngOnInit(): void {
        this.checkoutFormGroup = this.formBuilder.group({
            customer: this.formBuilder.group({
                firstName: [''],
                lastName: [''],
                email:['']
            }),
            shippingAddress: this.formBuilder.group({
                street: [''],
                city: [''],
                country:[''],
                state:[''],
                zipCode:['']
            }),
            billingAddress: this.formBuilder.group({
                street: [''],
                city: [''],
                country:[''],
                state:[''],
                zipCode:['']
            }),
            creditCard: this.formBuilder.group({
                cardType: [''],
                nameOnCard: [''],
                country:[''],
                cardNumber:[''],
                securityCode:[''],
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
