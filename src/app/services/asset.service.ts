import { Injectable } from '@angular/core';

import { AssetAssignedDTO, AssetInventoryDTO } from '../models/uploading.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import {
    Department,
    Employee,
    EmployeeAccount,
} from '../models/employee.model';
import { catchError, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AssetService {
    constructor(private _http: HttpClient) {}

    private apiEndpoint = '/api/Employee';

    uploadCSV(file: File): Observable<any> {
        const formData = new FormData();
        formData.append('file', file);
        const options = {
            headers: new HttpHeaders(),
            responseType: 'text' as 'json',
        };
        return this._http.post<any>(
            '/api/AssetAssigned/import',
            formData,
            options
        );

    }
    addAsset(data: AssetAssignedDTO): Observable<AssetAssignedDTO[]> {
        return this._http.post<AssetAssignedDTO[]>('/api/AssetAssigned', data);
    }

    getAsset(): Observable<AssetInventoryDTO[]> {
        return this._http.get<AssetInventoryDTO[]>(
            '/api/api/AssetAssignedTABLE'
        );
    }

    importCSVData(csvData: string) {
        const formData = new FormData();
        formData.append(
            'file',
            new Blob([csvData], { type: 'text/csv' }),
            'data.csv'
        );

        return this._http.post<any>('/api/AssetAssigned/import', formData);
    }

    getDepartment(): Observable<Department[]> {
        return this._http.get<Department[]>('/api//Departments');
    }

    getDepartmentCodes(): Observable<string[]> {
        return this._http
            .get<Department[]>('/api/Departments')
            .pipe(
                map((departments: Department[]) =>
                    departments.map((department) => department.deptCode)
                )
            );
    }

    // Assuming 'Employee' interface or class is defined for the Employee data model.
    getEmployee(searchQuery: string): Observable<Employee[]> {
        return this._http
            .get<any[]>(`${this.apiEndpoint}?q=${searchQuery}`)
            .pipe(map((response: any) => response.$values));
    }

    getUsers(): Observable<Employee[]> {
        return this._http.get<Employee[]>('/api/Employee');
    }

    getEmployeeFirstName() {
        return this._http.get<Employee[]>('/api/Employee').pipe(
            map((employees: Employee[]) => {
                return employees.map((employee) => employee.firstname);
            }),
            catchError((error) => {
                console.error('Error fetching employee first names:', error);
                return []; // Return an empty array in case of an error
            })
        );
    }

    getEmployeeAccount(): Observable<EmployeeAccount[]> {
        return this._http.get<EmployeeAccount[]>('/api/EmployeeAccount');
    }

    updateAsset(id: number, data: any ):  Observable<AssetAssignedDTO[]>{
        return this._http.put<any>(`/api/AssetAssigned/${id}`, data);
    }


    updateAssetImage(assetId: number, formData: FormData) {
        const options = {
            headers: new HttpHeaders({
                'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundaryXYZ'
            })
        };
        return this._http.post<any>(`/api/AssetAssigned/${assetId}/upload-image`, formData, options);
    }


}
