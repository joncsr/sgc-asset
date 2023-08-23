import { HttpClient, HttpEventType, HttpRequest } from '@angular/common/http';
import { Component, OnInit, OnDestroy, NgModule, ViewChild, ElementRef } from '@angular/core';
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
import QRCode from 'qrcode';

interface AutoCompleteCompleteEvent {
    originalEvent: Event;
    query: string;
}
interface Sort {
    name: string;
    code: string;
}
@Component({
    templateUrl: './asset.component.html',
})
export class AssetComponent implements OnInit {

    representatives!: Representative[];

    statuses!: any[];

    loading: boolean = true;

    add_asset: boolean = false;

    upload_asset: boolean = false;

    download_asset: boolean = false;


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

    sorts: Sort[] | undefined
    selectedSort: Sort | undefined

    updateAssetForm: FormGroup;

    constructor(
        private assetService: AssetService,
        private formBuilder: FormBuilder,
        private messageService: MessageService,
        private dropdownService: DropdownService,
        private http: HttpClient,
    ) {
        this.uploadForm = this.formBuilder.group({
            fileInput: ['', Validators.required],
        });

        this.editImageForm = this.formBuilder.group({
            imagePath: ['', Validators.required]
        })

        this.updateAssetForm = this.formBuilder.group({
            company: [''], // Initial value
            department: [''], // Initial value
            remarks: [''], // Initial value
            currentUser: ['None'], // Initial value
            empId: [''],
        });
    }

    ngOnInit() {

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

        this.sorts = [
            { name: 'Allocated', code: 'NY' },
            { name: 'Available', code: 'RM' },

        ]

        this.serialNumber();
        this.getAssets();
        this.getUsers();
        this.getCompanyCodes();
        this.getDepartmentCodes();
        this.getUnitTypes();


    }

    clear(table: Table) {
        table.clear();
    }

    unitTypes: string[] = [];
    items: MenuItem[] = []
    getUnitTypes() {
        this.dropdownService.getUnitTypes().subscribe(
            (unitTypes: string[]) => {
                this.unitTypes = unitTypes;
                this.items = this.unitTypes.map(unitType => ({
                    label: unitType,
                    icon: 'pi pi-fw pi-check-circle' // You can set the icon as needed
                }));
            },
            (error) => {
                console.error('Error fetching unit types:', error);
            }
        );
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
    selectedFile: File = null;

    progress: number = 0;
    uploadSuccess: boolean = false;

    onAssetImageUpload() {
        if (this.selectedFile) {
            const formData = new FormData();
            formData.append('imageFile', this.selectedFile, this.selectedFile.name);

            this.assetService.updateAssetImage(this.asset.id, formData).subscribe();
          }
    }

    onImageSelected(event: any) {
        this.selectedFile = event.target.files[0] as File;
    }



    assets: AssetAssignedDTO;
    asset: any;
    selectedUserFullName: string = '';

    getAssets() {
        this.assetService.getAsset().subscribe((data: any) => {
            this.assets = data;
            this.loading = false;
        });
    }

    editAsset(asset: AssetAssignedDTO) {
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

        const qrCodeData = `
        USER: ${ this.asset.isAvailable === false
            ? this.asset.employeeDTO?.fullName
            : "No User"}

        DEPARTMENT: ${this.asset.department}
        BARCODE: ${this.asset.assetInventoryDTO.barcode}
        ACCOUNTABILITY: ${this.asset.accountabilityNo}

      `;
        QRCode.toDataURL(qrCodeData)
          .then(url => {
            this.qrCodeImage = url;
          })
          .catch(error => {
            console.error('Error generating QR code:', error);
          });

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



    updateAssetSubmit() {
        if (this.updateAssetForm.valid) {
            if (this.asset.id) {
                const currentUser = this.updateAssetForm.value.currentUser;
                const selectedUserId = typeof currentUser !== 'string' ? currentUser.id : null;

                this.updateAssetForm.patchValue({
                    empId: selectedUserId
                });

                this.assetService
                    .updateAsset(this.asset.id, this.updateAssetForm.value)
                    .subscribe();
            }
        }
    }

    onUserSelect(event: any) {
        this.selectedUser = event;
        console.log(this.selectedUser)
    }


    showNewUserAutoComplete: boolean = false;
    newUser(){
        this.showNewUserAutoComplete = true
    }

    imageUpload(){

        const formData = new FormData();
        formData.append('image', this.selectedFile, this.selectedFile.name);
        this.assetService.updateAssetImage(this.asset.id, formData).
        subscribe((response)=>{
           console.log(response)
        })
    }

    file: any
    getFile(event: any){
       this.selectedFile=<File>event.target.files[0];

    }

    qrCodeImage: string = '';


}
