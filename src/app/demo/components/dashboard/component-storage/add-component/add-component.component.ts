import { Component, OnInit, OnDestroy, NgModule } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AssetService } from 'src/app/services/asset.service';
import { AssetListComponent } from '../asset-list/asset-list.component';
import { MessageService } from 'primeng/api';
import { AssetAssignedDTO } from 'src/app/models/uploading.model';

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

    componentTypes: string[] = [];
    getComponentType() {
        this.assetService.getComponentTypes().subscribe(
            (componentTypes: string[]) => {
                this.componentTypes = componentTypes;
            },
            (error) => {
                console.error('Error fetching department codes:', error);
            }
        );
    }

    componentAddForm() {
        this.componentForm = this.formBuilder.group({
            barcode: [
                this.generateBarcode(),
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

    onFormSubmit() {
        if(this.componentForm.valid){
            this.assetService.addAssetComponent(this.componentForm.value).subscribe(
                (response) => {
                    // Success callback
                    console.log('Component added successfully:', response);
                    this.messageService.add({ severity: 'success', summary: 'Asset Selected', detail: 'Added Success' });
                    this.componentForm.reset();
                    setTimeout(() => {
                        window.location.reload();
                      }, 2000);
                  },
            )
        }
    }

    asset: any
    selectedAsset(){
        this.asset.assetInventoryId
    }
    showAsset() {
        this.ref = this.dialogService.open(AssetListComponent, {
            data: {
                id: '51gF3'
            },
            header: 'Select Asset',
            width: '70%',
            contentStyle: { overflow: 'auto' },
            baseZIndex: 10000,
            maximizable: true

        });
        this.ref.onClose.subscribe((asset: any) => {
            if (asset) {
                this.componentForm.patchValue({ assignedID: asset.assetInventoryId });
                this.componentForm.patchValue({ asset: asset.accountabilityNo });
                this.messageService.add({ severity: 'info', summary: `Asset Selected: ${asset.assetInventoryId}`, detail: asset.accountabilityNo });
            }
        });
    }
}
