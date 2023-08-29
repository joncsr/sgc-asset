import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AssetService } from 'src/app/services/asset.service';
import { AssetListComponent } from '../asset-list/asset-list.component';
import { MessageService } from 'primeng/api';

@Component({
    templateUrl: './add-component.component.html',
})
export class AddComponentComponent implements OnInit {
    ref: DynamicDialogRef;
    componentForm: FormGroup;
    constructor(
        private assetService: AssetService,
        private formBuilder: FormBuilder,
        public dialogService: DialogService,
        public messageService: MessageService
    ) {}

    ngOnInit(): void {
        this.componentAddForm();
        this.getComponentType();
    }

    /**
     * Fetches the component types from the service and updates the componentTypes array.
     */

    componentTypes: string[] = [];
    getComponentType(): void {
        // Fetch component types using the asset service
        this.assetService.getComponentTypes().subscribe(
            (componentTypes: string[]) => {
                // Update the componentTypes array with the fetched data
                this.componentTypes = componentTypes;
            },
            (error) => {
                // Handle error while fetching component types
                console.error('Error fetching type codes:', error);
            }
        );
    }

    /**
     * Sets up the form for adding a new component with default values, including a generated barcode.
     */
    componentAddForm(): void {
        // Generate a barcode for the component
        const generatedBarcode = this.generateBarcode();
        console.log('Generated Barcode:', generatedBarcode);

        // Create the component form with default values and validations
        this.componentForm = this.formBuilder.group({
            barcode: [
                generatedBarcode, // Use the generated barcode as the initial value
                [Validators.required, Validators.minLength(6)],
            ],
            serialNo: [''],
            componentType: [''],
            brand: [''],
            model: [''],
            specification: [''],
            vendor: [''],
            datePO: [''],
            dateAcquired: [''],
            warranty:[''],
            asset: [''],
            assignedID: [''],
        });
    }

    generateBarcode(): string {
        const currentDate = new Date();
        const year = currentDate.getFullYear().toString().slice(-2); // Get last 2 digits of the year
        const month = this.padNumber(currentDate.getMonth() + 1, 2);
        const day = this.padNumber(currentDate.getDate(), 2);
        const randomPart = this.generateRandomNumber(6);
        const sequence = '01';

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

    onFormSubmit() {
        if (this.componentForm.valid) {
            this.assetService
                .addAssetComponent(this.componentForm.value)
                .subscribe((response) => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Asset Selected',
                        detail: 'Added Success',
                    });
                    // this.componentForm.reset();
                    // setTimeout(() => {
                    //     window.location.reload();
                    //   }, 2000);

                    alert(response);
                });
        }
    }

    asset: any;
    selectedAsset() {
        this.asset.assetInventoryId;
    }

    /**
     * Opens a dialog to select an asset and updates the component form fields based on the selected asset.
     */
    showAsset(): void {
        // Open a dialog to select an asset
        this.ref = this.dialogService.open(AssetListComponent, {
            header: 'Select Asset',
            width: '70%',
            contentStyle: { overflow: 'auto' },
            baseZIndex: 10000,
            maximizable: true,
        });

        // Subscribe to the onClose event of the dialog
        this.ref.onClose.subscribe((asset: any) => {
            if (asset) {
                // Update component form fields with selected asset information
                this.componentForm.patchValue({
                    assignedID: asset.assetInventoryId, // Set the assigned ID
                    asset: asset.accountabilityNo, // Set the asset accountability number
                });

                // Display a message indicating the selected asset
                this.messageService.add({
                    severity: 'info',
                    summary: `Asset Selected: ${asset.assetInventoryId}`,
                    detail: asset.accountabilityNo,
                });
            }
        });
    }
}
