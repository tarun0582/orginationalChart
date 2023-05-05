import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OrgChartComponent } from './org-chart/org-chart.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BasicPrimitivesModule } from 'ngx-basic-primitives';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { MatDialogModule} from '@angular/material/dialog'; 
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatCardModule} from '@angular/material/card'; 

@NgModule({
  declarations: [
    AppComponent,
    OrgChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BasicPrimitivesModule,
    HttpClientModule,
    MatDialogModule,
    MatRadioModule,
    MatCardModule,
    MatProgressBarModule,
    FormsModule,
  ],
  providers: [
    { 
      provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor , multi:true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}