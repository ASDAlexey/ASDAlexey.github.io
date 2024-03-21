import { ClipboardModule } from '@angular/cdk/clipboard';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormField, MatOption, MatSelect } from '@angular/material/select';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterOutlet } from '@angular/router';
import { LetDirective, PushPipe } from '@ngrx/component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { DropdownModule } from 'primeng/dropdown';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { LoadingComponent } from './components/loading/loading.component';
import { BaseUrlInterceptor } from './interceptors/base-url.interceptor';
import { default as icons } from './modules/svg-icon/generated-svg/svg-icons';
import { SvgIconModule } from './modules/svg-icon/svg-icon.module';
import { SVG_REGISTRY_TOKEN } from './modules/svg-icon/svg-icon.token';
import { ExcludePipe } from './pipe/exclude.pipe';

@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    RouterOutlet,
    SvgIconModule,
    MatButtonModule,
    ClipboardModule,
    environment.production ? [] : StoreDevtoolsModule.instrument({ maxAge: 300, connectInZone: true }),
    LetDirective,
    DropdownModule,
    ReactiveFormsModule,
    MatSelect,
    MatOption,
    MatFormField,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    LoadingComponent,
    PushPipe,
    MatIcon,
    ExcludePipe,
  ],
  providers: [
    { provide: SVG_REGISTRY_TOKEN, useValue: icons },
    { provide: HTTP_INTERCEPTORS, useClass: BaseUrlInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
