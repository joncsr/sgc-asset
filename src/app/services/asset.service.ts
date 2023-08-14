import { Injectable } from '@angular/core';

import { AssetAssignedDTO, AssetInventoryDTO } from '../models/uploading.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Department, Employee } from '../models/employee.model';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AssetService {

  constructor(
    private _http: HttpClient,
  ) { }

  private apiEndpoint = '/api/Employee';

  uploadCSV(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    const options = {
      headers: new HttpHeaders(),
      responseType: 'text' as 'json'
    };
    return this._http.post<any>('/api/AssetAssigned/import', formData, options);
    // return this._http.post<any>('/api/AssetAssigned/import', formData);
  }
  addAsset(data: AssetAssignedDTO): Observable<AssetAssignedDTO[]> {
    return this._http.post<AssetAssignedDTO[]>('/api/AssetAssigned', data);
  }
  getAsset(): Observable<AssetInventoryDTO[]>{
    return this._http.get<AssetInventoryDTO[]>('/api/AssetAssigned');
  }

  importCSVData(csvData: string) {
    const formData = new FormData();
    formData.append('file', new Blob([csvData], { type: 'text/csv' }), 'data.csv');

    return this._http.post<any>('/api/AssetAssigned/import', formData);
  }

  getDepartment(): Observable<Department[]>{
    return this._http.get<Department[]>('/api//Departments');
  }

// Assuming 'Employee' interface or class is defined for the Employee data model.
  getEmployee(searchQuery: string): Observable<Employee[]> {
    return this._http.get<any[]>(`${this.apiEndpoint}?q=${searchQuery}`).pipe(
      map((response: any) => response.$values)
    );
  }

}