import { redirect } from "next/navigation";
import { getCurrentAdminUser } from "@/lib/session";
import { AdminSidebar } from "@/components/admin/sidebar";

export default async function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  const admin = await getCurrentAdminUser();
  if (!admin) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-surface">
      <AdminSidebar
        user={{ name: admin.name, email: admin.email }}
      />
      <main className="p-4 sm:ml-64 sm:p-8">{children}</main>
    </div>
  );
}