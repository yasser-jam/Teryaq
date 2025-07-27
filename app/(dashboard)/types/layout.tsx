'use client';

import BaseTitle from '@/components/base/title';
import { Button } from '@/components/ui/button';
import BaseTable from '@/components/base/table';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import ActionMenu from '@/components/base/action-menu';
import type { Type } from '@/types';
import { MoreVert } from 'iconoir-react';
import { ColumnDef } from '@tanstack/react-table';
import { useRouter } from 'next/navigation';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { successToast } from '@/lib/toast';

export default function TypesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const columns: ColumnDef<Type>[] = [
    {
      header: 'Type',
      accessorKey: 'name',
      cell: ({ row }) => {
        const type = row.original;
        return (
          <div className='flex items-center gap-3 w-[50vw]'>
            <Avatar>
              <AvatarFallback>
                {type.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className='font-medium'>{type.name}</div>
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
            onEdit={() => router.push(`/types/${row.original.id}`)}
            onDelete={() => deleteType(row.original.id.toString())}
          />
        </div>
      ),
    },
  ];

  const { data: types } = useQuery({
    queryKey: ['types-list'],
    queryFn: () => api('/types'),
  });

  const queryClient = useQueryClient();
  const { mutate: deleteType } = useMutation({
    mutationFn: (id: string) => api(`/types/${id}`, { method: 'DELETE' }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['types-list'] });
      successToast('Type deleted successfully');
    },
  });

  return (
    <>
      <div className='space-y-6'>
        <div className='flex items-center justify-between'>
          <BaseTitle>Types</BaseTitle>

          <Button
            className='ml-auto'
            onClick={() => router.replace('/types/create')}
          >
            Add New Type
          </Button>
        </div>

        <BaseTable columns={columns} data={types || []} />
      </div>

      {children}
    </>
  );
} 