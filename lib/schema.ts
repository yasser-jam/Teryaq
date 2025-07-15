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