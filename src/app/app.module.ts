import { BrowserModule } from '@angular/platform-browser';
import { NgModule, enableProdMode } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material/material.module';
import { LoginComponent } from './auth/login/login.component';
import { FormsModule } from '@angular/forms';
import { RootComponent } from './admin/root/root.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { CustomeHttpService } from './service/custome-http.service';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { OrderModule } from 'ngx-order-pipe';

import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { AuthGuard } from './guard/auth/auth.guard';
import { NgSelectModule } from '@ng-select/ng-select';
import { ExcelService } from './service/excel.service';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import { AppDateAdapter, APP_DATE_FORMATS } from './dateFormaterMaterial';
import { JobTitleComponent } from './masters/job-title/job-title.component';
import { DegreeComponent } from './masters/degree/degree.component';
import { FieldOfStudyComponent } from './masters/field-of-study/field-of-study.component';
import { AccomplishmentsComponent } from './masters/accomplishments/accomplishments.component';
import { JobTitleSubDataComponent } from './masters/job-title-sub-data/job-title-sub-data.component';
import { AffiliationsComponent } from './masters/affiliations/affiliations.component';
import { CertificationsComponent } from './masters/certifications/certifications.component';
import { SkillsComponent } from './masters/skills/skills.component';
import { SummaryComponent } from './masters/summary/summary.component';
import { JobDescriptionComponent } from './masters/job-description/job-description.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { Resumr1Component } from './resumeTemplate/resumr1/resumr1.component';
import { Resumr2Component } from './resumeTemplate/resumr2/resumr2.component';
import { Resumr3Component } from './resumeTemplate/resumr3/resumr3.component';
import { Resumr4Component } from './resumeTemplate/resumr4/resumr4.component';
import { Resumr5Component } from './resumeTemplate/resumr5/resumr5.component';
import { Resumr6Component } from './resumeTemplate/resumr6/resumr6.component';
import { HomeComponent } from './admin/home/home.component';
import { UserDataComponent } from './masters/user-data/user-data.component';
import { ManageAdminComponent } from "./admin/manage-admin/manage-admin.component";

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
        suppressScrollX: true
};


enableProdMode();
@NgModule({
        declarations: [
                AppComponent,
                LoginComponent,
                RootComponent,
                DashboardComponent, 
                JobTitleComponent,
                DegreeComponent,
                FieldOfStudyComponent,
                AccomplishmentsComponent,
                JobTitleSubDataComponent,
                AffiliationsComponent,
                CertificationsComponent,
                SkillsComponent,
                SummaryComponent,
                JobDescriptionComponent,
                Resumr1Component,
                Resumr2Component,
                Resumr3Component,
                Resumr4Component,
                Resumr5Component,
                Resumr6Component,
                HomeComponent,
                UserDataComponent,
                ManageAdminComponent
        ],
        imports: [
                BrowserModule,
                FormsModule,
                PerfectScrollbarModule, NoopAnimationsModule,
                HttpClientModule,
                NgSelectModule,
                BrowserAnimationsModule,
                MaterialModule,
                NgbModule,
                ToastrModule.forRoot({
                        timeOut: 3000,
                        positionClass: 'toast-bottom-right'
                      }),
                OrderModule,
                AppRoutingModule
        ],
        providers: [
                CustomeHttpService, AuthGuard, ExcelService,
                {
                        provide: PERFECT_SCROLLBAR_CONFIG,
                        useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
                },
                {
                        provide: LocationStrategy,
                        useClass: HashLocationStrategy
                }

        ],
        bootstrap: [AppComponent]
})
export class AppModule { }


