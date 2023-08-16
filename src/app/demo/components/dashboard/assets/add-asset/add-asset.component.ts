import { Component, OnInit, OnDestroy, NgModule } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SelectItem } from 'primeng/api';
import { MenuItem } from 'primeng/api/menuitem';
import { Table } from 'primeng/table';
import { Customer, Representative } from 'src/app/demo/api/customer';
import { CountryService } from 'src/app/demo/service/country.service';
import { CustomerService } from 'src/app/demo/service/customer.service';
import { Department, Employee } from 'src/app/models/employee.model';
import { AssetService } from 'src/app/services/asset.service';
import { FormControl } from '@angular/forms';

interface AutoCompleteCompleteEvent {
    originalEvent: Event;
    query: string;
}

@Component({
    templateUrl: './add-asset.component.html',
})
export class AddAssetComponent implements OnInit {
    countries: any[] | undefined;

    filteredCountries: any[] | undefined;

    selectedCountryAdvanced: any[] = [];

    selectedDrop: SelectItem = { value: '' };
    cities: SelectItem[] = [];

    assetForm: FormGroup;


    constructor(
        private countryService: CountryService,
        private formBuilder: FormBuilder,
        private assetService: AssetService
    ) {}

    ngOnInit(): void {
        this.initForm();
        // this.getDepartments();
        this.getEmployee();
        this.getDepartmentCodes();
        this.setupCurrentUserListener();
    }

    initForm() {
        this.assetForm = this.formBuilder.group({
            assetInventoryDTO: this.formBuilder.group({
                barcode: [
                    this.generateBarcode(),
                    [Validators.required, Validators.minLength(6)],
                ], // Set initial value for barcode and disable it
                unit: ['', Validators.required],
                serialNo: ['', Validators.required],
                specs: ['', Validators.required],
                vendor: ['', Validators.required],
                warranty: ['', Validators.required],
                datePO: ['', Validators.required],
                dateAcquired: ['', Validators.required],
            }),

            company: ['', Validators.required],
            department: [''],
            accountabilityNo: ['', Validators.required],

            empId: [this.selectedUserId],
            remarks: ['', Validators.required],
        });
    }

    generateBarcode(): string {
        const currentDate = new Date();
        const year = currentDate.getFullYear().toString().slice(-2); // Get last 2 digits of the year
        const month = this.padNumber(currentDate.getMonth() + 1, 2);
        const day = this.padNumber(currentDate.getDate(), 2);
        const randomPart = this.generateRandomNumber(6);
        const sequence = '01'; // Replace this with your sequence number logic if needed

        return `${year}-${month}-${day}-${randomPart}-${sequence}`;
    }

    padNumber(num: number, size: number): string {
        let numString = num.toString();
        while (numString.length < size) numString = '0' + numString;
        return numString;
    }

    generateRandomNumber(length: number): string {
        const characters = '0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            const index = Math.floor(Math.random() * characters.length);
            result += characters.charAt(index);
        }
        return result;
    }

    filterCountry(event: AutoCompleteCompleteEvent) {
        let filtered: any[] = [];
        let query = event.query;

        for (let i = 0; i < (this.countries as any[]).length; i++) {
            let country = (this.countries as any[])[i];
            if (country.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(country);
            }
        }

        this.filteredCountries = filtered;
    }

    departments: Department[];

    getDepartments() {
        this.assetService.getDepartment().subscribe(
            (departments: Department[]) => {
                this.departments = departments;
            },
            (error) => {
                console.error('Error fetching departments:', error);
            }
        );
    }

    users: Employee[] = [];



    filteredUsers: any[] | undefined;

    getEmployee() {
        this.assetService.getUsers().subscribe(
            (users: Employee[]) => {
                this.users = users;
            },
            (error) => {
                console.error('Error fetching employees:', error);
            }
        );
    }
    filterUsers(event: AutoCompleteCompleteEvent) {
        let filtered: Employee[] = [];
        let query = event.query;

        if (this.users) {
          filtered = this.users.filter((user) => {
            return user.firstName.toLowerCase().includes(query.toLowerCase());
          });
        }

        this.filteredUsers = filtered;
      }

    onFormSubmit() {
        if (this.assetForm.valid) {
            this.assetService.addAsset(this.assetForm.value).subscribe({
                next: (val: any) => {
                    alert('Asset Added');
                    window.location.reload();
                },
                error: (err: any) => {
                    console.error('API error:', err);
                    // Check for specific error details from the API response
                    if (err.error && err.error.message) {
                        console.error('API error message:', err.error.message);
                    }
                },
            });
        }
    }

    departmentCodes: string[] = [];

    getDepartmentCodes() {
        this.assetService.getDepartmentCodes().subscribe(
            (departmentCodes: string[]) => {
                this.departmentCodes = departmentCodes;
            },
            (error) => {
                console.error('Error fetching department codes:', error);
            }
        );
    }

    selectedUserId: number | null = null;

    setupCurrentUserListener() {
        this.assetForm.get('currentUser').valueChanges.subscribe((selectedUser) => {
          // Assuming your currentUser object has a property named empId
          const empId = selectedUser?.id || '' ;
          this.assetForm.get('empId').setValue(empId); // Update the empId field value
        });
      }

      onUserSelect(selectedUser: Employee) {
        this.selectedUserId = selectedUser.id;
        this.assetForm.patchValue({
          empId: this.selectedUserId
        });
      }
}
