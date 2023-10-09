import { Component, OnInit, OnDestroy, NgModule } from '@angular/core';
import { MenuItem } from 'primeng/api/menuitem';
import { Table } from 'primeng/table';
import { Customer, Representative } from 'src/app/demo/api/customer';
import { CustomerService } from 'src/app/demo/service/customer.service';

import { Component as Com } from 'src/app/models/component.model';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ComponentViewComponent } from './component-view/component-view.component';
import { DropdownService } from 'src/app/services/dropdowns.service';
import { ComponentEditComponent } from './component-edit/component-edit.component';
import { AssetComponentService } from 'src/app/services/it-asset/asset-component.service';

@Component({
    templateUrl: './component-storage.component.html',
})
export class ComponentStorageComponent implements OnInit {
    ref: DynamicDialogRef;

    customers!: Customer[];

    representatives!: Representative[];

    statuses!: any[];

    loading: boolean = true;

    activityValues: number[] = [0, 100];

    display: boolean = false;

    add_asset: boolean = false;

    upload_asset: boolean = false;

    constructor(
        private customerService: CustomerService,
        private componentService: AssetComponentService,
        public dialogService: DialogService,
        public messageService: MessageService,
        private selectionService: DropdownService
    ) {}

    ngOnInit() {
        this.customerService.getCustomersLarge().then((customers) => {
            this.customers = customers;
            this.loading = false;

            this.customers.forEach((customer) => {
                customer.date = new Date(customer.date).toISOString(); // Convert Date to ISO string
            });
        });

        this.getUnitTypes();
        this.getComponents();
    }

    clear(table: Table) {
        table.clear();
    }

    onUpload(event: any) {}

    onBasicUpload() {}

    components: Com[];
    getComponents() {
        this.componentService.getComponents().subscribe((data: any) => {
            if (this.selectedComponentType) {
                this.components = data.filter((component: Com) => {
                    return (
                        component.componentType === this.selectedComponentType
                    );
                });
            } else {
                this.components = data;
            }
            // Count the number of component items
            const componentCount = this.components.length;
            console.log('Total Component Count:', componentCount);
            this.loading = false;
        });
    }

    component: any;

    showComponent(component: Com) {
        this.ref = this.dialogService.open(ComponentViewComponent, {
            data: {
                component,
            },
            header: 'View Component',
            width: '70%',
            contentStyle: { overflow: 'auto' },
            baseZIndex: 10000,
            maximizable: true,
        });
    }

    componentTypes: string[] = [];
    items: MenuItem[] = [];

    getUnitTypes() {
        this.selectionService.getComponentTypes().subscribe(
            (componentTypes: string[]) => {
                this.componentTypes = componentTypes;
                this.items = this.componentTypes.map((componentType) => ({

                    label: componentType,
                    icon: 'pi pi-fw pi-check-circle',
                    command: () => this.onTabMenuItemSelect(componentType), // Pass componentType to the method
                }));
            },
            (error) => {
                console.error('Error fetching unit types:', error);
            }
        );
    }

    selectedComponentType: string | undefined;
    // Function to handle tab menu item selection
    onTabMenuItemSelect(componentType: string) {
        this.selectedComponentType = componentType;
        this.getComponents();
    }

    editComponent(component: Com) {
        this.ref = this.dialogService.open(ComponentEditComponent, {
            data: {
                component,
            },
            header: 'Edit Component',
            width: '70%',
            contentStyle: { overflow: 'auto' },
            baseZIndex: 10000,
            maximizable: true,
        });
        this.ref.onClose.subscribe((data: Com) => {
            console.log('Dialog closed with data:', data.assignedID);
        });
    }
}
