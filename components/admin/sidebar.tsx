"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard,
  Inbox,
  MapPin,
  Truck,
  Image as ImageIcon,
  Star,
  HelpCircle,
  Settings,
  LogOut,
  Menu,
  X,
  PackageOpen,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/inquiries", label: "Inquiries", icon: Inbox },
  { href: "/admin/cities", label: "Cities", icon: MapPin },
  { href: "/admin/services", label: "Services", icon: Truck },
  { href: "/admin/portfolio", label: "Portfolio", icon: ImageIcon },
  { href: "/admin/testimonials", label: "Testimonials", icon: Star },
  { href: "/admin/faqs", label: "FAQs", icon: HelpCircle },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export function AdminSidebar({ user }: { user: { name: string; email: string } }) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/admin/login");
    router.refresh();
  }

  const isActive = (href: string) =>
    href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);

  return (
    <>
      {/* Mobile top bar */}
      <header className="fixed inset-x-0 top-0 z-40 flex h-14 items-center justify-between border-b border-black/10 bg-white px-4 sm:hidden">
        <div className="flex items-center gap-2">
          <PackageOpen className="text-accent-600 h-5 w-5" />
          <span className="font-display text-brand-950 text-sm font-bold">Admin Panel</span>
        </div>
        <button
          onClick={() => setOpen(!open)}
          className="text-muted rounded-md p-2 hover:bg-black/[0.04]"
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </header>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-black/10 bg-white transition-transform sm:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-14 items-center gap-2 border-b border-black/10 px-4">
          <PackageOpen className="text-accent-600 h-6 w-6" />
          <div>
            <p className="font-display text-brand-950 text-sm leading-tight font-bold">
              Packers & Movers
            </p>
            <p className="text-muted text-xs">Admin Panel</p>
          </div>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto p-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  isActive(item.href)
                    ? "bg-brand-950 text-white"
                    : "text-muted hover:text-foreground hover:bg-black/[0.04]"
                )}
              >
                <Icon className="h-4 w-4 shrink-0" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-black/10 p-3">
          <div className="bg-surface mb-2 rounded-lg px-3 py-2">
            <p className="text-foreground truncate text-sm font-semibold">{user.name}</p>
            <p className="text-muted truncate text-xs">{user.email}</p>
          </div>
          <Button variant="ghost" className="w-full justify-start text-muted" onClick={handleLogout}>
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </aside>
    </>
  );
}