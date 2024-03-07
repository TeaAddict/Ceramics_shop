import { z } from "zod";

export const contactsSchema = z.object({
  phone: z.string().min(9, "Requires atleast 9 digits"),
  email: z.string().email("Email is required"),
  physicalLocation: z.string().min(3, "Physical location is required"),
});

export type ContactsSchema = z.infer<typeof contactsSchema>;
