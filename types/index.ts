export interface Pagination {
  page: number;
  limit: number;
  totalCount: number;
}
export interface SelectProps {
  className?: string;
  fullWidth?: boolean;
  size?: 'sm' | 'default';
  error?: any;
  value?: string;
  placeholder?: string;
  mandatory?: boolean;
  clearable?: boolean;
  parentId?: string;
  disabled?: boolean;
  onChange: (e: any) => any;
}

export interface Pharmacy {
  id?: number;
  pharmacyName: number;
  licenseNumber: number;
  address: string;
  email: string;
  type: 'MAIN' | 'BRANCH';
  openingHours: string;
  phoneNumber: string;
  managerEmail: string;
  managerFirstName: string;
  managerLastNam: string;
}
