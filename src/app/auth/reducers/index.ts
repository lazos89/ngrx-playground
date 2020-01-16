import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
  createReducer,
  on
} from '@ngrx/store';
import * as fromAuthAction from './../auth.actions';
import { User } from 'src/app/models/user.model';

export interface AuthState {
  user: User;
}

export const initialState: AuthState = {
  user: undefined
};

export const authReducer = createReducer(
  initialState,

  on(fromAuthAction.login, (state, action) => ({
    ...state,
    user: action.user
  })),

  on(fromAuthAction.logout, (state, action) => ({
    ...state,
    user: undefined
  }))
);
