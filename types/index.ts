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

export interface MasterProduct {
    id: number;
    tradeName: string;
    scientificName: string;
    concentration: string;
    size: string;
    refPurchasePrice: number;
    refSellingPrice: number;
    notes: string;
    tax: number;
    barcode: string;
    productType: 'MASTER' | 'PHARMACY';
    requiresPrescription: boolean;
    type: string;
    form: string;
    manufacturer: string;
    categories: string[];
}

export interface Category {
  id: number;
  name: string;
}

export interface Type {
  id: number;
  name: string;
}

export interface Manufacturer {
  id: number;
  name: string;
}