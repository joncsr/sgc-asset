import { Component, OnInit, OnDestroy, NgModule } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SelectItem } from 'primeng/api';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { Table } from 'primeng/table';
import { AssetAssignedDTO } from 'src/app/models/uploading.model';
import { AssetService } from 'src/app/services/it-asset/asset.service';

@Component({
    templateUrl: './asset-list.component.html',
})
export class AssetListComponent implements OnInit {
    sortOptions: SelectItem[] = [];
    sortOrder: number = 0;
    sortField: string = '';

    constructor(
        private assetService: AssetService,
        public ref: DynamicDialogRef
    ) {}

    ngOnInit(): void {
        this.getAssets();

        this.sortOptions = [
            { label: 'Allocated', value: false },
            { label: 'Available', value: true },
        ];
    }

    loading: boolean = true;
    assets: AssetAssignedDTO[];
    asset: any;
    selectedUserFullName: string = '';

    getAssets() {
        this.assetService.getAsset().subscribe((data: any) => {
            this.assets = data;
            this.loading = false;
        });
    }

    addAsset(asset: AssetAssignedDTO) {
        this.asset = asset;
        console.log(asset);
        this.ref.close(this.asset);
    }

    onSortChange(event: any, dt1: Table) {
        const value = event.value;
        if (value === true) {
            // Sort by available assets
            this.assets.sort((a, b) =>
                a.isAvailable === b.isAvailable ? 0 : a.isAvailable ? -1 : 1
            );
        } else if (value === false) {
            // Sort by allocated assets
            this.assets.sort((a, b) =>
                a.isAvailable === b.isAvailable ? 0 : a.isAvailable ? 1 : -1
            );
        }
        // Reset pagination
        dt1.first = 0;
    }
}
