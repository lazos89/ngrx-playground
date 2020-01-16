import { Injectable } from '@angular/core';
import { Actions, Effect, ofType, createEffect } from '@ngrx/effects';
import * as fromCoursesActions from './courses.actions';
import { concatMap, map } from 'rxjs/operators';
import { CoursesHttpService } from './services/courses-http.service';
@Injectable()
export class CoursesEffects {
  loadCourses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromCoursesActions.loadAllCourses),
      concatMap(_ => this.coursesHttpService.findAllCourses()),
      map(courses => fromCoursesActions.allCoursesLoaded({ courses }))
    )
  );
  constructor(
    private actions$: Actions,
    private coursesHttpService: CoursesHttpService
  ) {}
}
