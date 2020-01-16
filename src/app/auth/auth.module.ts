import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
// import { StoreModule } from '@ngrx/store';
import { AuthService } from './auth.service';
import { StoreModule } from '@ngrx/store';
import { authReducer } from './reducers';
import { reducers, metaReducers } from '../reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './auth.effects';
// import { environment } from '../environments/environment';
// import { EffectsModule } from '@ngrx/effects';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    StoreModule.forFeature('auth', authReducer),
    RouterModule.forChild([{ path: '', component: LoginComponent }]),
    EffectsModule.forFeature([AuthEffects])
    // StoreModule.forRoot(reducers, {
    //   metaReducers,
    //   runtimeChecks: {
    //     strictStateImmutability: true,
    //     strictActionImmutability: true
    //   }
    // }),
    // !environment.production ? StoreDevtoolsModule.instrument() : []
  ],
  declarations: [LoginComponent],
  exports: [LoginComponent]
})
export class AuthModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AuthModule,
      providers: [AuthService]
    };
  }
}
