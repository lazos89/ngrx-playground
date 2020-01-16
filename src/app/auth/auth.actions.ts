import { createAction, props } from '@ngrx/store';
import { User } from '../models/user.model';

export const login = createAction(
  '[Login ]  Login user',
  props<{ user: User }>()
);

export const logout = createAction('[Logout] Logout');
