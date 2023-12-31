// Generated by https://quicktype.io

// Generated by https://quicktype.io

export interface Employee {
    id:           number;
    employeeCode: string;
    firstname:    string;
    middlename:   string;
    lastname:     string;
    company:      string;
    department:   string;
    domainName:   string;
    anydeskCode:  string;
    position:     string;
    fullName:     string;
}


// Generated by https://quicktype.io

export interface Department {
    id:       number;
    deptCode: string;
    deptName: string;
}
// Generated by https://quicktype.io

export interface Company {
    id:       number;
    compCode: string;
    compName: string;
}



// Generated by https://quicktype.io

export interface EmployeeAccount {
    id:          number;
    username:    string;
    password:    string;
    employeeID:  number;
    userRole:    string;
    employeeDTO: EmployeeDTO;
    status: string;
}

export interface EmployeeDTO {
    id:           number;
    employeeCode: string;
    firstname:    string;
    middlename:   string;
    lastname:     string;
    company:      string;
    department:   string;
    domainName:   string;
    anydeskCode:  string;
    position:     string;
    fullName:     string;
}






