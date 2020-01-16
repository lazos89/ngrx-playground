import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
  createReducer,
  on
} from '@ngrx/store';
import * as fromAuthActions from './../auth.actions';
import { User } from 'src/app/models/user.model';

export interface AuthState {
  user: User;
}

export const initialState: AuthState = {
  user: undefined
};

export const authReducer = createReducer(
  initialState,

  on(fromAuthActions.login, (state, action) => ({
    // state.user = action.user;
    // return state;
    ...state,
    user: action.user
  })),

  on(fromAuthActions.logout, (state, action) => ({
    ...state,
    user: undefined
  }))
);
