import { Component } from "@angular/core";
import { SelectItem } from "primeng/api";
import { Subscription } from "rxjs";
import { Product } from "src/app/demo/api/product";
import { ProductService } from "src/app/demo/service/product.service";
import { LayoutService } from "src/app/layout/service/app.layout.service";
import { UnitType } from "src/app/models/dropdowns.model";
import { DropdownService } from "src/app/services/dropdowns.service";

@Component({
    templateUrl: './add-asset-category.component.html',
})
export class AssetCategoryComponent {
    products: Product[] = [];

    sortOptions: SelectItem[] = [];

    sortOrder: number = 0;

    sortField: string = '';

    sourceCities: any[] = [];

    targetCities: any[] = [];

    orderAssetType: UnitType[] = [];

    pieData: any;
    subscription: Subscription;
    pieOptions: any;

    constructor(private productService: ProductService,
        public layoutService: LayoutService,
        private dataService: DropdownService
        ) {
            this.subscription = this.layoutService.configUpdate$.subscribe(config => {
                this.initCharts();
            });
         }

    ngOnInit() {
        this.productService.getProducts().then(data => this.products = data);

        this.sourceCities = [
            { name: 'San Francisco', code: 'SF' },
            { name: 'London', code: 'LDN' },
            { name: 'Paris', code: 'PRS' },
            { name: 'Istanbul', code: 'IST' },
            { name: 'Berlin', code: 'BRL' },
            { name: 'Barcelona', code: 'BRC' },
            { name: 'Rome', code: 'RM' }];

        this.targetCities = [];

        this.dataService.getOrderAssetTypes().subscribe(
            (units: UnitType[]) => {
                this.orderAssetType = units;

                const unitNames = this.orderAssetType.map(unit => unit.unitName);
                this.getPieData(unitNames)

            },
            (error) => {
                console.error('Error fetching order asset types:', error);
            }
        );

        this.sortOptions = [
            { label: 'Price High to Low', value: '!price' },
            { label: 'Price Low to High', value: 'price' }
        ];


    }

    onSortChange(event: any) {
        const value = event.value;

        if (value.indexOf('!') === 0) {
            this.sortOrder = -1;
            this.sortField = value.substring(1, value.length);
        } else {
            this.sortOrder = 1;
            this.sortField = value;
        }
    }

    // onFilter(dv: DataView, event: Event) {
    //     dv.filter((event.target as HTMLInputElement).value);
    // }

    addAsset: boolean = false;

    initCharts() {

        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        this.pieOptions = {
            plugins: {
                legend: {
                    labels: {
                        usePointStyle: true,
                        color: textColor
                    }
                }
            }
        };

    }

    getPieData(unitTypeName: any){
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');

        this.pieOptions = {
            plugins: {
                legend: {
                    labels: {
                        usePointStyle: true,
                        color: textColor
                    }
                }
            }
        };

        this.pieData = {
            labels: unitTypeName,
            datasets: [
                {
                    data: [540, 325, 702],
                    backgroundColor: [
                        documentStyle.getPropertyValue('--indigo-500'),
                        documentStyle.getPropertyValue('--purple-500'),
                        documentStyle.getPropertyValue('--teal-500')
                    ],
                    hoverBackgroundColor: [
                        documentStyle.getPropertyValue('--indigo-400'),
                        documentStyle.getPropertyValue('--purple-400'),
                        documentStyle.getPropertyValue('--teal-400')
                    ]
                }]
        };
    }



}

