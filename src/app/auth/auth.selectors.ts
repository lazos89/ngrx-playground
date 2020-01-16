import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../reducers/index';
import { AuthState } from './reducers/index';

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectLoggedIn = createSelector(
  selectAuthState,
  (auth: AuthState) => !!auth.user
);
