import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { DropdownService } from 'src/app/services/dropdowns.service';

@Component({
    templateUrl: './add-asset-post-category.component.html',
})
export class AssetAddCategoryComponent {
    constructor(
        public ref: DynamicDialogRef,
        public config: DynamicDialogConfig,
        private dropDownService: DropdownService,
        public messageService: MessageService
    ) {}

    addAssetCategoryForm = new FormGroup({
        unitName: new FormControl('', Validators.required),
    });

    ngOnInit(): void {}

    onFormSubmit() {
        if (this.addAssetCategoryForm.valid) {
            this.dropDownService
                .postUnitTypes(this.addAssetCategoryForm.value)
                .subscribe((response) => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Added',
                        detail: 'Added Success',
                    });
                    this.addAssetCategoryForm.reset();
                    setTimeout(() => {
                        window.location.reload();
                      }, 1000);
                });
        }
    }

    close() {
        this.ref.close();
    }
}
