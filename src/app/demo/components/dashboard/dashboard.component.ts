import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuItem } from 'primeng/api/menuitem';

@Component({
    templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit, OnDestroy {
    uploadedFiles: any[] = [];

    tieredItems: MenuItem[] = [];

    routeItems: MenuItem[] = [];

    constructor() {}

    ngOnInit() {
        this.tieredItems = [];
        this.routeItems = [
            { label: 'Asset', routerLink: 'asset' },
            { label: 'Component Storage', routerLink: 'component_storage' },
            { label: 'Request', routerLink: 'request', badge: '25' },
            { label: 'Asset User', routerLink: 'asset_user' },
            { label: 'Others', routerLink: 'confirmation' },
        ];
    }

    ngOnDestroy() {}

    onBasicUpload() {}
    onUpload(event: any) {}
}
