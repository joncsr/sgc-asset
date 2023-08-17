export interface AssetAssignedDTO {
    id:                number;
    assetInventoryId:  number;
    assetInventoryDTO: AssetInventoryDTO;
    company:           string;
    department:        string;
    accountabilityNo:  string;
    empId:             number;
    remarks:           string;
    lastModified:      string;
    employeeDTO?:       EmployeeDTO;
    isAvailable:       boolean;
}

export interface AssetInventoryDTO {
    id:           number;
    barcode:      string;
    unit:         string;
    serialNo:     string;
    specs:        string;
    vendor:       string;
    warranty:     string;
    datePO:       string;
    dateAcquired: string;

}

export interface EmployeeDTO {
    id?:           number;
    employeeCode?: string;
    firstname?:    string;
    middlename?:   string;
    lastname?:     string;
    company?:      string;
    department?:   string;
    domainName?:   string;
    anydeskCode?:  string;
    position?:     string;
    fullName?: string
}


export class AssetAssignedDTOView {
    id:                number;
    assetInventoryId:  number;
    assetInventoryDTO: AssetInventoryDTO;
    company:           string;
    department:        string;
    accountabilityNo:  string;
    empId:             number;
    remarks:           string;
    lastModified:      string;
    employeeDTO?:       EmployeeDTO;

        /**
     * Constructor
     *
     * @param asset
     *
     */

        constructor(asset?) {
            asset = asset || {};
        }
}




