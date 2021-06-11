import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RootComponent } from './admin/root/root.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { AuthGuard } from './guard/auth/auth.guard';
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
import { Resumr1Component } from './resumeTemplate/resumr1/resumr1.component';
import { Resumr6Component } from './resumeTemplate/resumr6/resumr6.component';
import { Resumr5Component } from './resumeTemplate/resumr5/resumr5.component';
import { Resumr4Component } from './resumeTemplate/resumr4/resumr4.component';
import { Resumr3Component } from './resumeTemplate/resumr3/resumr3.component';
import { Resumr2Component } from './resumeTemplate/resumr2/resumr2.component';
import { HomeComponent } from './admin/home/home.component';
import { UserDataComponent } from './masters/user-data/user-data.component';
import { ManageAdminComponent } from './admin/manage-admin/manage-admin.component';

const routes: Routes = [
        {
                path: 'login',
                component: LoginComponent
        },
        {
                path: 'resume/1/:id',
                component: Resumr1Component
        },
        {
                path: 'resume/2/:id',
                component: Resumr2Component
        },
        {
                path: 'resume/3/:id',
                component: Resumr3Component
        },
        {
                path: 'resume/4/:id',
                component: Resumr4Component
        },
        {
                path: 'resume/5/:id',
                component: Resumr5Component
        },
        {
                path: 'resume/6/:id',
                component: Resumr6Component
        },
        {
                path: 'home',
                component: HomeComponent,
                canActivate: [AuthGuard],
        },
        {
                path: 'user-data',
                component: UserDataComponent,
                canActivate: [AuthGuard],
        },
        {
                path: 'manage-admin',
                component: ManageAdminComponent,
                canActivate: [AuthGuard],
        },
        {
                path: '',
                component: RootComponent,
                canActivate: [AuthGuard],
                children: [
                        { path: 'dashboard', component: DashboardComponent },
                        { path: 'job-title', component: JobTitleComponent },
                        { path: 'degree', component: DegreeComponent },
                        { path: 'field-of-study', component: FieldOfStudyComponent },
                        { path: 'job-title-view/:id', component: JobTitleSubDataComponent },
                        { path: 'accomplishments', component: AccomplishmentsComponent },
                        { path: 'affiliations', component: AffiliationsComponent },
                        { path: 'certifications', component: CertificationsComponent },
                        { path: 'skills/:id/:name', component: SkillsComponent },
                        { path: 'summary/:id/:name', component: SummaryComponent },
                        { path: 'job-description/:id/:name', component: JobDescriptionComponent },
                        { path: '**', redirectTo: 'dashboard' }
                ]
        },
        {
                path: '**',
                redirectTo: 'login'
        }
];

@NgModule({
        imports: [RouterModule.forRoot(routes)],
        exports: [RouterModule]
})
export class AppRoutingModule { }
