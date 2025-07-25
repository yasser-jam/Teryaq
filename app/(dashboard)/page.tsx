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

      {/* Charts and Activity Log */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Pharmacies Bar Chart */}
        <div className="col-span-1 md:col-span-2">
          <PharmaciesBarChart />
        </div>
        
        {/* Activity Log */}
        <ActivityLog />
      </div>

      {/* Income Chart */}
      <div className="grid gap-6">
        <IncomeLineChart />
      </div>
    </div>
  )
}
