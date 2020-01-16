import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { Course, compareCourses } from './model/course';
import * as fromCoursesActions from './courses.actions';
import { createReducer, on } from '@ngrx/store';

export interface CoursesState extends EntityState<Course> {
  allCoursesLoaded: boolean;
}

export const adapter = createEntityAdapter<Course>({
  sortComparer: compareCourses
  // selectId: course => course.id
});

export const initialCoursesState = adapter.getInitialState({
  allCoursesLoaded: false
});

export const coursesReducer = createReducer(
  initialCoursesState,
  on(fromCoursesActions.allCoursesLoaded, (state, action) =>
    adapter.addAll(action.courses, { ...state, allCoursesLoaded: true })
  )
);

export const { selectAll } = adapter.getSelectors();
// export function reducer(state: State | undefined, action: Action) {
//   return coursesReducer(state, action);
// }
