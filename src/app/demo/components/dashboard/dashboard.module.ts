import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard.component';
import { ChartModule } from 'primeng/chart';
import { MenuModule } from 'primeng/menu';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { StyleClassModule } from 'primeng/styleclass';
import { PanelMenuModule } from 'primeng/panelmenu';
import { DashboardsRoutingModule } from './dashboard-routing.module';
import { FileUploadModule } from 'primeng/fileupload';
import { FileDemoRoutingModule } from '../uikit/file/filedemo-routing.module';
import { AssetTableComponent } from './asset-table/asset-table.component';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { ProgressBarModule } from 'primeng/progressbar';
import { RatingModule } from 'primeng/rating';
import { RippleModule } from 'primeng/ripple';
import { SliderModule } from 'primeng/slider';
import { ToastModule } from 'primeng/toast';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { DialogModule } from 'primeng/dialog';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { SidebarModule } from 'primeng/sidebar';
import { TooltipModule } from 'primeng/tooltip';
import { MegaMenuModule } from 'primeng/megamenu';
import { StepsModule } from 'primeng/steps';
import { TabMenuModule } from 'primeng/tabmenu';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { RouterModule } from '@angular/router';
import { ConfirmationComponent } from '../uikit/menus/confirmation.component';
import { MenusComponent } from '../uikit/menus/menus.component';
import { PaymentComponent } from '../uikit/menus/payment.component';
import { PersonalComponent } from '../uikit/menus/personal.component';
import { SeatComponent } from '../uikit/menus/seat.component';
import { AssetComponent } from './assets/asset.component';
import { RequestComponent } from './request/request.component';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { ChipModule } from 'primeng/chip';
import { ScrollTopModule } from 'primeng/scrolltop';
import { TagModule } from 'primeng/tag';
import { BadgeModule } from 'primeng/badge';
import { ComponentStorageComponent } from './component-storage/component-storage..component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ChartModule,
        MenuModule,
        TableModule,
        StyleClassModule,
        PanelMenuModule,

        DashboardsRoutingModule,
        FileUploadModule,
        TableModule,
        RatingModule,

        SliderModule,
        InputTextModule,
        ToggleButtonModule,
        RippleModule,
        MultiSelectModule,
        DropdownModule,
        ProgressBarModule,
        ToastModule,
        DialogModule,
        FormsModule,
        TooltipModule,
        BadgeModule,

        ButtonModule,
        OverlayPanelModule,
        TableModule,
        ConfirmDialogModule,
        SidebarModule,

        ConfirmPopupModule,
        TabMenuModule,
        StepsModule,
        TieredMenuModule,

        MegaMenuModule,
        PanelMenuModule,

        TagModule,
        ChipModule,
        AvatarGroupModule,
        ScrollTopModule,

        RouterModule.forChild([
            {
                path: '',
                component: DashboardComponent,
                children: [
                    { path: '', redirectTo: 'personal', pathMatch: 'full' },
                    { path: 'asset', component: AssetComponent },
                    {
                        path: 'component_storage',
                        component: ComponentStorageComponent,
                    },
                    { path: 'request', component: RequestComponent },
                    { path: 'seat', component: SeatComponent },
                    { path: 'payment', component: PaymentComponent },
                ],
            },
        ]),
    ],
    declarations: [
        DashboardComponent,
        AssetTableComponent,
        AssetComponent,
        RequestComponent,
        ComponentStorageComponent,
    ],
})
export class DashboardModule {}
