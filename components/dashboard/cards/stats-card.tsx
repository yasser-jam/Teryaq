"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LucideIcon } from "lucide-react"

interface StatsCardProps {
  title: string
  value: string | number
  icon: LucideIcon
  description?: string
  trend?: {
    value: number
    label: string
    isPositive: boolean
  }
  colorClass: string
}

export function StatsCard({ 
  title, 
  value, 
  icon: Icon, 
  description, 
  trend, 
  colorClass 
}: StatsCardProps) {
  return (
    <Card className={`${colorClass} text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium opacity-90">{title}</CardTitle>
        <Icon className="h-4 w-4 opacity-90" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && (
          <p className="text-xs opacity-80 mt-1">{description}</p>
        )}
        {trend && (
          <div className="flex items-center pt-1">
            <span className={`text-xs ${trend.isPositive ? 'text-green-200' : 'text-red-200'}`}>
              {trend.isPositive ? '+' : ''}{trend.value}% {trend.label}
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  )
} 