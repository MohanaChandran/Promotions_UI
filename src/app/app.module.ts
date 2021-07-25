import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'; 
import { ReactiveFormsModule } from '@angular/forms';

// used to create fake backend
import { fakeBackendProvider } from './helpers';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { KeywordCreateComponent } from './components/keyword-create/keyword-create.component';
import { KeywordDetailsComponent } from './components/keyword-details/keyword-details.component';
import { KeywordListComponent } from './components/keyword-list/keyword-list.component';

import { ErrorInterceptor } from './helpers';
import { AlertComponent } from './components/alert/alert.component';


@NgModule({
  declarations: [
    AppComponent,   
    KeywordCreateComponent,
    KeywordDetailsComponent,
    KeywordListComponent,
    AlertComponent    
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
   
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        
        // provider used to create fake backend
        //fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
