import {
  selectPromoTotal,
  selectBeginnerCourses,
  selectAdvancedCourses
} from './../courses.selector';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Course, compareCourses } from '../model/course';
import { Observable } from 'rxjs';
import { defaultDialogConfig } from '../shared/default-dialog-config';
import { EditCourseDialogComponent } from '../edit-course-dialog/edit-course-dialog.component';
import { MatDialog } from '@angular/material';
import { map, shareReplay } from 'rxjs/operators';
// import { CourseEntityService } from '../services/course-entity.service';
import { CoursesHttpService } from '../services/courses-http.service';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/reducers';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {
  promoTotal$: Observable<number>;

  beginnerCourses$: Observable<Course[]>;

  loading$: Observable<boolean>;
  advancedCourses$: Observable<Course[]>;

  constructor(
    private dialog: MatDialog,
    // private coursesService: CourseEntityService,
    // private coursesHttpService: CoursesHttpService
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.reload();
  }

  reload() {
    this.beginnerCourses$ = this.store.pipe(select(selectBeginnerCourses));
    this.advancedCourses$ = this.store.pipe(select(selectAdvancedCourses));
    this.promoTotal$ = this.store.pipe(select(selectPromoTotal));
    // const courses$ = this.coursesHttpService.findAllCourses().pipe(
    //   map(courses => courses.sort(compareCourses)),
    //   shareReplay()
    // );

    // this.loading$ = courses$.pipe(map(courses => !!courses));

    // this.beginnerCourses$ = this.coursesService.entities$.pipe(
    //   map(courses => courses.filter(course => course.category === 'BEGINNER'))
    // );

    // this.advancedCourses$ = this.coursesService.entities$.pipe(
    //   map(courses => courses.filter(course => course.category === 'ADVANCED'))
    // );

    // this.promoTotal$ = this.coursesService.entities$.pipe(
    //   map(courses => courses.filter(course => course.promo).length)
    // );
    // this.beginnerCourses$ = courses$.pipe(
    //   map(courses => courses.filter(course => course.category === 'BEGINNER'))
    // );

    // this.advancedCourses$ = courses$.pipe(
    //   map(courses => courses.filter(course => course.category === 'ADVANCED'))
    // );

    // this.promoTotal$ = courses$.pipe(
    //   map(courses => courses.filter(course => course.promo).length)
    // );
  }

  onAddCourse() {
    const dialogConfig = defaultDialogConfig();

    dialogConfig.data = {
      dialogTitle: 'Create Course',
      mode: 'create'
    };

    this.dialog.open(EditCourseDialogComponent, dialogConfig);
  }
}
