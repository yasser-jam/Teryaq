"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { TrendingUp } from "lucide-react"

const chartData = [
  { month: "January", revenue: 28500, expenses: 18200 },
  { month: "February", revenue: 32100, expenses: 19800 },
  { month: "March", revenue: 29800, expenses: 17900 },
  { month: "April", revenue: 35200, expenses: 21300 },
  { month: "May", revenue: 41500, expenses: 24800 },
  { month: "June", revenue: 38900, expenses: 23100 },
  { month: "July", revenue: 44200, expenses: 26500 },
  { month: "August", revenue: 48700, expenses: 28900 },
  { month: "September", revenue: 52300, expenses: 31200 },
  { month: "October", revenue: 49800, expenses: 29600 },
  { month: "November", revenue: 55600, expenses: 33400 },
  { month: "December", revenue: 61200, expenses: 36800 }
]

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "hsl(var(--chart-1))",
  },
  expenses: {
    label: "Expenses",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export function IncomeLineChart() {
  const totalRevenue = chartData.reduce((acc, curr) => acc + curr.revenue, 0)
  const totalExpenses = chartData.reduce((acc, curr) => acc + curr.expenses, 0)
  const netIncome = totalRevenue - totalExpenses

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          Financial Overview
        </CardTitle>
        <CardDescription>
          Monthly revenue and expenses with net income of ${netIncome.toLocaleString()}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => `$${value / 1000}k`}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Area
              dataKey="expenses"
              type="natural"
              fill="var(--color-expenses)"
              fillOpacity={0.4}
              stroke="var(--color-expenses)"
              stackId="a"
            />
            <Area
              dataKey="revenue"
              type="natural"
              fill="var(--color-revenue)"
              fillOpacity={0.4}
              stroke="var(--color-revenue)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
} 