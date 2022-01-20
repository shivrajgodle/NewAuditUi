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
      // {
      //   icon:"pi pi-home",
      //   label:"Home",
      //   routerLink:'/'
      // },
      {
        label: 'Billing',
        routerLink:'/main/'
      },
      {
        label: 'Client',
        routerLink:'/main/uikit/client'
      },
      {
        label: 'Documents',
        routerLink:'/main/uikit/docUpload'
      },
      {
        label: 'Users',
        routerLink: '/main/uikit/team'
      },
      {
        label: 'Rules',
        routerLink: '/main/uikit/crudrules'
      },
      {
        label: 'Email Template',
        routerLink:'/uikit/emailTemplate'
      },
    ];
  }
}
