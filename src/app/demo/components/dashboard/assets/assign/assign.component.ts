import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { Employee } from 'src/app/models/employee.model';
import { AssetService } from 'src/app/services/it-asset/asset.service';

interface AutoCompleteCompleteEvent {
    originalEvent: Event;
    query: string;
}

@Component({
    templateUrl: './assign.component.html',
})
export class AssignComponent implements OnInit {
    postAssetHistoryForm: FormGroup;
    constructor(
        private assetService: AssetService,
        public ref: DynamicDialogRef,
        public config: DynamicDialogConfig,
        private formBuilder: FormBuilder,
        private messageService: MessageService
    ) {

    }

    ngOnInit(): void {

        this.postAssetHistoryForm = this.formBuilder.group({
            currentUser: [''],
            empId: [''],
        });


        this.getUsers();
        console.log(this.config.data.asset.empId);
    }

    users: Employee[] = [];
    filteredUsers: any[] | undefined;
    selectedUser: any;

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

    onUserSelect(event: any) {
        this.selectedUser = event;
        console.log(this.selectedUser);
    }

    // showNewUserAutoComplete: boolean = false;
    // newUser() {
    //     this.showNewUserAutoComplete = true;
    // }

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

    changeAssetUserSubmit() {
        if (this.postAssetHistoryForm.valid) {
            const currentUser = this.postAssetHistoryForm.value.currentUser;
            const selectedUserId =
                typeof currentUser !== 'string'
                    ? currentUser.id
                    : this.config.data.asset.id;
            this.postAssetHistoryForm.patchValue({
                empId: selectedUserId,
            });

            this.assetService
                .postAssetHistory(
                    this.config.data.asset.id,
                    this.postAssetHistoryForm.value
                )
                .subscribe(
                    (response) => {
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Asset Updated',
                            detail: 'Added Success',
                        });
                        this.postAssetHistoryForm.reset();
                        setTimeout(() => {
                            window.location.reload();
                        }, 2000);
                        alert('Added');
                    },
                    (error) => {
                        console.error('Error posting asset history:', error);
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Error',
                            detail: 'Failed to update asset.',
                        });
                    }
                );
        }
        console.log(this.postAssetHistoryForm)
    }
}
