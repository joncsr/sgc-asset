import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { AssetTableComponent } from './asset-table/asset-table.component';
import { AddAssetComponent } from './assets/add-asset/add-asset.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: DashboardComponent },
        { path: 'asset_table', component: AssetTableComponent },
        { path: 'add_asset', component: AddAssetComponent}

    ])],
    exports: [RouterModule]
})
export class DashboardsRoutingModule { }
