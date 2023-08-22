import { HttpClient } from '@angular/common/http';
import { Component, OnInit, OnDestroy, NgModule } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { MessageService } from 'primeng/api';
import { MenuItem } from 'primeng/api/menuitem';
import { Table } from 'primeng/table';
import { catchError, of } from 'rxjs';
import { Customer, Representative } from 'src/app/demo/api/customer';
import { CustomerService } from 'src/app/demo/service/customer.service';
import { Employee } from 'src/app/models/employee.model';
import {
    AssetAssignedDTO,
    AssetAssignedDTOView,
} from 'src/app/models/uploading.model';
import { AssetService } from 'src/app/services/asset.service';
import { DropdownService } from 'src/app/services/dropdowns.service';

interface AutoCompleteCompleteEvent {
    originalEvent: Event;
    query: string;
}

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

    user_action: MenuItem[] | undefined;

    serialNumbers = [];

    uploadForm: FormGroup;
    editImageForm: FormGroup;

    Data: any;

    fileContent: string;

    action: MenuItem[] | undefined;

    visible: boolean = false;

    edit: boolean = false;

    delete: boolean = false;

    change_user: boolean = false;

    dt: any;

    constructor(
        private assetService: AssetService,
        private formBuilder: FormBuilder,
        private messageService: MessageService,
        private dropdownService: DropdownService
    ) {
        this.uploadForm = this.formBuilder.group({
            fileInput: ['', Validators.required],
        });

        this.editImageForm = this.formBuilder.group({
            imagePath: ['', Validators.required]
        })
    }

    ngOnInit() {
        this.items = [
            { label: 'Desktop', icon: 'pi pi-fw pi-twitter' },
            { label: 'Laptop', icon: 'pi pi-fw pi-twitter' },
            { label: 'TV', icon: 'pi pi-fw pi-twitter' },
            { label: 'Printer', icon: 'pi pi-fw pi-twitter' },
            { label: 'Others', icon: 'pi pi-fw pi-twitter' },
        ];

        this.user_action = [
            {
                label: 'Change',
                icon: 'pi pi-fw pi-user-edit',
            },
            {
                label: 'Remove',
            },
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
        this.getUsers();
        this.getCompanyCodes();
        this.getDepartmentCodes();
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

    imageFile: string;
    selectedImage: File | null = null;

    onAssetImageUpload() {
        if (this.editImageForm.valid && this.selectedImage) {
            const assetId = this.asset.id;

            const formData = new FormData();
            formData.append('imagePath', this.selectedImage);

            this.assetService.updateAssetImage(assetId, formData).subscribe({
                next: (val: any) => {
                    // Handle success
                },
                error: (err: any) => {
                    console.error('API error:', err);
                }
            });
        }
    }

    onImageSelected(event: any) {
        const files = event.target.files;
        if (files.length > 0) {
            this.selectedImage = files[0];
            console.log('Selected Image:', this.selectedImage);
        }
    }



    assets: AssetAssignedDTO;
    asset: any;
    selectedUserFullName: string = '';

    getAssets() {
        this.assetService.getAsset().subscribe((data: any) => {
            this.assets = data.map((asset: any) => ({
                ...asset,
                company: asset.company.toUpperCase(),
                remarks: asset.remarks.toUpperCase(),
                department: asset.department.toUpperCase(),
                accountabilityNo: asset.accountabilityNo.toUpperCase(),
                imagePath: asset.imagePath,
                // Add similar lines for other properties that need to be in uppercase
            }));
            this.loading = false;
        });
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
            this.dt.filter(
                (value: AssetAssignedDTO) => {
                    if (
                        filterValue.includes('false') &&
                        value.isAvailable === false
                    ) {
                        return true;
                    }
                    if (
                        filterValue.includes('true') &&
                        value.isAvailable === true
                    ) {
                        return true;
                    }
                    return false;
                },
                'assets',
                'custom'
            );
        }
    }

    users: Employee[] = [];
    filteredUsers: any[] | undefined;
    selectedUser: any;

    getUsers() {
        this.assetService.getUsers().subscribe(
            (users: Employee[]) => {
                this.users = users;
            },
            (error) => {
                console.error('Error fetching employees:', error);
            }
        );
    }

    filterUsers(event: AutoCompleteCompleteEvent) {
        let filtered: Employee[] = [];
        let query = event.query;

        if (this.users) {
            filtered = this.users.filter((user) => {
                return user.fullName
                    .toLowerCase()
                    .includes(query.toLowerCase());
            });
        }

        this.filteredUsers = filtered;
    }

    changeUser() {
        this.change_user = true;
    }

    onUserSelect(event: any) {
        // Replace `any` with the appropriate type
        this.selectedUser = event; // Update selectedUser with the selected value
    }

    clearSelectedUser() {
        this.selectedUser = 'No User';
    }

    change() {
        this.change_user = false;
    }

    updateAsset() {
        this.edit = false;
        this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'hihiihihi',
        });
    }

    companyCodes: string[] = [];
    getCompanyCodes() {
        this.dropdownService.getCompanyCodes().subscribe(
            (companyCodes: string[]) => {
                this.companyCodes = companyCodes;
            },
            (error) => {
                console.error('Error fetching department codes:', error);
            }
        );
    }

    departmentCodes: string[] = [];
    getDepartmentCodes() {
        this.assetService.getDepartmentCodes().subscribe(
            (departmentCodes: string[]) => {
                this.departmentCodes = departmentCodes;
            },
            (error) => {
                console.error('Error fetching department codes:', error);
            }
        );
    }

    // initUpdateForm(){
    //     this.updateAssetForm = this.formBuilder.group({
    //         company: [''],
    //         department: [''],
    //         empId: [''],
    //         remarks: [''],
    //     })
    // }

    updateAssetForm = new FormGroup({
        company: new FormControl(''),
        department: new FormControl(''),
        remarks: new FormControl(''),
        empId: new FormControl(''),
    });

    updateAssetSubmit() {
        if (this.updateAssetForm.valid) {
            if (this.asset.id) {
                this.assetService
                    .updateAsset(this.asset.id, this.updateAssetForm.value)
                    .subscribe();
            }
        }
    }
}
