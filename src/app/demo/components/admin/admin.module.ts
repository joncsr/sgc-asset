import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChartModule } from 'primeng/chart';
import { MenuModule } from 'primeng/menu';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { StyleClassModule } from 'primeng/styleclass';
import { PanelMenuModule } from 'primeng/panelmenu';

import { FileUploadModule } from 'primeng/fileupload';

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

import { AvatarGroupModule } from 'primeng/avatargroup';
import { ChipModule } from 'primeng/chip';
import { ScrollTopModule } from 'primeng/scrolltop';
import { TagModule } from 'primeng/tag';
import { BadgeModule } from 'primeng/badge';

import { InputTextareaModule } from 'primeng/inputtextarea';
import { CalendarModule } from 'primeng/calendar';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ReactiveFormsModule } from '@angular/forms';
import { SplitterModule } from 'primeng/splitter';
import { AccordionModule } from 'primeng/accordion';
import { DataViewModule } from 'primeng/dataview';
import { ImageModule } from 'primeng/image';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { AdminComponent } from './admin.component';
import { AdminsRoutingModule } from './admin-routing.module';
import { RouterModule } from '@angular/router';
import { AssetCategoryComponent } from './asset-category/add-asset-category.component';
import { ComponentCategoryComponent } from './component-category/add-component-category.component';
import { OrderListModule } from 'primeng/orderlist';
import { PickListModule } from 'primeng/picklist';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ChartModule,
        MenuModule,
        TableModule,
        StyleClassModule,
        PanelMenuModule,
        DataViewModule,

        AdminsRoutingModule,
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

        InputTextareaModule,
        CalendarModule,
        AutoCompleteModule,
        ReactiveFormsModule,

        SplitterModule,
        AccordionModule,
        ImageModule,

        DynamicDialogModule,
        OrderListModule,
        PickListModule,


        RouterModule.forChild([
            {
                path: '',
                component: AdminComponent,
                children: [
                    {
                        path: '', redirectTo: 'asset_category', pathMatch:'full'
                    },
                    {
                        path:'asset_category', component: AssetCategoryComponent
                    },
                    {
                        path:'component_category', component: ComponentCategoryComponent
                    }
                ],
            },
        ]),

    ],
    declarations: [
        AdminComponent,
        AssetCategoryComponent,
        ComponentCategoryComponent

    ],

    providers: [MessageService, DialogService],
})
export class AdminModule {}
