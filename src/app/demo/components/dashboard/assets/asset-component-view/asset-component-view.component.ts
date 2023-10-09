import { Component, OnInit } from "@angular/core";
import { DynamicDialogRef, DynamicDialogConfig } from "primeng/dynamicdialog";

@Component({
    templateUrl: './asset-component-view.component.html',
})

export class AssetComponentViewComponent implements OnInit {


    constructor(
        public ref: DynamicDialogRef,
        public config: DynamicDialogConfig
    ){}

    ngOnInit(): void {

    }

}
