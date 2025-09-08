import { DashboardStats, ActivityLog, PharmaciesBarChart, IncomeLineChart } from '@/components/dashboard'

export default function Dashboard() {
  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's what's happening with your pharmacy network.
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <DashboardStats />
    </div>
  )
}
