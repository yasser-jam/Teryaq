'use client';

import BaseTitle from '@/components/base/title';
import { Button } from '@/components/ui/button';
import BaseTable from '@/components/base/table';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import ActionMenu from '@/components/base/action-menu';
import type { Manufacturer } from '@/types';
import { MoreVert } from 'iconoir-react';
import { ColumnDef } from '@tanstack/react-table';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';

export default function ManufacturersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const columns: ColumnDef<Manufacturer>[] = [
    {
      header: 'Manufacturer',
      accessorKey: 'name',
      cell: ({ row }) => {
        const manufacturer = row.original;
        return (
          <div className='flex items-center gap-3 w-[50vw]'>
            <Avatar>
              <AvatarFallback>
                {manufacturer.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className='font-medium'>{manufacturer.name}</div>
            </div>
          </div>
        );
      },
    },
    {
      header: 'Actions',
      id: 'actions',
      cell: ({ row }) => (
        <div className='flex'>
          <ActionMenu
            toggler={
              <Button variant='ghost' size='icon'>
                <MoreVert />
              </Button>
            }
            editAction
            deleteAction
            onEdit={() => router.push(`/manufacturers/${row.original.id}`)}
          />
        </div>
      ),
    },
  ];

  const { data: manufacturers } = useQuery({
    queryKey: ['manufacturers-list'],
    queryFn: () => api('/manufacturers'),
  });

  return (
    <>
      <div className='space-y-6'>
        <div className='flex items-center justify-between'>
          <BaseTitle>Manufacturers</BaseTitle>

          <Button
            className='ml-auto'
            onClick={() => router.replace('/manufacturers/create')}
          >
            Add New Manufacturer
          </Button>
        </div>

        <BaseTable columns={columns} data={manufacturers || []} />
      </div>

      {children}
    </>
  );
} 