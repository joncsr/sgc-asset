import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html',
})
export class AppMenuComponent implements OnInit {
    model: any[] = [];

    constructor(public layoutService: LayoutService) {}

    ngOnInit() {
        this.model = [
            {
                label: 'Asset Management',
                items: [

                    { label: 'IT', icon: 'pi pi-file', routerLink: ['/asset'] },
                    {
                        label: 'Request',
                        icon: 'pi pi-file',
                        routerLink: ['/user-request'],
                    },
                ],
            },
            {
                label: 'ADMIN',
                items: [
                    {
                        label: 'Admin',
                        icon: 'pi pi-user',
                        routerLink: ['/admin/asset_category'],
                    },
                ],
            },
            {
                label: 'User',
                items: [
                    {
                        label: 'User',
                        icon: 'pi pi-user',
                        routerLink: ['/user'],
                    },
                    {
                        label: 'Request',
                        icon: 'pi pi-file',
                        routerLink: ['/user-request'],
                    },
                ],
            },

            // {
            //     label: 'Auth',
            //     icon: 'pi pi-fw pi-user',
            //     items: [
            //         {
            //             label: 'Login',
            //             icon: 'pi pi-fw pi-sign-in',
            //             routerLink: ['/auth/login']
            //         },
            //         {
            //             label: 'Error',
            //             icon: 'pi pi-fw pi-times-circle',
            //             routerLink: ['/auth/error']
            //         },
            //         {
            //             label: 'Access Denied',
            //             icon: 'pi pi-fw pi-lock',
            //             routerLink: ['/auth/access']
            //         }
            //     ]
            // },
            //         {
            //             label: 'Crud',
            //             icon: 'pi pi-fw pi-pencil',
            //             routerLink: ['/pages/crud']
            //         },
            //         {
            //             label: 'Timeline',
            //             icon: 'pi pi-fw pi-calendar',
            //             routerLink: ['/pages/timeline']
            //         },
            //         {
            //             label: 'Not Found',
            //             icon: 'pi pi-fw pi-exclamation-circle',
            //             routerLink: ['/notfound']
            //         },
            //         {
            //             label: 'Empty',
            //             icon: 'pi pi-fw pi-circle-off',
            //             routerLink: ['/pages/empty']
            //         },
            //     ]
            // },
        ];
    }
}
