export interface Pagination {
  page: number
  limit: number
  totalCount: number
}

export interface User {
  id: number | null
  user_id: string
  method: string
  first_name: string
  last_name: string
  password: string
  email: string
  phone_number: string
  created_at: string
  country: string
  access_token: string
  refresh_token: string
  jwt_id: string
  ip_address: string
  locale: string
  user_agent: any
  account_id?: string
  roles: any
}

export interface Organization {
  id: string
  name: string
  slug: string
  status: boolean
  type: string
  pull_start_date: string
  access_token: string
  refresh_token: string
  created_at: string
  updated_at: string
  email?: string
  phone?: string
  website?: string
  address?: string
  country: string
  logo_url?: string | null
  brand_color?: string
  settings?: string | null
  timezone?: string
  currency?: string
  locale?: string
  industry?: string
  tax_id?: number
  is_active: boolean
  description?: string
  notes?: string
  facebook_url?: string
  twitter_url?: string
  instagram_url?: string
  onboarding_status?: string
}

export interface Branch {
  id: string
  branch_id: string
  org_id: string | null
  name: string
  name_localized: string
  reference: string
  type: string
  latitude: number | null
  longitude: number | null
  phone: string
  opening_from: string
  opening_to: string
  inventory_end_of_day_time: string
  receipt_header: string | null
  receipt_footer: string | null
  settings: {
    sa_zatca_branch_address: {
      city: string
      district: string
      street_name: string
    }
    display_background_image: string | null
  }
  created_at: string
  updated_at: string
  deleted_at: string | null
  receives_online_orders: boolean
  accepts_reservations: boolean
  reservation_duration: number
  reservation_times: string | null
  address: string
  address_line_1: string | null
  address_line_2: string | null
  city: string | null
  zip_code: string | null
  state: string | null
  country: string
  email: string | null
  website: string | null
  fax: string | null
  opening_days: string | null
  logo_url: string | null
  banner_image_url: string | null
  timezone: string
  currency: string
  locale: string
  tax_id: string | null
  is_active: boolean
  facebook_url: string | null
  instagram_url: string | null
  twitter_url: string | null
  delivery_notes: string | null
  order_instructions: string | null
  min_order_amount: string | null
  delivery_radius: string | null
  estimated_delivery_time: string | null
  manager_name: string | null
  manager_email: string | null
  manager_phone: string | null
  notes: string | null
  max_capacity: string | null
  square_footage: string | null
  parking_available: boolean
  has_wifi: boolean
  has_outdoor_seating: boolean
}

export interface Order {
  id: string
  order_id: string
  type: string | number
  count?: number
  weekNumber?: number
  branchId: number | null
  typeName?: string
  total?: number
  org_id: string
  branch_id: string
  creator_id: string
  closer_id: string
  voider_id: string | null
  customer_id: string | null
  device_id: string
  table_id: string | null
  section_id: string | null
  app_id: string
  is_kiosk: boolean
  promotion_id: string | null
  discount_type: string | null
  reference_x: string | null
  number: number
  source: number
  status: number
  integer: number | null
  guests: number
  kitchen_notes: string | null
  customer_notes: string | null
  business_date: string
  subtotal_price: string
  discount_amount: string
  rounding_amount: string
  total_price: string
  tax_exclusive_discount_amount: string
  delay_in_seconds: number | null
  opened_at: string
  accepted_at: string | null
  due_at: string | null
  driver_assigned_at: string | null
  dispatched_at: string | null
  driver_collected_at: string | null
  delivered_at: string | null
  closed_at: string
  created_at: string
  updated_at: string
  reference: number
  check_number: number
  kitchen_received_at: string
  kitchen_done_at: string
  kitchen_prep_time?: string | null
  payment_method: string
  payment_method_id?: string
  payment_status: string | null
  payment_tendered_value?: string
  transaction_id: string | null
  delivery_address_line_1: string | null
  delivery_address_line_2: string | null
  delivery_city: string | null
  delivery_zip_code: string | null
  delivery_state: string | null
  delivery_country: string | null
  delivery_latitude: number | null
  delivery_longitude: number | null
  billing_address_line_1: string | null
  billing_address_line_2: string | null
  billing_city: string | null
  billing_zip_code: string | null
  billing_state: string | null
  billing_country: string | null
  customer_name: string
  customer_phone: string | null
  customer_email: string | null
  cancellation_reason: string | null
  cancelled_at: string | null
  cancellation_reason_id: string | null
  adjustment_notes: string | null
  branch?: {
    id: string
    branch_id: string
    [key: string]: any
  }
  closer?: {
    id: string
    org_id: string
    [key: string]: any
  }
  creator?: {
    id: string
    org_id: string
    [key: string]: any
  }
  customer?: any
  device?: {
    id: string
    org_id: string
    [key: string]: any
  }
  section?: any
  table?: any
  organization?: {
    id: string
    name: string
    slug: string
    type: string | null
    status: string
    [key: string]: any
  }
  
