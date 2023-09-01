import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ComponentType } from '@fullcalendar/core/preact';
import { Component } from 'src/app/models/component.model';



@Injectable({
    providedIn: 'root',
})
export class AssetComponentService {
    constructor(private _http: HttpClient) {}

    getComponents(): Observable<Component[]>{
        return this._http.get<Component[]>(
            'api/AssetComponentGET'
        );
    }

    getComponent(assetId: number): Observable<Component[]>{
        return this._http.get<Component[]>(
            `api/AssetComponentGET/${assetId}`
        );
    }

}
