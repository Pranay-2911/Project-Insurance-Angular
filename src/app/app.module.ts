import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
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
import { AddAgentComponent } from './admin/verify-agent/add-agent.component';
import { ViewAgentComponent } from './admin/view-agent/view-agent.component';
import { ViewCommissionComponent } from './admin/view-commission/view-commission.component';
import { AddEmployeeComponent } from './admin/add-employee/add-employee.component';
import { ViewEmployeeComponent } from './admin/view-employee/view-employee.component';
import { ViewPolicyAccountComponent } from './admin/view-policy-account/view-policy-account.component';
import { AddDocumentsComponent } from './customer/add-documents/add-documents.component';
import {NgxDropzoneModule } from 'ngx-dropzone';
import { CustomerTabsComponent } from './customer/customer-tabs/customer-tabs.component';
import { ViewCustomerComponent } from './admin/view-customer/view-customer.component';
import { AddCustomerComponent } from './landing-page/add-customer/add-customer.component';
import { ViewCustomerPolicyComponent } from './customer/view-customer-policy/view-customer-policy.component';
import { CustomerProfileComponent } from './customer/customer-profile/customer-profile.component';
import { PremiumComponent } from './customer/premium/premium.component';
import { PayPremiumComponent } from './customer/pay-premium/pay-premium.component';
import { PaymentComponent } from './customer/payment/payment.component';
import { PlanComponent } from './customer/plan/plan.component';
import { BuyPolicyComponent } from './customer/buy-policy/buy-policy.component';
import { ViewQueriesComponent } from './customer/view-queries/view-queries.component';
import { AddQueryComponent } from './customer/add-query/add-query.component';
import { ChangePasswordComponent } from './customer/change-password/change-password.component';
import { EmployeeTabsComponent } from './employee/employee-tabs/employee-tabs.component';
import { AgentDetailsComponent } from './employee/agent-details/agent-details.component';
import { CommissionDetailsComponent } from './employee/commission-details/commission-details.component';
import { EmpAddAgentComponent } from './employee/emp-add-agent/emp-add-agent.component';
import { RegisterCustomerComponent } from './register-customer/register-customer.component';
import { AgentTabsComponent } from './agent/agent-tabs/agent-tabs.component';
import { ViewAgentCommissionComponent } from './agent/view-agent-commission/view-agent-commission.component';
import { WithdrawCommissionComponent } from './agent/withdraw-commission/withdraw-commission.component';
import { WithdrawApproveComponent } from './admin/withdraw-approve/withdraw-approve.component';
import { NgxStripeModule} from 'ngx-stripe';
import { VerifyDocumentComponent } from './employee/verify-document/verify-document.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { QueryResponseComponent } from './employee/query-response/query-response.component';
import { ViewPaymentsComponent } from './admin/view-payments/view-payments.component';
import { SettingComponent } from './admin/setting/setting.component';
import { EmpChangePasswordComponent } from './employee/emp-change-password/emp-change-password.component';
import { AgentChangePasswordComponent } from './agent/agent-change-password/agent-change-password.component';
import { UpdateSchemaComponent } from './admin/update-schema/update-schema.component';
import { DeleteSchemaComponent } from './admin/delete-schema/delete-schema.component';
import { MarketingComponent } from './agent/marketing/marketing.component';
import { ReferCustomerComponent } from './agent/refer-customer/refer-customer.component';
import { AddStateCityComponent } from './admin/add-state-city/add-state-city.component';
import { ReferPolicyComponent } from './customer/refer-policy/refer-policy.component';
import { BuyPolicyAgentComponent } from './customer/buy-policy-agent/buy-policy-agent.component';
import { ViewCustomerAgentComponent } from './agent/view-customer-agent/view-customer-agent.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { UpdatePasswordComponent } from './update-password/update-password.component';
import { LoadSchemaComponent } from './load-schema/load-schema.component';
import { ViewClaimsComponent } from './admin/view-claims/view-claims.component';
import { ViewCustomerDetailsComponent } from './admin/view-customer-details/view-customer-details.component';
import { UpdateCustomerComponent } from './customer/update-customer/update-customer.component';
import { UpdateEmployeeComponent } from './employee/update-employee/update-employee.component';
import { UpdateAgentComponent } from './agent/update-agent/update-agent.component';
import { AgentProfileComponent } from './agent/agent-profile/agent-profile.component';
import { EmployeeProfileComponent } from './employee/employee-profile/employee-profile.component';
import { ProjectInterceptor } from './project.interceptor';

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
    ViewPolicyAccountComponent,
    AddDocumentsComponent,
    CustomerTabsComponent,
    ViewCustomerComponent,
    AddCustomerComponent,
    ViewCustomerPolicyComponent,
    CustomerProfileComponent,
    PremiumComponent,
    PayPremiumComponent,
    PaymentComponent,
    PlanComponent,
    BuyPolicyComponent,
    ViewQueriesComponent,
    AddQueryComponent,
    ChangePasswordComponent,
    EmployeeTabsComponent,
    AgentDetailsComponent,
    CommissionDetailsComponent,
    EmpAddAgentComponent,
    RegisterCustomerComponent,
    AgentTabsComponent,
    ViewAgentCommissionComponent,
    WithdrawCommissionComponent,
    WithdrawApproveComponent,
    VerifyDocumentComponent,
    QueryResponseComponent,
    ViewPaymentsComponent,
    SettingComponent,
    EmpChangePasswordComponent,
    AgentChangePasswordComponent,
    UpdateSchemaComponent,
    DeleteSchemaComponent,
    MarketingComponent,
    ReferCustomerComponent,
    AddStateCityComponent,
    ReferPolicyComponent,
    BuyPolicyAgentComponent,
    ViewCustomerAgentComponent,
    ForgetPasswordComponent,
    UpdatePasswordComponent,
    LoadSchemaComponent,
    ViewClaimsComponent,
    ViewCustomerDetailsComponent,
    UpdateCustomerComponent,
    UpdateEmployeeComponent,
    UpdateAgentComponent,
    AgentProfileComponent,
    EmployeeProfileComponent,
  
    
 
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
    NgxDropzoneModule,
    NgxStripeModule.forRoot('pk_test_51QT1NPCFiPRnAkVSVdNAkUATpbeEUVM3LSYEwTJOXwPjbYVRYzgSeI85FEH3KcRd0b7zNcIMJv5qE9WgY31Oc51b00GTedZXAQ'),
    MatPaginatorModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
    useClass: ProjectInterceptor,
    multi: true  
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
