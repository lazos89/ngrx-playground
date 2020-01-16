import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Course } from './model/course';
import { Store, select } from '@ngrx/store';
import { AppState } from '../reducers';
import * as fromCoursesActions from './courses.actions';
import { Observable } from 'rxjs';
import { tap, first, finalize, filter } from 'rxjs/operators';
import { areCoursesLoaded } from './courses.selector';

@Injectable({ providedIn: 'root' })
export class CoursesResolver implements Resolve<any> {
  loading = false;
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return this.store.pipe(
      select(areCoursesLoaded),
      tap(coursesLoaded => {
        if (!this.loading && !coursesLoaded) {
          this.loading = true;
          this.store.dispatch(fromCoursesActions.loadAllCourses());
        }
      }),
      filter(coursesLoaded => coursesLoaded),
      first(),
      finalize(() => (this.loading = false))
    );
  }
  constructor(private store: Store<AppState>) {}
}
