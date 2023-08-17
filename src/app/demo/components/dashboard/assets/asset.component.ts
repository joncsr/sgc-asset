import { HttpClient } from '@angular/common/http';
import { Component, OnInit, OnDestroy, NgModule } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuItem } from 'primeng/api/menuitem';
import { Table } from 'primeng/table';
import { catchError, of } from 'rxjs';
import { Customer, Representative } from 'src/app/demo/api/customer';
import { Product } from 'src/app/demo/api/product';
import { CustomerService } from 'src/app/demo/service/customer.service';
import { AssetAssignedDTO, AssetAssignedDTOView,  } from 'src/app/models/uploading.model';
import { AssetService } from 'src/app/services/asset.service';

@Component({
    templateUrl: './asset.component.html',
})
export class AssetComponent implements OnInit {
    customers!: Customer[];

    representatives!: Representative[];

    statuses!: any[];

    loading: boolean = true;

    activityValues: number[] = [0, 100];

    display: boolean = false;

    add_asset: boolean = false;
    upload_asset: boolean = false;
    download_asset: boolean = false;

    items: MenuItem[] | undefined;

    serialNumbers = [];

    uploadForm: FormGroup;
    Data: any;
    fileContent: string;

    action: MenuItem[] | undefined;

    visible: boolean = false;
    edit: boolean = false;
    delete: boolean = false;
    dt: any;

    constructor(
        private assetService: AssetService,
        private _http: HttpClient,
        private formBuilder: FormBuilder,
        private customerService: CustomerService
    ) {
        this.uploadForm = this.formBuilder.group({
            fileInput: ['', Validators.required],
        });
    }

    ngOnInit() {
        this.items = [
            { label: 'Desktop', icon: 'pi pi-fw pi-twitter' },
            { label: 'Laptop', icon: 'pi pi-fw pi-twitter' },
            { label: 'TV', icon: 'pi pi-fw pi-twitter' },
            { label: 'Printer', icon: 'pi pi-fw pi-twitter' },
            { label: 'Others', icon: 'pi pi-fw pi-twitter' },
        ];

        this.action = [
            {
                label: 'Update',
                icon: 'pi pi-refresh',
            },
            {
                label: 'Delete',
                icon: 'pi pi-times',
            },
        ];

        this.serialNumber();

        this.getAssets();
    }

    clear(table: Table) {
        table.clear();
    }

    onUpload(event: any) {}

    onBasicUpload(): void {
        if (this.uploadForm.valid && this.fileContent) {
            const file = new File([this.fileContent], 'data.csv', {
                type: 'text/csv',
            });

            // Make the API call and handle the response
            this.assetService.uploadCSV(file).subscribe((response) => {
                // Handle the successful response here
                alert('File Uploaded');
            });
        }
    }

    serialNumber() {
        for (let i = 0; i < 10; i++) {
            this.serialNumbers.push(
                `A${Math.floor(Math.random() * 999) + 1}${
                    Math.floor(Math.random() * 9) + 1
                }A112${Math.floor(Math.random() * 9999) + 1}`
            );
        }
    }

    onFileSelected(event: any) {
        const file: File = event.target.files[0];

        if (file) {
            const reader: FileReader = new FileReader();
            reader.onload = (e) => {
                this.fileContent = reader.result as string;
            };
            reader.readAsText(file);
        }
    }

    onSubmit(): void {
        if (this.uploadForm.valid && this.fileContent) {
            const file = new File([this.fileContent], 'data.csv', {
                type: 'text/csv',
            });

            // Make the API call and handle the response
            this.assetService
                .uploadCSV(file)
                .pipe(
                    catchError((error) => {
                        // Handle the error here
                        console.error(
                            'An error occurred while uploading the file:',
                            error
                        );
                        alert('An error occurred while uploading the file.');
                        window.location.reload();
                        return of(null); // Return a placeholder observable to continue the stream
                    })
                )
                .subscribe((response) => {
                    if (response !== null) {
                        // Handle the successful response here
                        alert('File Uploaded');
                        window.location.reload();
                    }
                });
        }
    }

    assets: AssetAssignedDTO[] = [];
    asset: AssetAssignedDTOView

    getAssets() {
        this.assetService.getAsset().subscribe((data: any) => {
            this.assets = data;
        });
        this.loading = false;
    }

    editProduct(asset: AssetAssignedDTO) {
        this.asset = asset;
        this.edit = true;
    }

    deleteProduct(asset: AssetAssignedDTO) {
        this.asset = asset;
        this.delete = true;
    }

    showDialog(viewAsset: AssetAssignedDTO) {
        this.asset = viewAsset;
        this.visible = true;
    }

    filter(filterValue: string[]) {
        if (filterValue.length === 0) {
            // No filters selected, reset the filter
            this.dt.filter(null, 'assets', 'in');
        } else {
            this.dt.filter((value: AssetAssignedDTO) => {
                if (filterValue.includes('false') && value.isAvailable === false) {
                    return true;
                }
                if (filterValue.includes('true') && value.isAvailable === true) {
                    return true;
                }
                return false;
            }, 'assets', 'custom');
        }
    }


}