  payment_data?: any[]
  meta?: {
    foodics?: {
      ready_at: string
      device_id: string
      [key: string]: any
    }
    [key: string]: any
  }
  tags?: {
    gateway_id: string
    gateway_name: string
  }
  voider?: {
    name: string
    id: string
    org_id: string
    [key: string]: any
  }
  orderElements : {
    id: string
    org_id: string
    [key: string]: any
    name : string
    customizations ?: string[] | null 
    discount_type : string | null
    discount_amount : number | null 
    quantity : number
    unit_price : number
    total_price: number
  }[]
}

export interface orderElements {
     id: string
    org_id: string
    [key: string]: any
    name : string
    customizations ?: string[] | null 
    discount_type : string | null
    discount_amount : number | null 
    quantity : number
    unit_price : number
    total_price: number
  }

export interface Customer {
  id: string
  customer_id: string
  org_id: string
  name: string
  house_account_balance: string
  loyalty_balance: string
  dial_code: string
  phone: string
  formatted_phone_number: string
  email: string
  gender: 'male' | 'female' | 'unspecified' | null
  birth_date: string | null
  is_blacklisted: 'blacklisted' | 'not_blacklisted' | 'pending'
  is_house_account_enabled: 'enabled' | 'disabled' | 'pending'
  house_account_limit: number | null
  is_loyalty_enabled: boolean
  order_count: number
  last_order_at: string
  notes: string | null
  created_at: string
  updated_at: string
  deleted_at: string | null
  address_line_1: string | null
  address_line_2: string | null
  city: string | null
  zip_code: string | null
  state: string | null
  country: string | null
  marketing_opt_in: boolean
  marketing_channels: string | null
  tags: string | null
  source: string | null
  locale: string
  privacy_policy_accepted_at: string | null
  terms_of_service_accepted_at: string | null
  external_id: string | null
}

export interface Creator {
  associate_to_all_branches: boolean
  created_at: string
  creator_id: string
  deleted_at: string | null
  display_localized_names: true
  email: string | null
  email_verified: boolean
  id: string
  is_owner: boolean
  lang: string
  last_cashier_login_at: string | null
  last_console_login_at: string | null
  must_use_fingerprint: boolean
  name: string
  number: string | null
  org_id: string
  phone: string | null
  pin: string
  two_factor_auth_enabled: boolean
  updated_at: string
}

export interface Sale {
  type: string
  total: string
  weekNumber: number
  branchId: number
  typeName: string
  count: number
}

export interface SaleByOrder {
  type: string
  total: string
  percentage: string
  branchId: number
  count: number
}

export interface OrderPercentage {
  type: string
  count: number
  percentage: string
  branchId: number
  typeName: string
  total: number
}

export interface Report {
  isNotFetched?: boolean
  branches: Branch[]
  selectedBranchId: null | number
  thisWeek: {
    orderCounts: Order[]
    sales: Sale[]
  }
  previousWeeks: {
    orderCounts: Order[]
    sales: Sale[]
    weekOffset: number
  }[]
  yearToDate: {
    orderTypePercentage: OrderPercentage[]
    salesByOrderType: SaleByOrder[]
  }
  monthToDate: {
    orderTypePercentage: OrderPercentage[]
    salesByOrderType: SaleByOrder[]
  }
}

