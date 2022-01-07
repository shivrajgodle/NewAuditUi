import {Component, OnInit} from '@angular/core';
import {AppMainComponent} from './app.main.component';

@Component({
    selector: 'app-menu',
    template: `
		<ul class="layout-menu">
			<li app-menuitem *ngFor="let item of model; let i = index;" [item]="item" [index]="i" [root]="true"></li>
		</ul>
    `
})
export class AppMenuComponent implements OnInit {

    model: any[];

    constructor(public app: AppMainComponent) {}

    ngOnInit() {
        this.model = [
            {label: 'Home', icon: 'pi pi-fw pi-home', routerLink: ['']},
            {
                label: 'Client Management', icon: 'pi pi-fw pi-compass', routerLink: ['utilities'],
            },
            {
                label: 'Audit plan', icon: 'pi pi-fw pi-briefcase', routerLink: ['/pages'],
            },
        ];
    }
}
