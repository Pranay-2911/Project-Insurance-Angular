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

const routes: Routes = [
  {
    path: '',
    component:DashboardComponent,
    children: [
      {
      path: '',
      component: InfoComponent
    },
  
]
  },
  {
    path:'login',
    component:LoginComponent
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
      }
     

    
    ]
  },
  {
    path:'employee-dashboard',
    component:EmployeeDashboardComponent,
    canActivate: [AuthGuard],
    data: {role: "EMPLOYEE"},
    children:[{
      path:'tabs',
      component: TabsComponent
    }]
  },
  {
    path:'agent-dashboard',
    component:AgentDashboardComponent,
    canActivate: [AuthGuard],
    data: {role: "AGENT"},
    children:[{
      path:'tabs',
      component: TabsComponent
    }]
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
        path: 'payment/:amount',
        component: PaymentComponent
      },
      {
        path: 'plan',
        component: PlanComponent
      }
  ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
