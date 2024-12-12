import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './landing-page/dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { EmployeeDashboardComponent } from './employee/employee-dashboard/employee-dashboard.component';
import { AgentDashboardComponent } from './agent/agent-dashboard/agent-dashboard.component';
import { CustomerDashboardComponent } from './customer/customer-dashboard/customer-dashboard.component';
import { InfoComponent } from './landing-page/info/info.component';
import { CarPolicyComponent } from './policies/car-policy/car-policy.component';
import { TabsComponent } from './admin/tabs/tabs.component';
import { AddStateComponent } from './admin/add-state/add-state.component';
import { AddPlanComponent } from './admin/add-plan/add-plan.component';
import { AddSchemaComponent } from './admin/add-schema/add-schema.component';
import { ViewPlansComponent } from './admin/view-plans/view-plans.component';
import { AddCityComponent } from './admin/add-city/add-city.component';
import { ViewCitiesComponent } from './admin/view-cities/view-cities.component';
import { ViewStatesComponent } from './admin/view-states/view-states.component';
import { ViewSchemaComponent } from './admin/view-schema/view-schema.component';
import { AddAgentComponent } from './admin/verify-agent/add-agent.component';
import { ViewAgentComponent } from './admin/view-agent/view-agent.component';
import { ViewCommissionComponent } from './admin/view-commission/view-commission.component';
import { AddEmployeeComponent } from './admin/add-employee/add-employee.component';
import { ViewEmployeeComponent } from './admin/view-employee/view-employee.component';
import { AuthGuard } from './guards/auth.guard';
import { AddDocumentsComponent } from './customer/add-documents/add-documents.component';
import { CustomerTabsComponent } from './customer/customer-tabs/customer-tabs.component';
import { ViewPolicyAccountComponent } from './admin/view-policy-account/view-policy-account.component';
import { ViewCustomerComponent } from './admin/view-customer/view-customer.component';
import { CustomerProfileComponent } from './customer/customer-profile/customer-profile.component';
import { ViewCustomerPolicyComponent } from './customer/view-customer-policy/view-customer-policy.component';
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
import { VerifyDocumentComponent } from './employee/verify-document/verify-document.component';
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

const routes: Routes = [
  {
    path: '',
    component:DashboardComponent,
    children: [
      {
      path: '',
      component: InfoComponent
    },
    {
      path: 'load-scheme',
      component: LoadSchemaComponent
    }
  
]
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'register-customer',
    component: RegisterCustomerComponent
  },
  {
    path:'admin-dashboard',
    component:AdminDashboardComponent,
    canActivate: [AuthGuard],
    data: {role: "ADMIN"},
    children:[
      {
      path:'tabs',
      component: TabsComponent,
      },
      {
        path:'add-state',
        component: AddStateComponent
      },
      {
        path:'add-city', 
        component: AddCityComponent
      },
      {
        path:'add-state-city',
        component: AddStateCityComponent
      },
      {
        path:'plans',
        component: AddPlanComponent
      },
      {
        path:'schemas',
        component: AddSchemaComponent
      },
      {
        path: 'add-employee',
        component: AddEmployeeComponent
      },
      {
        path: 'add-agent',
        component: AddAgentComponent
      },
      {
        path:'viewplans',
        component: ViewPlansComponent
      },
      {
        path:'view-city',
        component: ViewCitiesComponent
      },
      {
        path:'view-state',
        component:ViewStatesComponent
      },{
        path:'view-schemes',
        component:ViewSchemaComponent
      },
      {
        path: 'view-agent',
        component: ViewAgentComponent
      },
      {
        path: 'view-commission',
        component: ViewCommissionComponent
      },
      {
        path: 'view-employee',
        component: ViewEmployeeComponent
      },
      {
        path: 'view-policy-account',
        component: ViewPolicyAccountComponent
      },
      {
        path: 'view-customer',
        component: ViewCustomerComponent
      },
      {
        path: 'withdraw-approve',
        component: WithdrawApproveComponent
      },
      {
        path: 'view-payments',
        component: ViewPaymentsComponent
      },
      {
        path:'setting',
        component: SettingComponent
      },
      {
        path: 'update-schema',
        component: UpdateSchemaComponent
      },
      {
        path: 'delete-schema',
        component: DeleteSchemaComponent
      }
     

    
    ]
  },
  {
    path:'employee-dashboard',
    component:EmployeeDashboardComponent,
    canActivate: [AuthGuard],
    data: {role: "EMPLOYEE"},
    children:[
      {
      path:'tabs',
      component: EmployeeTabsComponent
      },
      {
        path: 'view-agents',
        component: AgentDetailsComponent
      },
      {
        path: 'view-commission',
        component: CommissionDetailsComponent
      },
      {
        path: 'add-agent',
        component: EmpAddAgentComponent
      },
      {
        path: 'verify-document',
        component: VerifyDocumentComponent
      },
      {
        path: 'query-response',
        component: QueryResponseComponent
      },
      {
        path: 'change-password',
        component: EmpChangePasswordComponent
      }
    ]
  },
  {
    path:'agent-dashboard',
    component:AgentDashboardComponent,
    canActivate: [AuthGuard],
    data: {role: "AGENT"},
    children:[
    {
      path: 'agent-tabs',
      component: AgentTabsComponent
    },
    {
      path: 'view-agent-commission',
      component: ViewAgentCommissionComponent
    },
    {
      path: 'withdraw-commission',
      component: WithdrawCommissionComponent
    },
    {
      path: 'change-password',
      component: AgentChangePasswordComponent
    },
    {
      path: 'marketing',
      component: MarketingComponent
    },
    {
      path: 'refer-customers',
      component: ReferCustomerComponent
    },
    {
      path: 'view-customer',
      component: ViewCustomerAgentComponent
    }
  ]
  },
  {
    path:'customer-dashboard',
    component:CustomerDashboardComponent,
    canActivate: [AuthGuard],
    data: {role: "CUSTOMER"},
    children:[
      {
        path:'customer-tabs',
        component: CustomerTabsComponent
      },
      {
        path:'add-documents',
        component: AddDocumentsComponent,
      },
      {
        path: 'view-profile',
        component: CustomerProfileComponent
      },
      {
        path: 'view-customer-account',
        component: ViewCustomerPolicyComponent
      },
      {
        path: 'premium',
        component: PremiumComponent
      },
      {
        path: 'pay-premium',
        component: PayPremiumComponent
      },
      {
        path: 'payment',
        component: PaymentComponent
      },
      {
        path: 'plan',
        component: PlanComponent
      },
      {
        path:'buy-policy',
        component: BuyPolicyComponent
      },
      {
        path: 'view-queries',
        component: ViewQueriesComponent
      },
      {
        path: 'add-query',
        component: AddQueryComponent
      },
      {
        path: 'change-password',
        component: ChangePasswordComponent
      },
      {
        path: 'details/:id1/:id2',
        component: ReferPolicyComponent
      },
      {
        path: 'buy-policy-agent',
        component: BuyPolicyAgentComponent
      }
  ]
  },
  {
    path: 'forget-password',
    component: ForgetPasswordComponent
  },
  {
    path: 'update-password',
    component: UpdatePasswordComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
