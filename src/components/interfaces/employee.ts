export interface EmployeeData {
  id: string;
  image?: string;
  account: string;
  position: string;
  line: string;
  fullName: string;
  email: string;
  managerName: string;
  nameBlock?: string;
}

export interface EmployeeNode {
  expanded: boolean;
  type: TypeNode;
  data: EmployeeData;
  children: EmployeeNode[];
}

export type TypeNode = "person" | "block";

export interface EmployeeDataFromAPI {
  ID: string;
  Image?: string;
  Account: string;
  Position: string;
  Line: string;
  Fullname: string;
  Email: string;
  ManagerId: string;
  ManagerName: string;
  Leadership: boolean;
}
