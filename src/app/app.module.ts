import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { HeaderComponent } from './landing-page/header/header.component';
import { DashboardComponent } from './landing-page/dashboard/dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './login/login.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { EmployeeDashboardComponent } from './employee/employee-dashboard/employee-dashboard.component';
import { EmployeeHeaderComponent } from './employee/employee-header/employee-header.component';
import { AdminHeaderComponent } from './admin/admin-header/admin-header.component';
import { AgentDashboardComponent } from './agent/agent-dashboard/agent-dashboard.component';
import { AgentHeaderComponent } from './agent/agent-header/agent-header.component';
import { CustomerDashboardComponent } from './customer/customer-dashboard/customer-dashboard.component';
import { CustomerHeaderComponent } from './customer/customer-header/customer-header.component';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { InfoComponent } from './landing-page/info/info.component';
import { CarPolicyComponent } from './policies/car-policy/car-policy.component';
import { TabsComponent } from './admin/tabs/tabs.component';
import { AddStateComponent } from './admin/add-state/add-state.component';
import { AddPlanComponent } from './admin/add-plan/add-plan.component';
import { AddSchemaComponent } from './admin/add-schema/add-schema.component';
import { AddCityComponent } from './admin/add-city/add-city.component';
import { ViewPlansComponent } from './admin/view-plans/view-plans.component';
import { FormsModule } from '@angular/forms';
import { ViewStatesComponent } from './admin/view-states/view-states.component';
import { ViewCitiesComponent } from './admin/view-cities/view-cities.component';
import { ViewSchemaComponent } from './admin/view-schema/view-schema.component';
import { AddAgentComponent } from './admin/add-agent/add-agent.component';
import {RecaptchaModule, RecaptchaFormsModule } from 'ng-recaptcha';
import { ViewAgentComponent } from './admin/view-agent/view-agent.component';
import { ViewCommissionComponent } from './admin/view-commission/view-commission.component';
import { AddEmployeeComponent } from './admin/add-employee/add-employee.component';
import { ViewEmployeeComponent } from './admin/view-employee/view-employee.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DashboardComponent,
    LoginComponent,
    AdminDashboardComponent,
    EmployeeDashboardComponent,
    EmployeeHeaderComponent,
    AdminHeaderComponent,
    AgentDashboardComponent,
    AgentHeaderComponent,
    CustomerDashboardComponent,
    CustomerHeaderComponent,
    InfoComponent,
    CarPolicyComponent,
    TabsComponent,
    AddStateComponent,
    AddPlanComponent,
    AddSchemaComponent,
    AddCityComponent,
    ViewPlansComponent,
    ViewStatesComponent,
    ViewCitiesComponent,
    ViewSchemaComponent,
    AddAgentComponent,
    ViewAgentComponent,
    ViewCommissionComponent,
    AddEmployeeComponent,
    ViewEmployeeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgbModule,
    NgbNavModule,
    FormsModule,
    CommonModule,
    RecaptchaModule,
    RecaptchaFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
