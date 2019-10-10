import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validator, Validators } from '@angular/forms';
import { Alert } from 'src/app/classes/alert';
import { AlertType } from 'src/app/enums/alert-type.enum';
import { AlertService } from 'src/app/services/alert.service'
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { LoadingService } from 'src/app/services/loading.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, OnDestroy {

  public signupForm: FormGroup
  private subscriptions: Subscription[] = [];

  constructor(
    private fb: FormBuilder, 
    private alertService: AlertService,
    private auth: AuthService,
    private loandingService: LoadingService,
    private router: Router
    ) {
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
    this.subscriptions.push(
      this.auth.signup(firstName, lestName, email, password).subscribe(success => {
        if(success){
          this.router.navigate(['/chat']);
        }
        this.loandingService.isLoading.next(false);
      })
    );
    } else {
      const failedSignedAlert = new Alert('Please enter a valid name , email and password, try again.',AlertType.Danger);
      this.alertService.alerts.next(failedSignedAlert);
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
