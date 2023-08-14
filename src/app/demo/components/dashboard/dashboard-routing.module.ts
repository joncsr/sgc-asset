import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { AssetTableComponent } from './asset-table/asset-table.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: DashboardComponent },
        { path: 'asset-table', component: AssetTableComponent }
    ])],
    exports: [RouterModule]
})
export class DashboardsRoutingModule { }
