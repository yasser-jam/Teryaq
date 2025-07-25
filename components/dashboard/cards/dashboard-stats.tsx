"use client"

import { StatsCard } from "./stats-card"
import { Building2, Package, Users, TrendingUp } from "lucide-react"

export function DashboardStats() {
  const stats = [
    {
      title: "Total Pharmacies",
      value: "142",
      icon: Building2,
      description: "Active pharmacies registered",
      trend: {
        value: 12,
        label: "from last month",
        isPositive: true
      },
      colorClass: "bg-gradient-to-br from-blue-500 to-blue-600"
    },
    {
      title: "Master Products",
      value: "2,847",
      icon: Package,
      description: "Products in catalog",
      trend: {
        value: 8,
        label: "from last week",
        isPositive: true
      },
      colorClass: "bg-gradient-to-br from-emerald-500 to-emerald-600"
    },
    {
      title: "Active Users",
      value: "1,234",
      icon: Users,
      description: "Registered pharmacy staff",
      trend: {
        value: -2,
        label: "from last month",
        isPositive: false
      },
      colorClass: "bg-gradient-to-br from-purple-500 to-purple-600"
    },
    {
      title: "Monthly Income",
      value: "$48,290",
      icon: TrendingUp,
      description: "Revenue this month",
      trend: {
        value: 23,
        label: "from last month",
        isPositive: true
      },
      colorClass: "bg-gradient-to-br from-orange-500 to-orange-600"
    }
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <StatsCard key={index} {...stat} />
      ))}
    </div>
  )
} 