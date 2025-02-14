export interface EmployeeData {
  id: string;
  image?: string;
  account: string;
  position: string;
  line: string;
  fullName: string;
  email: string;
}

export interface EmployeeNode {
  expanded: boolean;
  type: string;
  data: EmployeeData;
  children: EmployeeNode[];
}

export interface EmployeeDataFromAPI {
  ID: string;
  Image?: string;
  Account: string;
  Position: string;
  Line: string;
  Fullname: string;
  Email: string;
  ManagerId: string;
  Leadership: boolean;
}
