import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuItem } from 'primeng/api/menuitem';

@Component({
    templateUrl: './admin.component.html',
})
export class AdminComponent implements OnInit {

    tieredItems: MenuItem[] = [];
    routeItems: MenuItem[] = [];

    ngOnInit() {
        this.tieredItems = [];
        this.routeItems = [
            { label: 'Asset Category', routerLink: 'asset_category' },
            { label: 'Component Category', routerLink: 'component_category' },
        ];
    }
}
