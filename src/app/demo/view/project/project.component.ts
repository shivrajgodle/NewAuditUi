import { Component, OnInit } from '@angular/core';
import {MenuItem, MessageService} from 'primeng/api';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
  providers: [MessageService]

})
export class ProjectComponent implements OnInit {

  items: MenuItem[];

  constructor() { }

  ngOnInit(): void {

    this.items = [
      {
        label: 'Project',
        routerLink:'/uikit/subpro'
      },
      // {
      //   label: 'Billing',
      //   routerLink: '/uikit/billing'
      // },
      {
        label: 'Users',
        routerLink: '/uikit/users'
      },
      {
        label: 'Rules',
        routerLink: '/uikit/rules'
      }
    ];
  }
}
