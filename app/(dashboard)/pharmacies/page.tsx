"use client"

import BaseTitle from '@/components/base/title'
import { Button } from '@/components/ui/button'
import BaseTable from '@/components/base/table'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import ActionMenu from '@/components/base/action-menu'
import type { Pharmacy } from '@/types'
import { MoreVert } from 'iconoir-react'

// Fix Pharmacy type locally (pharmacyName should be string)
type PharmacyFixed = Omit<Pharmacy, 'pharmacyName' | 'managerLastNam'> & {
  pharmacyName: string;
  managerLastName: string;
}

const pharmacies: PharmacyFixed[] = [
  {
    id: 1,
    pharmacyName: 'HealthPlus',
    licenseNumber: 123456,
    address: '123 Main St',
    email: 'info@healthplus.com',
    type: 'MAIN',
    openingHours: '8am - 10pm',
    phoneNumber: '+1234567890',
    managerEmail: 'manager@healthplus.com',
    managerFirstName: 'John',
    managerLastName: 'Doe',
  },
  {
    id: 2,
    pharmacyName: 'WellCare',
    licenseNumber: 654321,
    address: '456 Elm St',
    email: 'contact@wellcare.com',
    type: 'BRANCH',
    openingHours: '9am - 9pm',
    phoneNumber: '+0987654321',
    managerEmail: 'jane@wellcare.com',
    managerFirstName: 'Jane',
    managerLastName: 'Smith',
  },
]

import { ColumnDef } from '@tanstack/react-table'

const columns: ColumnDef<PharmacyFixed>[] = [
  {
    header: 'Pharmacy',
    accessorKey: 'pharmacyName',
    cell: ({ row }) => {
      const pharmacy = row.original
      return (
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarFallback>
              {pharmacy.pharmacyName.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">{pharmacy.pharmacyName}</div>
            <div className="text-xs text-muted-foreground">{pharmacy.email}</div>
          </div>
        </div>
      )
    },
  },
  {
    header: 'Phone Number',
    accessorKey: 'phoneNumber',
  },
  {
    header: 'Manager Email',
    accessorKey: 'managerEmail',
  },
  {
    header: 'Actions',
    id: 'actions',
    cell: () => <ActionMenu toggler={<Button variant="ghost" size="icon"><MoreVert /></Button>} editAction deleteAction viewAction />, // Add handlers as needed
  },
]

export default function PharmaciesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <BaseTitle>Pharmacies</BaseTitle>
        <Button variant="outline" className="ml-auto">Add New Pharmacy</Button>
      </div>
      <BaseTable columns={columns} data={pharmacies} />
    </div>
  )
} 