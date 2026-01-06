import {
  Home,
  Building2,
  Truck,
  Warehouse,
  MapPin,
  Package,
  Boxes,
  Car,
  Store,
  type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Home,
  Building2,
  Truck,
  Warehouse,
  MapPin,
  Package,
  Boxes,
  Car,
  Store,
};

export function ServiceIcon({ name, className }: { name: string; className?: string }) {
  const Icon = iconMap[name] ?? Boxes;
  return <Icon className={className} />;
}