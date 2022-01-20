import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {AppMainComponent} from './app.main.component';
import {AppNotfoundComponent} from './pages/app.notfound.component';
import {AppErrorComponent} from './pages/app.error.component';
import {AppAccessdeniedComponent} from './pages/app.accessdenied.component';
import {AppLoginComponent} from './pages/app.login.component';
import {DisplayComponent} from './utilities/display.component';
import {ElevationComponent} from './utilities/elevation.component';
import {FlexboxComponent} from './utilities/flexbox.component';
import {GridComponent} from './utilities/grid.component';
import {IconsComponent} from './utilities/icons.component';
import {WidgetsComponent} from './utilities/widgets.component';
import {SpacingComponent} from './utilities/spacing.component';
import {TypographyComponent} from './utilities/typography.component';
import {TextComponent} from './utilities/text.component';
import {AppCrudComponent} from './pages/app.crud.component';
import {AppCalendarComponent} from './pages/app.calendar.component';
import {AppTimelineDemoComponent} from './pages/app.timelinedemo.component';
import {AppInvoiceComponent} from './pages/app.invoice.component';
import {AppHelpComponent} from './pages/app.help.component';
import { DashboardComponent } from './demo/view/dashboard/dashboard.component';
import { ProjectComponent } from './demo/view/project/project.component';
import { Subpro1Component } from './demo/view/subpro1/subpro1.component';
import { UsersComponent } from './demo/view/users/users.component';
import { RulesComponent } from './demo/view/rules/rules.component';
import { ClientComponent } from './demo/view/client/client.component';
import { DocumentComponent } from './demo/view/document/document.component';
import { SpecificDocComponent } from './demo/view/specific-doc/specific-doc.component';
import { TeamMemberComponent } from './demo/view/team-member/team-member.component';
import { EmailTemplateComponent } from './demo/view/email-template/email-template.component';
import { CrudRulesComponent } from './demo/view/crud-rules/crud-rules.component';
import { BillingDetailsComponent } from './demo/view/billing-details/billing-details.component';

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '', component:DashboardComponent
            },
             {
                path: 'main', component: AppMainComponent,
                children: [
                    {path:'',component:BillingDetailsComponent},
                    {path: 'uikit/project', component:ProjectComponent},
                    //{path:'uikit/subpro',component:Subpro1Component},
                    {path:'uikit/users',component:UsersComponent},
                    {path:'uikit/rules',component:RulesComponent},
                    {path:'uikit/crudrules',component:CrudRulesComponent},
                    {path:'uikit/client',component:ClientComponent},
                    {path:'uikit/docUpload',component:DocumentComponent},
                    {path:'uikit/specificDoc',component:SpecificDocComponent},
                    {path:'uikit/team',component:TeamMemberComponent},
                    {path:'uikit/emailTemplate',component:EmailTemplateComponent},
                    {path: 'utilities/display', component: DisplayComponent},
                    {path: 'utilities/elevation', component: ElevationComponent},
                    {path: 'utilities/flexbox', component: FlexboxComponent},
                    {path: 'utilities/grid', component: GridComponent},
                    {path: 'utilities/icons', component: IconsComponent},
                    {path: 'utilities/widgets', component: WidgetsComponent},
                    {path: 'utilities/spacing', component: SpacingComponent},
                    {path: 'utilities/typography', component: TypographyComponent},
                    {path: 'utilities/text', component: TextComponent},
                    {path: 'pages/crud', component: AppCrudComponent},
                    {path: 'pages/calendar', component: AppCalendarComponent},
                    {path: 'pages/timeline', component: AppTimelineDemoComponent},
                    {path: 'pages/invoice', component: AppInvoiceComponent},
                    {path: 'pages/help', component: AppHelpComponent},
                ]
            },
            {path: 'error', component: AppErrorComponent},
            {path: 'access', component: AppAccessdeniedComponent},
            {path: 'notfound', component: AppNotfoundComponent},
            {path: 'login', component: AppLoginComponent},
            //{path: '**', redirectTo: '/notfound'},
        ], {scrollPositionRestoration: 'enabled'})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
