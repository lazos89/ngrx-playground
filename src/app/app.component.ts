import { Component, OnInit, ɵConsole } from '@angular/core';
// import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router
} from '@angular/router';
import { Store, select } from '@ngrx/store';
import { AuthState } from './auth/reducers/index';
import { AppState } from './reducers/index';
import { selectLoggedIn } from './auth/auth.selectors';
import * as fromAuthActions from './auth/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  loading = true;

  isLoggedIn$: Observable<boolean>;
  constructor(private router: Router, private store: Store<AppState>) {}

  ngOnInit() {
    // this.store.subscribe(state => console.log('store value', state));
    this.isLoggedIn$ = this.store.pipe(select(selectLoggedIn));

    this.router.events.subscribe(event => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.loading = true;
          break;
        }

        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          this.loading = false;
          break;
        }
        default: {
          break;
        }
      }
    });
  }

  logout() {
    this.store.dispatch(fromAuthActions.logout());
  }
}
