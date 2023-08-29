import { Component, OnInit, OnDestroy, NgModule } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
    templateUrl: './component-edit.component.html',
})
export class ComponentEditComponent implements OnInit {

    constructor(
        public ref: DynamicDialogRef,
        public config: DynamicDialogConfig
    ){

    }

    ngOnInit(): void {

    }

    close(){
        this.ref.close();
    }


}
