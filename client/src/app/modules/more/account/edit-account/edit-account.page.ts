import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegularExpression } from 'src/app/shared/validate/constants';

@Component({
  selector: 'app-edit-account',
  templateUrl: './edit-account.page.html',
  styleUrls: ['./edit-account.page.scss'],
})
export class EditAccountPage implements OnInit {
  showCurrentPassword: boolean = false;
  showNewPassword: boolean = false;
  showConfirmNewPassword: boolean = false;
  editForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.editForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(RegularExpression.Password)]],
    });
  }
  
  ngOnInit() {
  }

  UpdateForm() {
    if (this.editForm.valid) {
      this.router.navigate(['/home']);
    }
  }

  update() {
    this.router.navigate(['/home']);
  }



}
