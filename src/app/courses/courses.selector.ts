import { createSelector, createFeatureSelector } from '@ngrx/store';
import { CoursesState } from './course.reducer';
import * as fromCourses from './course.reducer';
import { Course } from './model/course';

export const selectCoursesState = createFeatureSelector<CoursesState>(
  'courses'
);

export const selectAllCourses = createSelector(
  selectCoursesState,
  fromCourses.selectAll
);
export const selectBeginnerCourses = createSelector(
  selectAllCourses,
  (courses: Course[]) =>
    courses.filter(course => course.category === 'BEGINNER')
);
export const selectAdvancedCourses = createSelector(
  selectAllCourses,
  (courses: Course[]) =>
    courses.filter(course => course.category === 'ADVANCED')
);
export const selectPromoTotal = createSelector(
  selectAllCourses,
  (courses: Course[]) => courses.filter(course => course.promo).length
);
export const areCoursesLoaded = createSelector(
  selectCoursesState,
  state => state.allCoursesLoaded
);