export interface ComplaintResponsibility {
  id: string
  name_en: string
  name_ar: string
  color: string
  active: boolean
}

export interface ComplaintResolution {
  id: string
  name_en: string
  name_ar: string
  color: string
  active: boolean
}

export interface ComplaintSource {
  id: string
  name_en: string
  name_ar: string
  color: string
  active: boolean
}

export interface ComplaintStatus {
  id: string
  name_en: string
  name_ar: string
  color: string
  active: boolean
}

export interface ActionCategory {
  id: string
  name_en: string
  name_ar: string
  color: string
  active: boolean
}

export interface ComplaintCategory {
  id: string
  name_en: string
  name_ar: string
  color: string
  active: boolean
  parent_id?: string
  children?: ComplaintCategory[]
}

export interface Table {
  id: string | null
  org_id: string | null
  table_id: string
  name: string
  status: number
  seats: number
  section_id: number | null
  created_at: string
  updated_at: string
  deleted_at: string | null
}

export interface Section {
  id: string | null
  section_id: string
  org_id: number | null
  name: string
  name_localized: string | null
  branch_id: number | null
  created_at: string
  updated_at: string
  deleted_at: string | null
}

export interface Closer {
  id: string | null
  org_id: number | null
  name: string
  closer_id: string
  pin: string
  is_owner: boolean
  number: string | null
  email: string
  phone: string | null
  lang: string
  display_localized_names: boolean
  email_verified: boolean
  must_use_fingerprint: boolean
  last_console_login_at: string | null
  last_cashier_login_at: string | null
  associate_to_all_branches: boolean
  created_at: string
  updated_at: string
  deleted_at: string | null
  two_factor_auth_enabled: boolean
}

export interface Complaint {
  id: string | null
  date: string
  source_id: string
  responsibility_id: string
  resolution_id: string
  status_id: string
  action_category_id: string
  category1_id: string
  category2_id: string
  order_date: string
  order_time: string
  order_value: number
  order_type: string
  order_number: string
  order_check_number: number
  order_id?: string
  brand: string
  customer_id?: string
  branch_id: string
  customer_name?: string
  customer_phone?: string
  customer_email?: string
  status?: ComplaintEntity
  category1?: ComplaintCategory
  category2?: ComplaintCategory
  branch?: Branch
  responsibility?: ComplaintEntity
  source?: ComplaintEntity
  action_category?: ComplaintEntity
  entered_by?: User
  created_at?: string
  org_id?: string
}

export interface ComplaintEntity {
  name_en: string
  name_ar: string
  color: string
  active: boolean
}

export interface WasteItem {
  date: string
  time?: string
  brand: string
  branch_id: string
  category1_id: string
  category2_id: string
  branch: Branch
  category1: string
  category2: string
  quantity: number
  unit: string
  total_cost: number
  reason: string
}

export interface Category {
  id: string
  org_id: string
  category_id: string
  name: string
  name_localized: string
  reference: string
  image: string
  created_at: string
  updated_at: string
  deleted_at: string | null
}

export interface Product {
  id: string
  org_id: string
  product_id: string
  sku: string
  barcode: string | null
  name: string
  name_localized: string
  description: string
  description_localized: string
  image: string | null
  is_active: boolean
  is_stock_product: boolean
  is_non_revenue: boolean
  is_ready: boolean
  pricing_method: string
  selling_method: string
  costing_method: string
  preparation_time: string | null
  price: string
  cost: string
  calories: number
  walking_minutes_to_burn_calories: string | null
  is_high_salt: boolean
  meta: any | null
  created_at: string
  updated_at: string
  deleted_at: string | null
  category?: Category | null
  subcategory?: Category | null
  brand: string | null
  tags: any[] | null
  regular_price: string | null
  sale_price: string | null
  sale_start_date: string | null
  sale_end_date: string | null
  tax_category: string | null
  tax_rate: string | null
  stock_quantity: string | null
  reorder_level: string | null
  supplier_id: string | null
  supplier_reference: string | null
  lead_time: string | null
  min_order_quantity: string | null
  weight: string | null
  weight_unit: string | null
  dimensions: string | null
  color: string | null
  size: string | null
  is_digital: boolean
  download_url: string | null
  download_expiry_days: string | null
  seo_title: string | null
  seo_description: string | null
  slug: string | null
  visibility: string | null
  parent_id: string | null
  is_variant: boolean
  variant_attributes: string | null
  related_products: string | null
  country_of_origin: string | null
  warranty_info: string | null
  certifications: string | null
  age_restriction: string | null
  allergens: string | null
  dietary_flags: string | null
  ingredients: string | null
}

