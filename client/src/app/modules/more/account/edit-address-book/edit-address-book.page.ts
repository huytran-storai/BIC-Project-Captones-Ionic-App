import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegularExpression } from 'src/app/shared/validate/constants';

@Component({
  selector: 'app-edit-address-book',
  templateUrl: './edit-address-book.page.html',
  styleUrls: ['./edit-address-book.page.scss'],
})
export class EditAddressBookPage implements OnInit {

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

  UpdateAddressForm() {
    if (this.editForm.valid) {
      this.router.navigate(['/home']);
    }
  }

  update() {
    this.router.navigate(['/home']);
  }

  onCheckboxChange(type: 'billing' | 'delivery') {
    if (type === 'billing') {
      this.deliveryChecked = false;
    } else if (type === 'delivery') {
      this.billingChecked = false;
    }
  }

  ngOnInit() {
  }

}
