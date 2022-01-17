import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-client-status',
  templateUrl: './client-status.component.html',
  styleUrls: ['./client-status.component.scss']
})
export class ClientStatusComponent implements OnInit {

  items: MenuItem[];

  constructor() { }

  ngOnInit(): void {

    // this.items = [
    //   {
    //     label: 'Client Data',
    //     routerLink:'/uikit/client'
    //   },
    //   {
    //     label: 'Document Upload',
    //     routerLink: '/uikit/docUpload'
    //   },
    //   {
    //     label: 'Specific Document Upload',
    //     routerLink: '/uikit/specificDoc'
    //   },
    //   {
    //     label: 'Team Member',
    //     routerLink: '/uikit/team'
    //   }
    // ];
  }
}