export interface ProductFilter {
  is_active?: boolean
  category_id?: string
  brand?: string
  min_price?: number | string
  max_price?: number | string
  search?: string
  is_stock_product?: boolean
  is_digital?: boolean
}

export interface OrderFilter {
  branch_id?: string
  customer_id?: string
  status?: string
  date_range?: {
    from: Date
    to: Date
  }
  is_kiosk?: boolean
  search?: string
}

export interface UserFilter {
  //
}

export interface CustomerFilter {
  is_blacklisted?: 'blacklisted' | 'not_blacklisted' | 'pending' | string
  is_house_account_enabled?: 'enabled' | 'disabled' | 'pending' | string
  is_loyalty_enabled?: boolean
  gender?: 'male' | 'female' | 'unspecified' | string
  search?: string
  marketing_opt_in?: boolean
  source?: string
  locale?: string
}

export interface ComplaintFilter {
  branch_id?: string
  customer_id?: string
  status_id?: string
  source_id?: string
  responsibility_id?: string
  resolution_id?: string
  action_category_id?: string
  date_range?: {
    from: Date
    to: Date
  }
  keyword?: string
}

export interface ComplaintStatusFilter {
  active?: boolean
}

export interface ComplaintSourceFilter {
  active?: boolean
}

export interface ComplaintResolutionFilter {
  active?: boolean
}

export interface ComplaintCategoryFilter {
  active?: boolean
}

export interface ActionCategoryFilter {
  active?: boolean
}

export interface CategoryFilter {
  reference?: string
}

export interface ComplaintResponsibilityFilter {
  active?: boolean
}

// Todo: move this type
export interface SelectProps {
  className?: string
  fullWidth?: boolean
  size?: 'sm' | 'default'
  error?: any
  value?: string
  placeholder?: string
  mandatory?: boolean
  clearable?: boolean
  parentId?: string
  disabled?: boolean
  onChange: (e: any) => any
}
export interface Account {
  id?: string
  account_id?: string
  slug: string
  name: string
  name_localized: string
  description?: string
  description_localized?: string
  logo_url?: string
  banner_image_url?: string
  is_active: boolean
  is_deleted: boolean
}

export interface Business {
  id?: string
  business_id?: string
  name: string
  slug: string
  status: boolean
  pull_start_date: string
  brand?: Brand[]
}

export type CustomerCaseTableMode = 'table' | 'big-grid' | 'small-grid'

export interface Brand {
  id: string
  account_id: string
  organization_id: string
  business_id: string
  code: string
  name: string
  name_localized: string
  description: string
  description_localized: string
  logo_url: string
  banner_image_url: string
  order_tag_id: string
  is_active: boolean
  is_deleted: boolean
  created_at: string
  updated_at: string
  deleted_at: string | null
  branches: string[]
}

export interface Tag {
  id: string
  name: string
  name_localized: string
  type: number
}

export interface Role {
  id?: string
  name: string
  description?: string
}

export interface Resource {
  id?: string
  name: string
  type: string
  entityName: string
  apiPath: string
  description?: string
  is_system: boolean
  is_active: boolean
  account_id?: string
  is_deleted: boolean
  metadata: string
  actions?: Action[]
}

export interface Action {
  id?: string
  name: string
  description?: string
  resourceId?: string
  metadata: string
}

export interface Permission {
  id?: string
  name: string
  description?: string
  resourceId?: string
  metadata: string
}
