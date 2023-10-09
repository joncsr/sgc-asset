import { Component, OnInit } from "@angular/core";
import { DynamicDialogRef, DynamicDialogConfig, DialogService } from "primeng/dynamicdialog";
import { Component as Com } from 'src/app/models/component.model';

import { AssetComponentViewComponent } from "../asset-component-view/asset-component-view.component";
import { AssetComponentService } from "src/app/services/it-asset/asset-component.service";

@Component({
    templateUrl: './view-asset.component.html',
})

export class AssetViewComponent implements OnInit {


    constructor(
        public ref: DynamicDialogRef,
        public config: DynamicDialogConfig,
        private componentService: AssetComponentService,
        public dialogService: DialogService
    ){}

    ngOnInit(): void {
        this.getAssetComponent(this.config.data.asset.id)
        console.log(this.config)
        console.log(this.config.data.asset.assethistoryDTO.previuosUserId)
    }

    component: Com[] = [];
    getAssetComponent(assetId: number) {
        this.componentService.getComponent(assetId).subscribe(
            (components: Com[]) => {
                this.component = components;
                // Now you have the components associated with the specified asset
            },
            (error) => {
                console.error('Error fetching asset components:', error);
            }
        );
    }

    showComponent(component: Com) {
        this.ref = this.dialogService.open(AssetComponentViewComponent, {
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

}
