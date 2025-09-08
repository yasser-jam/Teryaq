import z from "zod";



const requiredString = () => {
    return z.string().trim().min(1, 'This field is required')
}

const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters long")
  .refine(
    (password) => {
      const hasNumber = /[0-9]/.test(password);
      const hasUppercase = /[A-Z]/.test(password);
      const hasSpecialChar = /[^a-zA-Z0-9]/.test(password);
      
      return hasNumber && hasUppercase && hasSpecialChar;
    },
    {
      message: "Password must contain at least one number, one uppercase letter, and one special character",
    }
  );

export const PHARMACY_SCHEMEA = z.object({
    pharmacyName: requiredString(),
    licenseNumber: requiredString(),
    phoneNumber: requiredString(),
    // email: requiredString().email(),
    managerPassword: passwordSchema,
})

export const MASTER_PRODUCT_SCHEMA = z.object({
  tradeName: requiredString(),
  tradeNameAr: requiredString(),
  scientificName: requiredString(),
  scientificNameAr: requiredString(),
  concentration: requiredString(),
  size: requiredString(),
  refPurchasePrice: z.number(),
  refSellingPrice: z.number(),
  notes: z.string().optional(),
  tax: z.number().optional(),
  barcode: requiredString(),
  requiresPrescription: z.boolean(),
  typeId: z.string(),
  formId: z.string(),
  manufacturerId: z.string(),
  // categories: z.array(z.number()).min(1, 'At least one category is required'),
  categories: z.any(),
});

export const CATEGORY_SCHEMA = z.object({
  name: requiredString(),
  name_ar: requiredString(),
});

export const TYPE_SCHEMA = z.object({
  name: requiredString(),
  name_ar: requiredString(),
});

export const FORM_SCHEMA = z.object({
  name: requiredString(),
  name_ar: requiredString(),
});

export const MANUFACTURER_SCHEMA = z.object({
  name: requiredString(),
  name_ar: requiredString(),
});