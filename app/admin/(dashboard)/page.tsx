import prisma from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Inbox, MapPin, TrendingUp, Calendar } from "lucide-react";
import { formatDistanceToNow } from "@/lib/format";

export default async function AdminDashboardPage() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [totalInquiries, todayInquiries, activeCities, convertedInquiries, recentInquiries] =
    await Promise.all([
      prisma.inquiry.count(),
      prisma.inquiry.count({ where: { createdAt: { gte: today } } }),
      prisma.city.count({ where: { isActive: true } }),
      prisma.inquiry.count({ where: { status: "CONVERTED" } }),
      prisma.inquiry.findMany({
        orderBy: { createdAt: "desc" },
        take: 8,
        select: {
          id: true,
          name: true,
          phone: true,
          moveFrom: true,
          moveTo: true,
          status: true,
          createdAt: true,
        },
      }),
    ]);

  const conversionRate = totalInquiries > 0 ? Math.round((convertedInquiries / totalInquiries) * 100) : 0;

  const stats = [
    { label: "Total Inquiries", value: totalInquiries, icon: Inbox, color: "text-sky-600" },
    { label: "Today's Inquiries", value: todayInquiries, icon: Calendar, color: "text-accent-600" },
    { label: "Active Cities", value: activeCities, icon: MapPin, color: "text-emerald-600" },
    { label: "Conversion Rate", value: `${conversionRate}%`, icon: TrendingUp, color: "text-violet-600" },
  ];

  const statusStyles: Record<string, string> = {
    NEW: "bg-sky-100 text-sky-800",
    CONTACTED: "bg-blue-100 text-blue-800",
    QUOTATION_SENT: "bg-amber-100 text-amber-800",
    CONVERTED: "bg-emerald-100 text-emerald-800",
    CLOSED: "bg-surface-secondary text-muted",
  };

  return (
    <div>
      <h1 className="mb-2 font-display text-2xl font-bold text-brand-950">Dashboard</h1>
      <p className="mb-8 text-sm text-muted">Overview of your lead pipeline and active coverage.</p>

      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted">{stat.label}</CardTitle>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <p className="font-display text-3xl font-bold text-brand-950">{stat.value}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Inquiries</CardTitle>
        </CardHeader>
        <CardContent>
          {recentInquiries.length === 0 ? (
            <p className="text-sm text-muted">No inquiries yet.</p>
          ) : (
            <div className="space-y-3">
              {recentInquiries.map((inquiry) => (
                <div
                  key={inquiry.id}
                  className="flex flex-col gap-2 rounded-lg border border-black/[0.06] p-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-foreground">{inquiry.name}</p>
                    <p className="text-xs text-muted">
                      {inquiry.moveFrom} → {inquiry.moveTo} · {inquiry.phone}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge
                      variant="outline"
                      className={statusStyles[inquiry.status] ?? "border-black/15 text-muted"}
                    >
                      {inquiry.status.replace("_", " ")}
                    </Badge>
                    <span className="whitespace-nowrap text-xs text-faint">
                      {formatDistanceToNow(inquiry.createdAt)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}