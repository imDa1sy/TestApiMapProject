import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { Http, Headers, Response, RequestOptions, ResponseContentType } from '@angular/http';
import { Router } from '@angular/router';
import { restConfig } from '../restConfig';
import { PasswordValidation } from './password-validation';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;
  private formSubmitAttempt: boolean;

  constructor(private router: Router,
    private http: Http, private fb: FormBuilder,
    private authService: AuthService,
    public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.form = this.fb.group({
      role: ['1'],
      userName: ['', Validators.required],
      password: ['', Validators.required],
      userEmail: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, {
        validator: PasswordValidation.MatchPassword
      });
  }
  isFieldInvalid(field: string) {
    return (
      (!this.form.get(field).valid && this.form.get(field).touched) ||
      (this.form.get(field).untouched && this.formSubmitAttempt)
    );
  }

  onSubmit() {
    if (this.form.valid) {

      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });

      this.http.post('http://' + restConfig.Host + ':' + restConfig.Port + '/api/insertuser',
        JSON.stringify({
          role: this.form.value.role,
          userName: this.form.value.userName,
          password: this.form.value.password,
          userEmail: this.form.value.userEmail,
        }), options).subscribe(
          (data) => {

            if (data.ok) {
              this.snackBar.open("Successfuly ", " registred!", {
                duration: 4000,
              });
              this.router.navigate(['biodeseuri/new-energy-from-waste']).then(() => { this.router.navigate(['biodeseuri/new-energy-from-waste/login']); })

            } else if (!data.ok) {
              this.snackBar.open("Error ", " occurred!", {
                duration: 4000,
              });
            }
          });
    }
    this.formSubmitAttempt = true;
  }
}


