import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
    }

    onSubmit() {
        console.log("handle submit event");
        console.log(this.checkoutFormGroup?.get('customer')?.value);
        console.log(this.checkoutFormGroup?.get('customer')?.value.email);
    }

    copyShippingAddressToBillingAddress(event: any) {
        if(event.target.checked) {
            this.checkoutFormGroup?.controls['billingAddress'].setValue(this.checkoutFormGroup.controls['shippingAddress'].value);
        } else {
            this.checkoutFormGroup?.controls['billingAddress'].reset();
        }
    }

}
