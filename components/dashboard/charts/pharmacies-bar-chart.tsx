"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { Building2 } from "lucide-react"

const chartData = [
  { month: "January", pharmacies: 18, branches: 12 },
  { month: "February", pharmacies: 22, branches: 15 },
  { month: "March", pharmacies: 28, branches: 18 },
  { month: "April", pharmacies: 32, branches: 22 },
  { month: "May", pharmacies: 38, branches: 25 },
  { month: "June", pharmacies: 42, branches: 28 },
  { month: "July", pharmacies: 45, branches: 32 },
  { month: "August", pharmacies: 48, branches: 35 },
  { month: "September", pharmacies: 52, branches: 38 },
  { month: "October", pharmacies: 55, branches: 42 },
  { month: "November", pharmacies: 58, branches: 45 },
  { month: "December", pharmacies: 62, branches: 48 }
]

const chartConfig = {
  pharmacies: {
    label: "Main Pharmacies",
    color: "hsl(var(--chart-1))",
  },
  branches: {
    label: "Branches",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export function PharmaciesBarChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Building2 className="h-5 w-5" />
          Pharmacies Growth
        </CardTitle>
        <CardDescription>Monthly registration of pharmacies and branches</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="pharmacies" fill="var(--color-pharmacies)" radius={4} />
            <Bar dataKey="branches" fill="var(--color-branches)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
} 