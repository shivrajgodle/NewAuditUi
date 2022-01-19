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
        icon:"pi pi-home",
        routerLink:'/'
      },
      {
        label: 'Billing',
        routerLink:'/uikit/subpro'
      },
      {
        label: 'Client',
        routerLink:'/uikit/client'
      },
      {
        label: 'Documents',
        routerLink:'/uikit/docUpload'
      },
      {
        label: 'Users',
        routerLink: '/uikit/team'
      },
      {
        label: 'Rules',
        routerLink: '/uikit/crudrules'
      },
      {
        label: 'Email Template',
        routerLink:'/uikit/emailTemplate'
      },
    ];
  }
}
