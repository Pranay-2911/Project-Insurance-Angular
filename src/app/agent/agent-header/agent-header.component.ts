import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agent-header',
  templateUrl: './agent-header.component.html',
  styleUrls: ['./agent-header.component.css']
})
export class AgentHeaderComponent {
name: string='Agent'

constructor(private router:Router){}

logOut(){
  localStorage.removeItem('token');
  localStorage.removeItem('id');
  this.router.navigate(['']);
}
}
