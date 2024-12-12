import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent {

  constructor(private route: ActivatedRoute, private router: Router) { }

  loadSchema( name: string)
  {
    this.router.navigate(['load-scheme'], {queryParams:{ name: name}});
  }

}
