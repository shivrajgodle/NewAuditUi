import { Component } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { Sidebar } from 'primeng/sidebar';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    theme = 'noir';

    layoutMode = 'static';

    megaMenuMode = 'gradient';

    menuMode = 'light';

    profileMode = 'inline';

    inputStyle = 'outlined';

    ripple: boolean;

    sideBar:boolean;
    constructor(private primengConfig: PrimeNGConfig) {
        this.sideBar=true;
    }

    ngOnInit() {
        this.primengConfig.ripple = true;
        this.ripple = true;
    }
}
