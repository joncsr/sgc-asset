import { Component, OnInit, OnDestroy, NgModule, ViewChild  } from '@angular/core';
import { MenuItem } from 'primeng/api/menuitem';
import { Table } from 'primeng/table';
import { Customer, Representative } from 'src/app/demo/api/customer';
import { CustomerService } from 'src/app/demo/service/customer.service';
import { Employee, EmployeeAccount } from 'src/app/models/employee.model';
import { AssetService } from 'src/app/services/asset.service';
import * as diacritics from 'diacritics';


@Component({
    templateUrl: './asset-user.component.html',
    styleUrls: ["./asset-user.component.scss"],
})
export class AssetUserComponent implements OnInit {
    items: MenuItem[] | undefined;
    loading: boolean = true;
    serialNumbers = [];
    visible: boolean = false;



    @ViewChild('dt1') dt1: Table | undefined;

    constructor(
        private customerService: CustomerService,
        private assetService: AssetService
    ) {}

    ngOnInit() {
        this.loading = false;
        this.getEmployee();
    }

    clear(table: Table) {
        table.clear();
    }

    employees: EmployeeAccount[] = [];
    getEmployee() {
        this.assetService
            .getEmployeeAccount()
            .subscribe((data: EmployeeAccount[]) => {
                this.employees = data.sort((a, b) =>
                    a.employeeDTO.lastname.localeCompare(b.employeeDTO.lastname)
                );

                // Assign random status to each employee
                const statuses = ['active', 'inactive', 'processing'];
                this.employees.forEach((employee) => {
                    const randomIndex = Math.floor(Math.random() * statuses.length);
                    employee.status = statuses[randomIndex];
                });
            });
    }


    filterTableGlobal(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        const filterValueNoDiacritics = diacritics.remove(filterValue.toLowerCase());

        this.dt1.filterGlobal(filterValueNoDiacritics, 'contains');
    }


}
