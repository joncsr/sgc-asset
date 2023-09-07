import { Component, OnInit, OnDestroy, NgModule, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import {
    AssetAssignedDTO,
    AssetAssignedDTOView,
} from 'src/app/models/uploading.model';
import { AssetService } from 'src/app/services/it-asset/asset.service';

interface AutoCompleteCompleteEvent {
    originalEvent: Event;
    query: string;
}

@Component({
    selector: 'app-edit-asset',
    templateUrl: './edit-asset.component.html',
})
export class EditAssetComponent implements OnInit {

    updateAssetForm: FormGroup;
    @Input() selectedAsset: any;

    constructor(
        private assetService: AssetService,
        private formBuilder: FormBuilder,
        public ref: DynamicDialogRef,
        public config: DynamicDialogConfig,
        private messageService: MessageService,
    ) {

        this.updateAssetForm = this.formBuilder.group({
            company: [''], // Initial value
            department: [''], // Initial value
            remarks: [''], // Initial value
            currentUser: ['None'], // Initial value
            empId: [''],
        });
    }
    ngOnInit(): void {}

    asset: AssetAssignedDTO
    updateAssetSubmit() {
        if (this.updateAssetForm.valid) {
            if (this.asset.id) {
                const currentUser = this.updateAssetForm.value.currentUser;
                const selectedUserId =
                    typeof currentUser !== 'string'
                        ? currentUser.id
                        : null;

                this.updateAssetForm.patchValue({
                    empId: selectedUserId,
                });

                this.assetService
                    .updateAsset(this.asset.id, this.updateAssetForm.value)
                    .subscribe((response) => {
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Asset Updated',
                            detail: 'Added Success',
                        });
                        this.updateAssetForm.reset();
                        setTimeout(() => {
                            window.location.reload();
                        }, 2000);
                        alert('Added');
                    });
            }
        }
    }
}
