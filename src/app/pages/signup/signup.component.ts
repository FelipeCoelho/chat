import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validator, Validators } from '@angular/forms';
import { Alert } from 'src/app/classes/alert';
import { AlertType } from 'src/app/enums/alert-type.enum';
import { AlertService } from 'src/app/services/alert.service'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  public signupForm: FormGroup

  constructor(private fb: FormBuilder, private alertService: AlertService) {
    this.createForm();
  }

  ngOnInit() {
  }

  private createForm(): void {
    this.signupForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lestName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    })
  }

  public submit(): void {
    if(this.signupForm.valid){
    const { firstName, lestName , email, password } = this.signupForm.value;
    console.log(`First Name: ${firstName}, Lest Name ${lestName}, Email: ${email}, Password: ${password}`);
    } else {
      const failedSignedAlert = new Alert('Please enter a valid name , email and password, try again.',AlertType.Danger);
      this.alertService.alerts.next(failedSignedAlert);
    }
  }

}
