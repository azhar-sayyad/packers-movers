import { z } from "zod";
import { INQUIRY_STATUSES } from "@/lib/constants";

const requiredString = (min: number, message: string) => z.string().min(min, message);
const optionalSlug = () => z.string().optional().or(z.literal(""));
const seoFields = {
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
};
const activeFlag = z.boolean().default(true);

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const inquirySchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").optional().or(z.literal("")),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Invalid phone number"),
  email: z.string().email("Invalid email address").optional().or(z.literal("")),
  moveFrom: z.string().min(2, "Origin city is required"),
  moveTo: z.string().min(2, "Destination city is required"),
  serviceType: z.string().min(2, "Service type is required").optional().or(z.literal("")),
  moveDate: z.string().optional(),
  propertyType: z.string().optional(),
  message: z.string().optional(),
  honeypot: z.string().max(0, "Spam detected").optional(), // Anti-spam field, must be empty
  landingPage: z.string().optional(),
  referrer: z.string().optional(),
  utmSource: z.string().optional(),
  utmMedium: z.string().optional(),
  utmCampaign: z.string().optional(),
});

export const citySchema = z.object({
  name: requiredString(2, "City name required"),
  slug: requiredString(2, "Slug required"),
  state: requiredString(2, "State required"),
  district: requiredString(2, "District required"),
  description: requiredString(10, "Description required"),
  contentText: requiredString(20, "Localized text content required"),
  localAreas: requiredString(3, "Local areas list required"),
  phoneOverride: z.string().optional(),
  whatsappOverride: z.string().optional(),
  isActive: activeFlag,
  ...seoFields,
});

export const serviceSchema = z.object({
  name: requiredString(2, "Service name required"),
  slug: requiredString(2, "Slug required"),
  icon: requiredString(2, "Icon name required"),
  shortDesc: requiredString(10, "Short description required"),
  fullDesc: requiredString(20, "Full description required"),
  features: requiredString(5, "Features list required"),
  isActive: activeFlag,
  ...seoFields,
});

export const inquiryStatusSchema = z.object({
  status: z.enum(INQUIRY_STATUSES),
  internalNotes: z.string().optional(),
});

export const portfolioSchema = z.object({
  title: requiredString(2, "Title required"),
  citySlug: optionalSlug(),
  serviceSlug: optionalSlug(),
  imageUrl: requiredString(5, "Image URL required"),
  tag: z.string().default("Completed Project"),
});

export const testimonialSchema = z.object({
  customerName: requiredString(2, "Customer name required"),
  citySlug: optionalSlug(),
  rating: z.number().int().min(1).max(5).default(5),
  reviewText: z.string().min(10, 'Review text required'),
  isPublished: z.boolean().default(true),
});

export const faqSchema = z.object({
  question: z.string().min(5, 'Question required'),
  answer: z.string().min(5, 'Answer required'),
  category: z.string().default('General'),
  citySlug: z.string().optional().or(z.literal('')),
  order: z.number().int().default(0),
  isPublished: z.boolean().default(true),
});

export const siteSettingSchema = z.object({
  key: z.string().min(2, 'Key required'),
  value: z.string().min(1, 'Value required'),
  description: z.string().optional(),
});
