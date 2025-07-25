import z from "zod";

const requiredString = () => {
    return z.string().trim().nonempty()
}

export const PHARMACY_SCHEMEA = z.object({
    pharmacyName: requiredString(),
    licenseNumber: requiredString(),
    phoneNumber: requiredString(),
    managerPassword: requiredString(),
})

export const MASTER_PRODUCT_SCHEMA = z.object({
  tradeName: z.string().min(1, 'Trade name is required'),
  scientificName: z.string().min(1, 'Scientific name is required'),
  concentration: z.string().optional(),
  size: z.string().optional(),
  refPurchasePrice: z.number().optional(),
  refSellingPrice: z.number().min(0, 'Price must be positive'),
  notes: z.string().optional(),
  tax: z.number().optional(),
  barcode: z.string().optional(),
  productType: z.enum(['MASTER', 'PHARMACY']),
  requiresPrescription: z.boolean(),
  type: z.string().optional(),
  form: z.string().optional(),
  manufacturer: z.string().min(1, 'Manufacturer is required'),
  categories: z.array(z.string()),
});

export const CATEGORY_SCHEMA = z.object({
  name: requiredString(),
});

export const TYPE_SCHEMA = z.object({
  name: requiredString(),
});

export const MANUFACTURER_SCHEMA = z.object({
  name: requiredString(),
});