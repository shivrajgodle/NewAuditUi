import {Component} from '@angular/core';
import { AppMainComponent} from './app.main.component';
import {trigger, state, transition, style, animate} from '@angular/animations';

@Component({
    selector: 'app-inline-profile',
    template: ''
        
})
export class AppProfileComponent {

    constructor(public app: AppMainComponent) {}

    onProfileClick(event) {
        this.app.usermenuClick = true;
        this.app.usermenuActive = !this.app.usermenuActive;
        event.preventDefault();
    }

    onProfileItemClick(event, item) {
        this.app.usermenuClick = true;
        if (this.app.activeProfileItem === item) {
            this.app.activeProfileItem = null; } else {
            this.app.activeProfileItem = item; }

        event.preventDefault();
    }

    onProfileSubItemClick(event) {
        event.preventDefault();
    }
}
