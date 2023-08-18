import { Component, OnInit, OnDestroy, NgModule, Input } from '@angular/core';
import { AssetAssignedDTO, AssetAssignedDTOView } from 'src/app/models/uploading.model';


interface AutoCompleteCompleteEvent {
    originalEvent: Event;
    query: string;
}

@Component({
    selector: 'app-edit-asset',
    templateUrl: './edit-asset.component.html',
})
export class EditAssetComponent implements OnInit {
    @Input() selectedAsset: any;

    ngOnInit(): void {

    }

}
