'use client';

import BaseTitle from '@/components/base/title';
import { Button } from '@/components/ui/button';
import BaseTable from '@/components/base/table';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import ActionMenu from '@/components/base/action-menu';
import type { Pharmacy } from '@/types';
import { MoreVert } from 'iconoir-react';

// Fix Pharmacy type locally (pharmacyName should be string)
type PharmacyFixed = Omit<Pharmacy, 'pharmacyName' | 'managerLastNam'> & {
  pharmacyName: string;
  managerLastName: string;
};

import { ColumnDef } from '@tanstack/react-table';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import BaseSkeleton from '@/components/base/base-skeleton';
import BaseNotFound from '@/components/base/base-not-found';

export default function PharmaciesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const columns: ColumnDef<PharmacyFixed>[] = [
    {
      header: 'Pharmacy',
      accessorKey: 'pharmacyName',
      cell: ({ row }) => {
        const pharmacy = row.original;
        return (
          <div className='flex items-center gap-3'>
            <Avatar>
              <AvatarFallback>{pharmacy.pharmacyName.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <div className='font-medium'>{pharmacy.pharmacyName}</div>
              <div className='text-xs text-muted-foreground'>
                {pharmacy.email}
              </div>
            </div>
          </div>
        );
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
      cell: ({ row }) => (
        <ActionMenu
          toggler={
            <Button variant='ghost' size='icon'>
              <MoreVert />
            </Button>
          }
          editAction
          deleteAction
          onEdit={() => router.push(`/pharmacies/${row.original.id}`)}
        />
      ), // Add handlers as needed
    },
  ];

  const { data: pharamacies, isFetching } = useQuery({
    queryKey: ['pharmacies-list'],
    queryFn: () => api('/pharmacy/all'),
  });


  return (
    <>
      <div className='space-y-6'>
        <div className='flex items-center justify-between'>
          <BaseTitle>Pharmacies</BaseTitle>

          <Button
            className='ml-auto'
            onClick={() => router.replace('/pharmacies/create')}
          >
            Add New Pharmacy
          </Button>
        </div>

        {isFetching ? (
          <BaseSkeleton className='w-full h-[250px] rounded-xl' />
        ) : true ? (
          <BaseNotFound item='Pharmacies'>
            <Button onClick={() => router.replace('/pharmacies/create')}>
              Add New Pharmacy
            </Button>
          </BaseNotFound>
        ) : (
          <BaseTable columns={columns} data={pharamacies || []} />
        )}
      </div>

      {children}
    </>
  );
}
