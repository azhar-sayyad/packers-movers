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
  name: z.string().min(2, 'Name must be at least 2 characters').optional().or(z.literal('')),
  phone: z.string().min(10, 'Phone number must be at least 10 digits').max(15, 'Invalid phone number'),
  email: z.string().email('Invalid email address').optional().or(z.literal('')),
  moveFrom: z.string().min(2, 'Origin city is required'),
  moveTo: z.string().min(2, 'Destination city is required'),
  serviceType: z.string().min(2, 'Service type is required').optional().or(z.literal('')),
  moveDate: z.string().optional(),
  propertyType: z.string().optional(),
  message: z.string().optional(),
  honeypot: z.string().max(0, 'Spam detected').optional(), // Anti-spam field, must be empty
  landingPage: z.string().optional(),
  referrer: z.string().optional(),
  utmSource: z.string().optional(),
  utmMedium: z.string().optional(),
  utmCampaign: z.string().optional(),
});

export const citySchema = z.object({
  name: z.string().min(2, 'City name required'),
  slug: z.string().min(2, 'Slug required'),
  state: z.string().min(2, 'State required'),
  district: z.string().min(2, 'District required'),
  description: z.string().min(10, 'Description required'),
  contentText: z.string().min(20, 'Localized text content required'),
  localAreas: z.string().min(3, 'Local areas list required'),
  phoneOverride: z.string().optional(),
  whatsappOverride: z.string().optional(),
  isActive: z.boolean().default(true),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
});

export const serviceSchema = z.object({
  name: z.string().min(2, 'Service name required'),
  slug: z.string().min(2, 'Slug required'),
  icon: z.string().min(2, 'Icon name required'),
  shortDesc: z.string().min(10, 'Short description required'),
  fullDesc: z.string().min(20, 'Full description required'),
  features: z.string().min(5, 'Features list required'),
  isActive: z.boolean().default(true),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
});

export const inquiryStatusSchema = z.object({
  status: z.enum(['NEW', 'CONTACTED', 'QUOTATION_SENT', 'CONVERTED', 'CLOSED']),
  internalNotes: z.string().optional(),
});

export const portfolioSchema = z.object({
  title: z.string().min(2, 'Title required'),
  citySlug: z.string().optional().or(z.literal('')),
  serviceSlug: z.string().optional().or(z.literal('')),
  imageUrl: z.string().min(5, 'Image URL required'),
  tag: z.string().default('Completed Project'),
});

export const testimonialSchema = z.object({
  customerName: z.string().min(2, 'Customer name required'),
  citySlug: z.string().optional().or(z.literal('')),
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
