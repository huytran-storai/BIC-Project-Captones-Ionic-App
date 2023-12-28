import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegularExpression } from 'src/app/shared/validate/constants';
import { MaskitoOptions, MaskitoElementPredicateAsync } from '@maskito/core';


@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.page.html',
  styleUrls: ['./add-address.page.scss'],
})
export class AddAddressPage implements OnInit {
  billingChecked: boolean = false;
  deliveryChecked: boolean = false;
  editForm: FormGroup;
  
  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.editForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern(RegularExpression.OnlyAlphabets)]],
      address: ['', [Validators.required, Validators.pattern(RegularExpression.AddressPattern)]],
      billingChecked: ['', [Validators.required,]],
      deliveryChecked: ['', [Validators.required,]],
      city: ['', [Validators.required,]],
      state: ['', [Validators.required,]],
      code: ['', [Validators.required, Validators.pattern(RegularExpression.ZipPattern)]],
      phone: ['', [Validators.required, Validators.pattern(RegularExpression.PhoneNumber)]],
    });
  }

  ngOnInit() {
  }

  SaveForm() {
    if (this.editForm.valid) {
      this.router.navigate(['/home']);
    }
  }

  save() {
    this.router.navigate(['/home']);
  }

  onCheckboxChange(type: 'billing' | 'delivery') {
    if (type === 'billing') {
      this.deliveryChecked = false;
    } else if (type === 'delivery') {
      this.billingChecked = false;
    }
  }

  readonly phoneMask: MaskitoOptions = {
    mask: ['+', '8', '4', ' ', '(', /\d/, /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/],
  };

  readonly maskPredicate: MaskitoElementPredicateAsync = async (el) => (el as HTMLIonInputElement).getInputElement();



}
