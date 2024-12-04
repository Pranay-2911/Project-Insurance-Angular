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
import { AddAgentComponent } from './admin/add-agent/add-agent.component';
import { ViewAgentComponent } from './admin/view-agent/view-agent.component';
import { ViewCommissionComponent } from './admin/view-commission/view-commission.component';
import { AddEmployeeComponent } from './admin/add-employee/add-employee.component';
import { ViewEmployeeComponent } from './admin/view-employee/view-employee.component';

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
        path:'plans',
        component: AddPlanComponent
      },
      {
        path:'schemas',
        component: AddSchemaComponent
      },
      {
        path:'viewplans',
        component: ViewPlansComponent
      },
      {
        path:'add-city', 
        component: AddCityComponent
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
        path: 'add-agent',
        component: AddAgentComponent
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
        path: 'add-employee',
        component: AddEmployeeComponent
      },
      {
        path: 'view-employee',
        component: ViewEmployeeComponent
      }
    
    ]
  },
  {
    path:'employee-dashboard',
    component:EmployeeDashboardComponent,
    children:[{
      path:'tabs',
      component: TabsComponent
    }]
  },
  {
    path:'agent-dashboard',
    component:AgentDashboardComponent,
    children:[{
      path:'tabs',
      component: TabsComponent
    }]
  },
  {
    path:'customer-dashboard',
    component:CustomerDashboardComponent,
    children:[{
      path:'tabs',
      component: TabsComponent
    }]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
