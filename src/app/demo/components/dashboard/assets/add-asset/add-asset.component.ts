import { Component, OnInit, OnDestroy, NgModule } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SelectItem } from 'primeng/api';
import { MenuItem } from 'primeng/api/menuitem';
import { Table } from 'primeng/table';
import { Customer, Representative } from 'src/app/demo/api/customer';
import { CountryService } from 'src/app/demo/service/country.service';
import { CustomerService } from 'src/app/demo/service/customer.service';
import { Department } from 'src/app/models/employee.model';
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
    departments: Department[] | undefined;
    selectedDrop: SelectItem = { value: '' };
    cities: SelectItem[] = [];

    assetForm!: FormGroup;
    formGroup!: FormGroup;

    constructor(
        private countryService: CountryService,
        private formBuilder: FormBuilder,
        private assetService: AssetService
    ) {}

    ngOnInit(): void {
        this.countryService.getCountries().then((countries) => {
            this.countries = countries;
        });

        this.cities = [
            {
                label: 'New York',
                value: { id: 1, name: 'New York', code: 'NY' },
            },
            { label: 'Rome', value: { id: 2, name: 'Rome', code: 'RM' } },
            { label: 'London', value: { id: 3, name: 'London', code: 'LDN' } },
            {
                label: 'Istanbul',
                value: { id: 4, name: 'Istanbul', code: 'IST' },
            },
            { label: 'Paris', value: { id: 5, name: 'Paris', code: 'PRS' } },
        ];

        this.initForm();
        this.getDepartments();
    }

    initForm() {
        this.assetForm = this.formBuilder.group({
            company: ['', Validators.required],
            department: ['', Validators.required],
            accountabilityNo: ['', Validators.required],
            currentUser: ['', Validators.required],
            remarks: ['', Validators.required],

            assetInventoryDTO: this.formBuilder.group({
                barcode: [
                    this.generateBarcode(),
                    [Validators.required, Validators.minLength(6)],
                ], // Set initial value for barcode
                unit: ['', Validators.required],
                serialNo: ['', Validators.required],
                specs: ['', Validators.required],
                vendor: ['', Validators.required],
                warranty: ['', Validators.required],
                datePO: ['', Validators.required],
                dateAcquired: ['', Validators.required],
            }),
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

    onFormSubmit() {}

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

    getDepartments(): void {
        this.assetService.getDepartment().subscribe(
          (departments: any) => {
            this.departments = departments.$values; // Assign the fetched departments to the 'departments' array
          },
          (error) => {
            console.error("Error fetching departments:", error);
          }
        );
      }
}
