"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { 
  Building2, 
  Package, 
  UserPlus, 
  FileCheck, 
  AlertCircle,
  CheckCircle2
} from "lucide-react"

interface LogEntry {
  id: string
  type: 'pharmacy' | 'product' | 'user' | 'request' | 'approval' | 'system'
  title: string
  description: string
  timestamp: string
  status: 'success' | 'pending' | 'warning' | 'error'
  initiator?: string
}

const mockLogs: LogEntry[] = [
  {
    id: '1',
    type: 'pharmacy',
    title: 'New Pharmacy Registered',
    description: 'Al-Shifa Pharmacy has been successfully registered',
    timestamp: '2 minutes ago',
    status: 'success',
    initiator: 'Ahmad Hassan'
  },
  {
    id: '2',
    type: 'request',
    title: 'Product Request Received',
    description: 'Request for 50 units of Paracetamol 500mg',
    timestamp: '15 minutes ago',
    status: 'pending',
    initiator: 'Nour Pharmacy'
  },
  {
    id: '3',
    type: 'product',
    title: 'Master Product Added',
    description: 'Amoxicillin 250mg capsules added to catalog',
    timestamp: '1 hour ago',
    status: 'success',
    initiator: 'System Admin'
  },
  {
    id: '4',
    type: 'user',
    title: 'New Staff Member',
    description: 'Pharmacist Sarah Mohamed joined Green Valley Pharmacy',
    timestamp: '2 hours ago',
    status: 'success',
    initiator: 'Green Valley Pharmacy'
  },
  {
    id: '5',
    type: 'approval',
    title: 'License Renewal Approved',
    description: 'City Center Pharmacy license renewed for 2024',
    timestamp: '3 hours ago',
    status: 'success',
    initiator: 'Regulatory Team'
  },
  {
    id: '6',
    type: 'system',
    title: 'System Maintenance',
    description: 'Scheduled backup completed successfully',
    timestamp: '4 hours ago',
    status: 'success',
    initiator: 'System'
  }
]

const getIcon = (type: LogEntry['type']) => {
  switch (type) {
    case 'pharmacy': return Building2
    case 'product': return Package
    case 'user': return UserPlus
    case 'request': return FileCheck
    case 'approval': return CheckCircle2
    case 'system': return AlertCircle
    default: return AlertCircle
  }
}

const getStatusColor = (status: LogEntry['status']) => {
  switch (status) {
    case 'success': return 'bg-green-500'
    case 'pending': return 'bg-yellow-500'
    case 'warning': return 'bg-orange-500'
    case 'error': return 'bg-red-500'
    default: return 'bg-gray-500'
  }
}

const getBadgeVariant = (status: LogEntry['status']) => {
  switch (status) {
    case 'success': return 'default'
    case 'pending': return 'secondary'
    case 'warning': return 'destructive'
    case 'error': return 'destructive'
    default: return 'secondary'
  }
}

export function ActivityLog() {
  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertCircle className="h-5 w-5" />
          Recent Activity
        </CardTitle>
        <CardDescription>
          Latest system activities and updates
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {mockLogs.map((log) => {
            const Icon = getIcon(log.type)
            return (
              <div key={log.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className={`${getStatusColor(log.status)} text-white`}>
                    <Icon className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium leading-none">{log.title}</p>
                    <Badge variant={getBadgeVariant(log.status)} className="text-xs">
                      {log.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{log.description}</p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{log.initiator}</span>
                    <span>{log.timestamp}</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
} 