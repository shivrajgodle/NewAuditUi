import { Component, OnInit } from "@angular/core";
import { MenuItem } from "primeng/api";
import { AppMainComponent } from "./app.main.component";

@Component({
    selector: "app-menu",
    template: `
        <!-- <ul class="layout-menu">
			<li app-menuitem *ngFor="let item of model; let i = index;" [item]="item" [index]="i" [root]="true"></li>
		</ul> -->
        <p-panelMenu [model]="items" [style]="{ width: '300px' }"></p-panelMenu>
    `,
})
export class AppMenuComponent implements OnInit {
    model: any[];
    items: MenuItem[];

    constructor(public app: AppMainComponent) {}

    ngOnInit() {
        // this.model = [
        //     {label: 'Home', icon: 'pi pi-fw pi-home', routerLink: ['']},
        //     {
        //         label: 'Client Management', icon: 'pi pi-fw pi-compass', routerLink: ['/uikit/client'],
        //     },
        //     {
        //         label: 'Audit plan', icon: 'pi pi-fw pi-briefcase', routerLink: ['/pages'],
        //     },
        // ];

        this.items = [
            {
                label: "Project Management",
                icon: "pi pi-pw pi-folder",
                items: [
                    { label: "Project Details", icon: "pi pi-fw pi-file",routerLink:'/' },
                    {
                        label: "Billing Details",
                        icon: "pi pi-fw pi-plus-circle",
                        routerLink:'/uikit/subpro'
                    },
                    { label: "Client Details", icon: "pi pi-fw pi-info-circle",routerLink:'/uikit/client' },
                    { label: "Documents", icon: "pi pi-fw pi-upload",routerLink:'/uikit/docUpload' },
                    { label: "User Details", icon: "pi pi-fw pi-users",routerLink:'/uikit/team' },
                    { label: "Escalation Rules", icon: "pi pi-fw pi-globe",routerLink:'/uikit/rules' },
                    { label: "Email Template", icon: "pi pi-fw pi-envelope",routerLink:'/uikit/emailTemplate' },
                    { label: "Review Data", icon: "pi pi-fw pi-database",routerLink:'/' },
                ],
            },
            {
                label: "Auditor",
                icon: "pi pi-fw pi-pencil",
                items: [],
            },
        ];
    }
}
