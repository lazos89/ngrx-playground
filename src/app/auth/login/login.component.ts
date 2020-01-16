import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// import { Store } from '@ngrx/store';

import { AuthService } from '../auth.service';
import { tap } from 'rxjs/operators';
import { noop } from 'rxjs';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import * as fromAuthActions from '../auth.actions';
import { AuthState } from '../reducers';
interface FormValues {
  email: string;
  password: string;
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private store: Store<AuthState>
  ) {
    this.form = fb.group({
      email: ['test@test.com', [Validators.required]],
      password: ['test', [Validators.required]]
    });
  }
  ngOnInit() {}

  login() {
    const val = this.form.value;

    this.auth
      .login(val.email, val.password)
      .pipe(
        tap(user => {
          this.store.dispatch(fromAuthActions.login({ user }));
          this.router.navigateByUrl('/home');
        })
      )
      .subscribe(noop, err => alert('HTTP Error: ' + err[1]));
  }
}
