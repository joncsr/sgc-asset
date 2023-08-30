import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Company, Department } from '../models/employee.model';
import { ComponentType, UnitType } from '../models/dropdowns.model';

@Injectable({
    providedIn: 'root',
})
export class DropdownService {
    constructor(private _http: HttpClient) {}

    getDepartmentCodes(): Observable<string[]> {
        return this._http
            .get<Department[]>('/api/Departments')
            .pipe(
                map((departments: Department[]) =>
                    departments.map((department) => department.deptCode)
                )
            );
    }

    getCompanyCodes(): Observable<string[]> {
        return this._http
            .get<Company[]>('/api/Companies')
            .pipe(
                map((companies: Company[]) =>
                    companies.map((company) => company.compCode)
                )
            );
    }

    getUnitTypes(): Observable<string[]> {
        return this._http
            .get<UnitType[]>('/api/UnitTypes')
            .pipe(
                map((units: UnitType[]) => units.map((unit) => unit.unitName))
            );
    }

    getOrderAssetTypes(): Observable<UnitType[]> {
        return this._http.get<UnitType[]>('/api/UnitTypes');
    }

    getComponentTypes(): Observable<string[]> {
        return this._http
            .get<ComponentType[]>('/api/api/ComponentTypes')
            .pipe(
                map((units: ComponentType[]) => units.map((unit) => unit.componentType))
            );
    }


}
